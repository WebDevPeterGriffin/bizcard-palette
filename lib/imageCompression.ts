/**
 * Compresses an image file to a target size using browser Canvas API.
 * Converts to WebP format for optimal compression.
 * 
 * @param file - Original image file
 * @param options - Compression options
 * @returns Compressed image file
 */
export async function compressImage(
  file: File,
  options: {
    maxSizeKB?: number;
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  } = {}
): Promise<File> {
  const {
    maxSizeKB = 100,
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.8,
  } = options;

  // Skip if already small enough
  if (file.size <= maxSizeKB * 1024) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > height) {
          width = maxWidth;
          height = Math.round(width / aspectRatio);
        } else {
          height = maxHeight;
          width = Math.round(height * aspectRatio);
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image on canvas
      ctx?.drawImage(img, 0, 0, width, height);

      // Try WebP first (best compression), fall back to JPEG
      const mimeType = 'image/webp';
      let currentQuality = quality;

      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            // If still too large and quality can be reduced, try again
            if (blob.size > maxSizeKB * 1024 && currentQuality > 0.3) {
              currentQuality -= 0.1;
              tryCompress();
              return;
            }

            // Create new file with original name but .webp extension
            const newName = file.name.replace(/\.[^.]+$/, '.webp');
            const compressedFile = new File([blob], newName, {
              type: mimeType,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          mimeType,
          currentQuality
        );
      };

      tryCompress();
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load image from file
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

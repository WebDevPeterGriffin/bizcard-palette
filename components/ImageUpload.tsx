import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { compressImage, formatFileSize } from "@/lib/imageCompression";

interface ImageUploadProps {
  onImageChange: (file: File | null, preview: string | null) => void;
  currentImage?: string | null;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
}

const ImageUpload = ({
  onImageChange,
  currentImage,
  label = "Upload Image",
  accept = "image/*",
  maxSize = 5
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    // Check file size (convert MB to bytes)
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Please select an image smaller than ${maxSize}MB`,
        variant: "destructive"
      });
      return false;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setPreview(null);
      setCompressionInfo(null);
      onImageChange(null, null);
      return;
    }

    if (!validateFile(file)) return;

    setIsCompressing(true);
    setCompressionInfo(null);

    try {
      // Compress the image
      const originalSize = file.size;
      const compressedFile = await compressImage(file, {
        maxSizeKB: 100,
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.85,
      });

      const compressedSize = compressedFile.size;
      const savedPercent = Math.round((1 - compressedSize / originalSize) * 100);

      if (savedPercent > 0) {
        setCompressionInfo(
          `Compressed: ${formatFileSize(originalSize)} → ${formatFileSize(compressedSize)} (${savedPercent}% smaller)`
        );
      }

      // Read compressed file for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageChange(compressedFile, result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Compression failed:', error);
      toast({
        title: "Compression failed",
        description: "Using original image instead",
        variant: "destructive"
      });

      // Fall back to original file
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageChange(file, result);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setPreview(null);
    setCompressionInfo(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        {isCompressing ? (
          <div className="space-y-2">
            <Loader2 className="mx-auto h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Compressing image...</p>
          </div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-32 mx-auto rounded-lg object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to {maxSize}MB (auto-compressed)
              </p>
            </div>
            <Button type="button" variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </div>
        )}
      </div>

      {compressionInfo && (
        <p className="text-xs text-green-600">{compressionInfo}</p>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { logger } from '@/lib/logger';

export interface QRCodeRef {
  download: (format?: 'png' | 'svg') => Promise<void>;
}

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  className?: string;
  showControls?: boolean;
}

const QRCodeGenerator = forwardRef<QRCodeRef, QRCodeGeneratorProps>(({
  url,
  size = 200,
  className = "",
  showControls = true
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const generateQR = async () => {
      if (canvasRef.current) {
        try {
          await QRCode.toCanvas(canvasRef.current, url, {
            width: size,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
        } catch (error) {
          logger.error('Error generating QR code:', error);
        }
      }
    };

    generateQR();
  }, [url, size]);

  const downloadQR = async (format: 'png' | 'svg' = 'png') => {
    try {
      let dataUrl: string;

      if (format === 'svg') {
        dataUrl = await QRCode.toString(url, {
          type: 'svg',
          width: size,
          margin: 2
        });
        const blob = new Blob([dataUrl], { type: 'image/svg+xml' });
        dataUrl = URL.createObjectURL(blob);
      } else {
        dataUrl = await QRCode.toDataURL(url, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
      }

      const link = document.createElement('a');
      link.download = `qr-code.${format}`;
      link.href = dataUrl;
      link.click();

      if (format === 'svg') {
        URL.revokeObjectURL(dataUrl);
      }

      toast({
        title: "QR Code Downloaded",
        description: `Downloaded as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download QR code",
        variant: "destructive"
      });
    }
  };

  useImperativeHandle(ref, () => ({
    download: downloadQR
  }));

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Link Copied",
        description: "Card URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy link",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`text-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="mx-auto rounded-lg bg-white p-2 shadow-sm border"
      />

      {showControls && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyUrl}
            className="text-xs"
          >
            {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadQR('png')}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadQR('svg')}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            SVG
          </Button>
        </div>
      )}
    </div>
  );
});

QRCodeGenerator.displayName = "QRCodeGenerator";

export default QRCodeGenerator;
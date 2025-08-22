"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  maxSize?: number; // in MB
  onError?: (error: string) => void;
}

export default function VideoUpload({
  value,
  onChange,
  disabled = false,
  maxSize = 500, // Default 500MB
  onError,
}: VideoUploadProps) {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Convert MB to bytes for dropzone validation
  const maxSizeBytes = maxSize * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Check file size
      if (file.size > maxSizeBytes) {
        onError?.(`File size exceeds ${maxSize}MB limit`);
        return;
      }

      // Check if it's a video file
      if (!file.type.startsWith("video/")) {
        onError?.("Please upload a valid video file");
        return;
      }

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      onChange(file);

      // Clean up the preview URL when component unmounts
      return () => URL.revokeObjectURL(previewUrl);
    },
    [onChange, maxSizeBytes, maxSize, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept: {
      "video/*": []
    },
    maxSize: maxSizeBytes,
  });

  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-md overflow-hidden border border-input">
          <div className="aspect-video bg-muted relative h-32">
            <video
              src={videoPreview || URL.createObjectURL(value)}
              className="w-full h-full object-contain"
              controls
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-5 w-5"
              onClick={removeVideo}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="p-1 bg-background">
            <p className="text-xs truncate">{value.name}</p>
            <p className="text-xs text-muted-foreground">
              {(value.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-md p-3 flex flex-col items-center justify-center cursor-pointer h-24",
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-input hover:bg-accent hover:text-accent-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-5 w-5 text-muted-foreground mb-1" />
          <p className="text-xs font-medium mb-0.5">
            Drag & drop video or click to select
          </p>
          <p className="text-xs text-muted-foreground">
            MP4, WebM, MOV, AVI (Max {maxSize}MB)
          </p>
        </div>
      )}
    </div>
  );
}
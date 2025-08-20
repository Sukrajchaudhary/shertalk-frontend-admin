"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { X,Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value?: File | string | null;
  disabled?: boolean;
  className?: string;
  maxSize?: number; // in MB
  accept?: Record<string, string[]>;
  onError?: (error: string) => void;
}

export function ImageUpload({
  onChange,
  value,
  disabled = false,
  className,
  maxSize = 5, // Default 5MB
  accept = {
    "image/*": []
  },
  onError,
  ...props
}: ImageUploadProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">) {
  const [preview, setPreview] = useState<string | null>(null);

  // Convert string URL to preview if value is a string
  React.useEffect(() => {
    if (typeof value === "string" && value) {
      setPreview(value);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      
      const file = acceptedFiles[0];
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        onError?.(`File size exceeds ${maxSize}MB limit`);
        return;
      }
      
      onChange(file);
    },
    [onChange, maxSize, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    disabled,
    maxFiles: 1,
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setPreview(null);
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-md border border-dashed p-6 transition-colors",
        isDragActive
          ? "border-primary/50 bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-md">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
          />
          {!disabled && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              Drag & drop an image here, or click to select
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPEG, PNG, GIF, WebP
            </p>
            <p className="text-xs text-muted-foreground">
              Max file size: {maxSize}MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
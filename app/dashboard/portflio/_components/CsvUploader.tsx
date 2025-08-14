"use client";
import React, { useState, useRef } from "react";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import Chart from "./Chart";

interface DragStates {
  broker: boolean;
  portfolio: boolean;
}

interface UploadZoneProps {
  type: "broker" | "portfolio";
  file: File | null;
  isDragging: boolean;
  title: string;
  description: string;
  icon: React.ElementType;
}

const CsvUploader: React.FC = () => {
  const [brokerFile, setBrokerFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [dragStates, setDragStates] = useState<DragStates>({
    broker: false,
    portfolio: false,
  });

  const brokerRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent, type: "broker" | "portfolio") => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: true }));
  };

  const handleDragLeave = (
    e: React.DragEvent,
    type: "broker" | "portfolio"
  ) => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: false }));
  };

  const handleDrop = (e: React.DragEvent, type: "broker" | "portfolio") => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: false }));

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv")
    );

    if (csvFile) {
      if (type === "broker") {
        setBrokerFile(csvFile);
      } else {
        setPortfolioFile(csvFile);
      }
    }
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "broker" | "portfolio"
  ) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      if (type === "broker") {
        setBrokerFile(file);
      } else {
        setPortfolioFile(file);
      }
    }
  };

  const removeFile = (type: "broker" | "portfolio") => {
    if (type === "broker") {
      setBrokerFile(null);
      if (brokerRef.current) brokerRef.current.value = "";
    } else {
      setPortfolioFile(null);
      if (portfolioRef.current) portfolioRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const UploadZone: React.FC<UploadZoneProps> = ({
    type,
    file,
    isDragging,
    title,
    description,
    icon,
  }) => {
    // Fix the border styling logic
    const getBorderClasses = () => {
      if (isDragging) {
        return "border-gray-600 bg-gray-100 scale-[1.01] shadow-md";
      }
      if (file) {
        return "border-green-500 bg-green-50 hover:border-green-600";
      }
      return "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50";
    };

    return (
      <div className="relative overflow-visible p-2">
        <div
          className={`
            relative h-48 rounded-2xl border-2 border-dashed transition-all duration-300 ease-out cursor-pointer
            transform hover:scale-[1.02] hover:shadow-lg
            ${getBorderClasses()}
          `}
          onDragOver={(e) => handleDragOver(e, type)}
          onDragLeave={(e) => handleDragLeave(e, type)}
          onDrop={(e) => handleDrop(e, type)}
          onClick={() =>
            type === "broker"
              ? brokerRef.current?.click()
              : portfolioRef.current?.click()
          }
        >
          {/* Simple decorative elements */}
          <div className="absolute inset-0">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-50"
                style={{
                  left: `${40 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
            {file ? (
              <div className="space-y-2">
                <div className="relative">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-800 truncate max-w-32">
                    {file.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {formatFileSize(file.size)}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-xs font-medium">Ready</span>
                  </div>
                </div>
                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    removeFile(type);
                  }}
                  className="absolute cursor-pointer top-2 right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full transition-colors duration-200"
                >
                  <X className="w-3 h-3 text-red-600" />
                </button>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div
                  className={`relative ${isDragging ? "animate-bounce" : ""}`}
                >
                  {React.createElement(icon, {
                    className: `w-12 h-12 mx-auto ${isDragging ? "text-gray-600" : "text-gray-400"
                      }`,
                  })}
                </div>

                <div className="space-y-2">
                  <h3
                    className={`text-lg font-bold transition-colors duration-300 ${isDragging ? "text-gray-700" : "text-gray-800"
                      }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm transition-colors duration-300 ${isDragging ? "text-gray-600" : "text-gray-500"
                      }`}
                  >
                    {description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-2 text-sm rounded-full border transition-all duration-300 ${isDragging
                        ? "border-gray-600 text-gray-700 bg-gray-100"
                        : "border-gray-400 text-gray-600 bg-gray-50"
                      }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span className="font-medium">Drop CSV here</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <input
            ref={type === "broker" ? brokerRef : portfolioRef}
            type="file"
            accept=".csv"
            onChange={(e) => handleFileInput(e, type)}
            className="hidden"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Importer CSV Data
          </h1>
          <p className="text-lg text-gray-600">
            Upload your client's broker and portfolio CSV files
          </p>
          <div className="mt-2 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="w-4 h-4" />
              <span>CSV files only</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Upload className="w-4 h-4" />
              <span>Drag & Drop</span>
            </div>
          </div>
        </div>

        {/* Upload Row */}
        <div className="flex justify-between gap-8 mb-6">
          <div className="w-80">
            <UploadZone
              type="broker"
              file={brokerFile}
              isDragging={dragStates.broker}
              title="Broker CSV"
              description="Transaction data"
              icon={AlertCircle}
            />
          </div>

          <div className="w-80">
            <UploadZone
              type="portfolio"
              file={portfolioFile}
              isDragging={dragStates.portfolio}
              title="Portfolio CSV"
              description="Holdings data"
              icon={FileText}
            />
          </div>
        </div>

        {/* Process Button */}
        {(brokerFile || portfolioFile) && (
          <div className="text-center mb-6">
            <button className="inline-flex cursor-pointer items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-5 h-5" />
              <span>Process CSV Files</span>
            </button>
          </div>
        )}

        {/* Status Bar */}
        <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${brokerFile ? "bg-green-500" : "bg-gray-300"
                    }`}
                />
                <span className="text-sm text-gray-600">
                  Broker: {brokerFile ? "Ready" : "Pending"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${portfolioFile ? "bg-green-500" : "bg-gray-300"
                    }`}
                />
                <span className="text-sm text-gray-600">
                  Portfolio: {portfolioFile ? "Ready" : "Pending"}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {(brokerFile ? 1 : 0) + (portfolioFile ? 1 : 0)}/2 uploaded
            </div>
          </div>
        </div>

        {/* chart */}

      </div>
      <Chart />
    </div>
  );
};

export default CsvUploader;

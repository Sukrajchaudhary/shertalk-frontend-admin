"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  CloudUpload,
  Download,
} from "lucide-react";
// import Chart from "./Chart"; // Commented out - uncomment if needed
import { useQuery } from "@tanstack/react-query";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import Select from "react-select";
import { useToast } from "@/components/ui/use-toast";

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
  acceptedFormats: string;
}

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
}

interface UserOption {
  label: string;
  value: string;
}

const CsvUploader: React.FC = () => {
  const [brokerFile, setBrokerFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<UserOption[]>([]);
  const [dragStates, setDragStates] = useState<DragStates>({
    broker: false,
    portfolio: false,
  });
  const [selectedOption, setSelectedOption] = useState<UserOption | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  const brokerRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await clientSideFetch({
          url: "/auth/list/",
          method: "get",
          toast: "skip",
        });
        if (res?.status === 200) {
          return res?.data?.results || [];
        } else {
          throw new Error(`Failed to fetch users: ${res?.status}`);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const userOptions: UserOption[] = data.map((user: User) => ({
        label:
          `${user.first_name} ${user.last_name || ""}`.trim() ||
          `User ${user.id}`,
        value: String(user.id),
      }));
      setUserId(userOptions);
    }
  }, [data]);

  const isValidFileType = (
    file: File,
    type: "broker" | "portfolio"
  ): boolean => {
    const fileName = file.name.toLowerCase();
    if (type === "broker") {
      return fileName.endsWith(".xls") || fileName.endsWith(".xlsx");
    } else {
      return file.type === "text/csv" || fileName.endsWith(".csv");
    }
  };

  const handleDragOver = (e: React.DragEvent, type: "broker" | "portfolio") => {
    e.preventDefault();
    e.stopPropagation();
    setDragStates((prev) => ({ ...prev, [type]: true }));
  };

  const handleDragLeave = (
    e: React.DragEvent,
    type: "broker" | "portfolio"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragStates((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleDrop = (e: React.DragEvent, type: "broker" | "portfolio") => {
    e.preventDefault();
    e.stopPropagation();
    setDragStates((prev) => ({ ...prev, [type]: false }));

    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find((file) => isValidFileType(file, type));

    if (!validFile) {
      const expectedFormat = type === "broker" ? "XLS/XLSX" : "CSV";
      toast({
        title: "❌ Invalid File Type",
        description: `Please upload ${expectedFormat} files only for ${
          type === "broker" ? "Trade Book" : "Transaction History"
        }`,
        variant: "destructive",
      });
      return;
    }

    if (type === "broker") {
      setBrokerFile(validFile);
      toast({
        title: "✅ Trade Book Uploaded",
        description: `${validFile.name} is ready for processing`,
      });
    } else {
      setPortfolioFile(validFile);
      toast({
        title: "✅ Transaction History Uploaded",
        description: `${validFile.name} is ready for processing`,
      });
    }
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "broker" | "portfolio"
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!isValidFileType(file, type)) {
        const expectedFormat = type === "broker" ? "XLS/XLSX" : "CSV";
        toast({
          title: "❌ Invalid File Type",
          description: `Please upload ${expectedFormat} files only for ${
            type === "broker" ? "Trade Book" : "Transaction History"
          }`,
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      if (type === "broker") {
        setBrokerFile(file);
        toast({
          title: "✅ Trade Book Selected",
          description: `${file.name} is ready for processing`,
        });
      } else {
        setPortfolioFile(file);
        toast({
          title: "✅ Transaction History Selected",
          description: `${file.name} is ready for processing`,
        });
      }
    }
  };

  const removeFile = (type: "broker" | "portfolio") => {
    if (type === "broker") {
      setBrokerFile(null);
      if (brokerRef.current) brokerRef.current.value = "";
      toast({
        title: "🗑️ File Removed",
        description: "Trade book file has been removed",
      });
    } else {
      setPortfolioFile(null);
      if (portfolioRef.current) portfolioRef.current.value = "";
      toast({
        title: "🗑️ File Removed",
        description: "Transaction history file has been removed",
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getAuthToken = async (): Promise<string | null> => {
    try {
      const response = await fetch("/api/getauthtoken");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data?.accessToken || null;
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  };

  const handleProcessFiles = async () => {
    // Enhanced validation with better user feedback
    if (!selectedOption) {
      toast({
        title: "⚠️ User Required",
        description: "Please select a user from the dropdown",
        variant: "destructive",
      });
      return;
    }

    if (!brokerFile) {
      toast({
        title: "⚠️ Trade Book Required",
        description: "Please upload your trade book file (XLS/XLSX format)",
        variant: "destructive",
      });
      return;
    }

    if (!portfolioFile) {
      toast({
        title: "⚠️ Transaction History Required",
        description: "Please upload your transaction history file (CSV format)",
        variant: "destructive",
      });
      return;
    }

    // File type validation
    if (!isValidFileType(brokerFile, "broker")) {
      toast({
        title: "❌ Invalid Trade Book Format",
        description: "Trade book must be an XLS or XLSX file",
        variant: "destructive",
      });
      return;
    }

    if (!isValidFileType(portfolioFile, "portfolio")) {
      toast({
        title: "❌ Invalid Transaction History Format",
        description: "Transaction history must be a CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get authentication token
      const token = await getAuthToken();
      if (!token) {
        toast({
          title: "❌ Authentication Failed",
          description: "Could not authenticate. Please try logging in again.",
          variant: "destructive",
        });
        return;
      }

      // Prepare form data with explicit field names and logging
      const formData = new FormData();

      // Log file details before appending
      console.log("Preparing files for upload:", {
        brokerFile: {
          name: brokerFile.name,
          size: brokerFile.size,
          type: brokerFile.type,
        },
        portfolioFile: {
          name: portfolioFile.name,
          size: portfolioFile.size,
          type: portfolioFile.type,
        },
        selectedUser: selectedOption,
      });

      // Append files with exact field names expected by backend
      formData.append("trade_book", brokerFile, brokerFile.name);
      formData.append("transaction_history", portfolioFile, portfolioFile.name);
      formData.append("user", selectedOption.value);

      // Debug: Log FormData contents
      console.log("FormData entries:");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File(${value.name}, ${value.size} bytes, ${value.type})`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        throw new Error(
          "API base URL is not configured in environment variables"
        );
      }

      const apiUrl = `${baseUrl}/portfolio/trade-books/create/`;
      console.log("Making API request to:", apiUrl);

      toast({
        title: "🚀 Processing Files",
        description: "Uploading and processing your files...",
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("API Response status:", response.status);
      console.log(
        "API Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // Handle response
      let responseData;
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log("API Response data:", responseData);

      if (response.ok) {
        toast({
          title: "🎉 Success!",
          description: "Your files have been processed successfully",
        });

        // Reset form state
        setBrokerFile(null);
        setPortfolioFile(null);
        setSelectedOption(null);
        if (brokerRef.current) brokerRef.current.value = "";
        if (portfolioRef.current) portfolioRef.current.value = "";
      } else {
        // Enhanced error message extraction
        let errorMessage = "Failed to process files";
        let errorDetails = "";

        if (typeof responseData === "string") {
          errorMessage = responseData;
        } else if (responseData?.detail) {
          errorMessage = responseData.detail;
        } else if (responseData?.error) {
          errorMessage =
            typeof responseData.error === "string"
              ? responseData.error
              : JSON.stringify(responseData.error);
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.non_field_errors) {
          errorMessage = Array.isArray(responseData.non_field_errors)
            ? responseData.non_field_errors.join(", ")
            : responseData.non_field_errors;
        }

        // Handle field-specific errors
        if (responseData && typeof responseData === "object") {
          const fieldErrors = [];
          for (const [field, errors] of Object.entries(responseData)) {
            if (Array.isArray(errors)) {
              fieldErrors.push(`${field}: ${errors.join(", ")}`);
            } else if (typeof errors === "string") {
              fieldErrors.push(`${field}: ${errors}`);
            }
          }
          if (fieldErrors.length > 0) {
            errorDetails = fieldErrors.join("; ");
          }
        }

        console.error("API Error details:", {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        });

        toast({
          title: `❌ Error (${response.status})`,
          description: errorDetails || errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Processing error:", error);

      toast({
        title: "❌ Processing Failed",
        description: `Network or processing error: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const UploadZone: React.FC<UploadZoneProps> = ({
    type,
    file,
    isDragging,
    title,
    description,
    icon: IconComponent,
    acceptedFormats,
  }) => {
    const getBorderClasses = () => {
      if (isDragging) {
        return "border-blue-500 bg-blue-50 shadow-lg scale-105";
      }
      if (file) {
        return "border-green-500 bg-green-50 shadow-md";
      }
      return "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50";
    };

    const getTextClasses = () => {
      if (isDragging) {
        return "text-blue-700";
      }
      if (file) {
        return "text-green-700";
      }
      return "text-gray-600";
    };

    return (
      <div className="relative p-2">
        <div
          className={`relative h-64 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${getBorderClasses()}`}
          onDragOver={(e) => handleDragOver(e, type)}
          onDragLeave={(e) => handleDragLeave(e, type)}
          onDrop={(e) => handleDrop(e, type)}
          onClick={() => {
            const ref = type === "broker" ? brokerRef : portfolioRef;
            ref.current?.click();
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {file ? (
              <div className="space-y-3 relative w-full">
                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    removeFile(type);
                  }}
                  className="absolute -top-2 -right-2 p-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 z-10"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-green-800 break-words">
                    {file.name}
                  </h3>
                  <p className="text-sm text-green-600 font-medium">
                    {formatFileSize(file.size)}
                  </p>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>File Ready</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-full bg-gray-100 w-20 h-20 mx-auto flex items-center justify-center ${
                    isDragging ? "animate-pulse" : ""
                  }`}
                >
                  <IconComponent className={`w-10 h-10 ${getTextClasses()}`} />
                </div>

                <div className="space-y-2">
                  <h3 className={`text-xl font-bold ${getTextClasses()}`}>
                    {title}
                  </h3>
                  <p className={`text-sm ${getTextClasses()}`}>{description}</p>
                  <p className="text-xs text-gray-500 font-medium">
                    Accepted formats: {acceptedFormats}
                  </p>
                </div>

                <div className="space-y-3">
                  <div
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                      isDragging
                        ? "border-blue-500 text-blue-700 bg-blue-100"
                        : "border-gray-400 text-gray-600 bg-gray-50 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    <CloudUpload className="w-5 h-5" />
                    <span className="font-semibold">
                      {isDragging ? "Drop here!" : "Click or drag files here"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <input
            ref={type === "broker" ? brokerRef : portfolioRef}
            type="file"
            accept={type === "broker" ? ".xls,.xlsx" : ".csv"}
            onChange={(e) => handleFileInput(e, type)}
            className="hidden"
            aria-label={`Upload ${
              type === "broker" ? "trade book" : "transaction history"
            } file`}
          />
        </div>
      </div>
    );
  };

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "45px",
      borderRadius: "5px",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      borderWidth: "2px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
      fontSize: "16px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: "16px",
      fontWeight: "500",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#eff6ff"
        : "white",
      color: state.isSelected ? "white" : "#1f2937",
      padding: "12px 16px",
      "&:hover": {
        backgroundColor: state.isSelected ? "#3b82f6" : "#eff6ff",
      },
    }),
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-green-400 rounded-sm mb-3">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Import Trade Data
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Upload your trade book (XLS/XLSX) and transaction history (CSV)
            files to get started with portfolio analysis
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* User Selection */}
          <div className="bg-white rounded-xl  p-8 mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-sm">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Select User Account
              </h2>
            </div>

            <div className="max-w-md">
              <label
                htmlFor="user-select"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Choose the user account for this import:
              </label>
              <Select
                id="user-select"
                value={selectedOption}
                onChange={setSelectedOption}
                options={userId}
                placeholder="Search and select a user..."
                isSearchable
                isClearable
                isLoading={isPending}
                className="rounded-sm"
                styles={customSelectStyles}
                noOptionsMessage={() => "No users found"}
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="bg-white rounded-2xl  p-8 mb-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-green-100 rounded-lg">
                <CloudUpload className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Upload Files</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UploadZone
                type="broker"
                file={brokerFile}
                isDragging={dragStates.broker}
                title="Trade Book"
                description="Upload your broker's trade book file"
                icon={Download}
                acceptedFormats="XLS, XLSX"
              />
              <UploadZone
                type="portfolio"
                file={portfolioFile}
                isDragging={dragStates.portfolio}
                title="Transaction History"
                description="Upload your transaction history file"
                icon={FileText}
                acceptedFormats="CSV"
              />
            </div>
          </div>

          {/* Process Button and Status */}
          <div className="bg-white rounded-2xl  p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Upload Status</h3>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {(brokerFile ? 1 : 0) + (portfolioFile ? 1 : 0)}/2 files
                uploaded
              </div>
            </div>

            {/* Status indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 ${
                  brokerFile
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    brokerFile ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span
                  className={`font-medium ${
                    brokerFile ? "text-green-800" : "text-gray-600"
                  }`}
                >
                  Trade Book:{" "}
                  {brokerFile ? `✅ ${brokerFile.name}` : "⏳ Pending"}
                </span>
              </div>

              <div
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 ${
                  portfolioFile
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    portfolioFile ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span
                  className={`font-medium ${
                    portfolioFile ? "text-green-800" : "text-gray-600"
                  }`}
                >
                  Transaction History:{" "}
                  {portfolioFile ? `✅ ${portfolioFile.name}` : "⏳ Pending"}
                </span>
              </div>
            </div>

            {/* Process Button */}
            <div className="text-center flex justify-start flex-col w-fit">
              <button
                onClick={handleProcessFiles}
                disabled={
                  isProcessing ||
                  !selectedOption ||
                  !brokerFile ||
                  !portfolioFile
                }
                className={`inline-flex  items-center space-x-3 px-7 py-2 text-lg font-bold rounded-md shadow-lg transition-all duration-300 ${
                  isProcessing ||
                  !selectedOption ||
                  !brokerFile ||
                  !portfolioFile
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing Files...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span>Process Files</span>
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 mt-4">
                {!selectedOption && "Please select a user account first"}
                {selectedOption &&
                  (!brokerFile || !portfolioFile) &&
                  "Please upload both files to continue"}
                {selectedOption &&
                  brokerFile &&
                  portfolioFile &&
                  !isProcessing &&
                  "Ready to process your files"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvUploader;

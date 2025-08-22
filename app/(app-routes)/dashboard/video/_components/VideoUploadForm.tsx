"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { createFormDataFromObject } from "@/utils/uploadHelpers";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import ReactSelect from "@/components/react-select";
import VideoUpload from "./VideoUpload";

// Define the form schema with Zod
const videoFormSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  keywords: z.string().min(1, "Keywords are required").trim(),
  videoParts: z.array(
    z.object({
      file: z.instanceof(File, { message: "Video file is required" }).nullable(),
      partNumber: z.number()
    })
  ).min(1, "At least one video part is required"),
  isPaid: z.boolean().default(false),
  // Conditional fields based on isPaid
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  specialPrice: z.coerce.number().min(0).nullable().optional(),
  specialPriceStartDate: z.date().nullable().optional(),
  specialPriceEndDate: z.date().nullable().optional(),
  originalPrice: z.coerce.number().min(0).nullable().optional(),
  playlist: z.array(z.number()).min(1, "At least one playlist is required"),
  tags: z.array(z.number()).min(1, "At least one tag is required"),
  slug: z.string().optional(),
  sku: z.string().optional(),
}).refine(
  (data) => {
    // If specialPrice is set, then specialPriceStartDate and specialPriceEndDate are required
    if (data.specialPrice !== null && data.specialPrice !== undefined) {
      return data.specialPriceStartDate !== null && data.specialPriceEndDate !== null;
    }
    return true;
  },
  {
    message: "Special price start and end dates are required when special price is set",
    path: ["specialPriceStartDate"],
  }
);

// Create a type from the schema
type VideoFormData = z.infer<typeof videoFormSchema>;

export default function VideoUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState("");
  const [generatedSku, setGeneratedSku] = useState("");

  const [videoParts, setVideoParts] = useState<{ partNumber: number }[]>([{ partNumber: 1 }]);

  // Initialize form
  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      keywords: "",
      videoParts: [{ file: null, partNumber: 1 }],
      isPaid: false,
      startDate: null,
      endDate: null,
      specialPrice: null,
      specialPriceStartDate: null,
      specialPriceEndDate: null,
      originalPrice: null,
      playlist: [],
      tags: [],
      slug: "",
      sku: "",
    },
  });
  
  // Function to add a new video part
  const addVideoPart = () => {
    const newPartNumber = videoParts.length + 1;
    setVideoParts([...videoParts, { partNumber: newPartNumber }]);
    
    const currentVideoParts = form.getValues("videoParts") || [];
    form.setValue("videoParts", [...currentVideoParts, { file: null, partNumber: newPartNumber }], { shouldValidate: true });
  };
  
  // Function to remove a video part
  const removeVideoPart = (partNumber: number) => {
    if (videoParts.length <= 1) return; // Keep at least one part
    
    const updatedParts = videoParts.filter(part => part.partNumber !== partNumber);
    setVideoParts(updatedParts);
    
    const currentVideoParts = form.getValues("videoParts") || [];
    form.setValue(
      "videoParts", 
      currentVideoParts.filter(part => part.partNumber !== partNumber),
      { shouldValidate: true }
    );
  };

  // Watch for changes to generate slug and SKU
  const title = form.watch("title");
  const isPaid = form.watch("isPaid");

  // Auto-generate slug and SKU when title changes
  useEffect(() => {
    if (title) {
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      
      setGeneratedSlug(slug);
      form.setValue("slug", slug, { shouldValidate: true });
      
      // Generate SKU (example format: VID-{first 3 chars}-{timestamp})
      const prefix = title.substring(0, 3).toUpperCase();
      const timestamp = new Date().getTime().toString().substring(9, 13);
      const sku = `VID-${prefix}-${timestamp}`;
      
      setGeneratedSku(sku);
      form.setValue("sku", sku, { shouldValidate: true });
    }
  }, [title, form]);

  // Handle form submission
  const onSubmit = async (values: VideoFormData) => {
    try {
      setIsSubmitting(true);
      
      // Validate that at least one video part has a file
      const hasVideoFile = values.videoParts.some(part => part.file !== null);
      if (!hasVideoFile) {
        toast.error("Please upload at least one video file");
        return;
      }
      
      // Additional validation for special price dates
      if (values.specialPrice && (!values.specialPriceStartDate || !values.specialPriceEndDate)) {
        toast.error("Special price requires both start and end dates");
        return;
      }
      
      // Create FormData from the form values
      const formData = createFormDataFromObject(values);
      
      // Example API call with FormData
      const response = await clientSideFetch({
        url: "/api/videos",
        method: "post",
        body: formData,
        toast: "skip",
      });
      
      if (response?.status === 200) {
        toast.success("Video uploaded successfully!");
        form.reset();
        setVideoParts([{ partNumber: 1 }]); // Reset video parts state
      } else {
        toast.error("Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("An error occurred while uploading the video");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Upload Video</h2>
          <p className="text-muted-foreground">Add a new video to your platform</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>
            Fill in the details for your new video content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter video title" {...field} />
                      </FormControl>
                      <FormDescription>
                        The title of your video
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter video description" 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A detailed description of your video
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter keywords separated by commas" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Keywords help with search and categorization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Video Upload Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Video Files</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addVideoPart}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> Add Part
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videoParts.map((part, index) => (
                  <div key={part.partNumber} className="space-y-2 border rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Part {part.partNumber}</h4>
                      {videoParts.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVideoPart(part.partNumber)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`videoParts.${index}.file`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <VideoUpload
                              value={field.value}
                              onChange={field.onChange}
                              disabled={isSubmitting}
                              maxSize={500} // 500MB max size
                              onError={(error) => toast.error(error)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          </div>

              {/* Pricing Toggle */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Pricing</h3>
                
                <FormField
                  control={form.control}
                  name="isPaid"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Paid Content
                        </FormLabel>
                        <FormDescription>
                          Toggle to set this as paid content
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Conditional Fields Based on isPaid */}
              {!isPaid ? (
                <div className="space-y-4 border rounded-lg p-4">
                  <h3 className="text-lg font-medium">Free Content Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When this content becomes available
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When this content expires (optional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 border rounded-lg p-4">
                  <h3 className="text-lg font-medium">Paid Content Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Original Price</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter original price" 
                              {...field} 
                              onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            The regular price of this content
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Price (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter special price" 
                              {...field} 
                              onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Special promotional price
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="specialPriceStartDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Special Price Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When special pricing begins
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialPriceEndDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Special Price End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When special pricing ends
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Playlist and Tags Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Categories</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="playlist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Playlist</FormLabel>
                        <FormControl>
                          <ReactSelect
                            url="/videos/playlists/"
                            isMulti={true}
                            form={form}
                            name="playlist"
                          />
                        </FormControl>
                        <FormDescription>
                          Select playlists for this video
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <ReactSelect
                            url="/videos/tags/"
                            isMulti={true}
                            form={form}
                            name="tags"
                          />
                        </FormControl>
                        <FormDescription>
                          Select tags for this video
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Auto-generated Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Fields</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Auto-generated from title" 
                            {...field} 
                            value={field.value || generatedSlug}
                            disabled
                          />
                        </FormControl>
                        <FormDescription>
                          URL-friendly version of the title (auto-generated)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Auto-generated SKU" 
                            {...field} 
                            value={field.value || generatedSku}
                            disabled
                          />
                        </FormControl>
                        <FormDescription>
                          Stock Keeping Unit (auto-generated)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading..." : "Upload Video"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
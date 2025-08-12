"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  Eye,
  EyeOff,
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: any) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    router.push("/dashboard");
    setIsLoading(false);
  }
  //@ts-ignore
  const FloatingIcon = ({ Icon, className, delay = 0 }) => (
    <div
      className={`absolute opacity-10 animate-pulse ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon size={24} />
    </div>
  );

  return (
    <div className="bg-gradient-to-br h-screen from-emerald-50 via-green-50 to-teal-50 flex relative overflow-hidden py-12">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon
          Icon={TrendingUp}
          className="top-20 left-20 text-green-400"
          delay={0}
        />
        <FloatingIcon
          Icon={BarChart3}
          className="top-32 right-32 text-emerald-400"
          delay={1}
        />
        <FloatingIcon
          Icon={Activity}
          className="bottom-20 left-32 text-teal-400"
          delay={2}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-100/20 to-transparent"></div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
        <div className="text-center relative z-10">
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-bounce"></div>
          <div
            className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="relative group">
            <div className="relative bg-white/15 rounded-3xl p-8  border border-white/20 hover:transform hover:scale-105 transition-all duration-500">
              <Image
                src="/images/bull.webp"
                alt="bull"
                height={500}
                width={500}
                className="rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Enhanced Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Enhanced welcome message */}
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-emerald-700 bg-clip-text text-transparent">
              Welcome to Shertalks
            </h1>
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
            </div>
          </div>

          {/* Enhanced Card */}
          <div className="relative">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-20"></div>

            <div className="relative bg-white/80 backdrop-blur-lg rounded-md border border-white/20 overflow-hidden">
              {/* Header with gradient */}

              <div className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-white border-2 rounded-lg h-12 border-gray-200"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-sm text-red-500 flex items-center">
                            {form.formState.errors.email?.message && (
                              <>
                                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                {form.formState.errors.email.message}
                              </>
                            )}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 h-12 rounded-lg py-3 pr-12 text-sm bg-white border-gray-200"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute cursor-pointer  right-0 top-0 h-full px-3 text-gray-500 hover:text-green-600 transition-colors hover:bg-transparent"
                              >
                                {showPassword ? (
                                  <EyeOff
                                    className="cursor-pointer"
                                    size={20}
                                  />
                                ) : (
                                  <Eye className="cursor-pointer" size={20} />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-sm text-red-500 flex items-center">
                            {form.formState.errors.password?.message && (
                              <>
                                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                {form.formState.errors.password.message}
                              </>
                            )}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    {/* Enhanced Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full cursor-pointer relative h-12 overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        {isLoading && (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        )}
                        Sign in
                      </div>
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

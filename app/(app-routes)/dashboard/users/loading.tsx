import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

const LoadingSkeleton = () => {
  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="flex flex-col space-y-4 mt-4 bg-white p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              User Management
            </h2>
            <p className="text-muted-foreground text-xs">
              Manage your team members and their account permissions here.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 bg-gray-300 rounded-full animate-pulse" />
            <div className="h-10 w-full bg-gray-300 animate-pulse rounded-md pl-8" />
          </div>
        </div>

        <Card className="rounded-sm py-0 pb-2">
          <CardHeader className="bg-[#E5E7EB] flex flex-col justify-start items-start py-2">
            <CardTitle className="font-semibold text-base text-[#4B5563] animate-pulse bg-gray-300 rounded-md w-1/3 h-4" />
            <CardDescription className="text-[#4B5563] animate-pulse bg-gray-300 rounded-md w-1/4 h-3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex cursor-pointer items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors animate-pulse">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
                  </Avatar>
                  <div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded-md w-32" />
                    <div className="h-3 bg-gray-300 animate-pulse rounded-md w-48 mt-1" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="h-4 w-12 bg-gray-300 animate-pulse rounded-md" />
                  <Badge className="h-4 w-16 bg-gray-300 animate-pulse rounded-md" />
                </div>
              </div>
              {/* Repeat the skeletons for additional users */}
              <div className="flex cursor-pointer items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors animate-pulse">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
                  </Avatar>
                  <div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded-md w-32" />
                    <div className="h-3 bg-gray-300 animate-pulse rounded-md w-48 mt-1" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="h-4 w-12 bg-gray-300 animate-pulse rounded-md" />
                  <Badge className="h-4 w-16 bg-gray-300 animate-pulse rounded-md" />
                </div>
              </div>
              <div className="flex cursor-pointer items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors animate-pulse">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
                  </Avatar>
                  <div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded-md w-32" />
                    <div className="h-3 bg-gray-300 animate-pulse rounded-md w-48 mt-1" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="h-4 w-12 bg-gray-300 animate-pulse rounded-md" />
                  <Badge className="h-4 w-16 bg-gray-300 animate-pulse rounded-md" />
                </div>
              </div>
              {/* Repeat the skeletons for additional users */}
              <div className="flex cursor-pointer items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors animate-pulse">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
                  </Avatar>
                  <div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded-md w-32" />
                    <div className="h-3 bg-gray-300 animate-pulse rounded-md w-48 mt-1" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="h-4 w-12 bg-gray-300 animate-pulse rounded-md" />
                  <Badge className="h-4 w-16 bg-gray-300 animate-pulse rounded-md" />
                </div>
              </div>
              <div className="flex cursor-pointer items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors animate-pulse">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
                  </Avatar>
                  <div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded-md w-32" />
                    <div className="h-3 bg-gray-300 animate-pulse rounded-md w-48 mt-1" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="h-4 w-12 bg-gray-300 animate-pulse rounded-md" />
                  <Badge className="h-4 w-16 bg-gray-300 animate-pulse rounded-md" />
                </div>
              </div>
              {/* Repeat the skeletons for additional users */}
              <div className="flex cursor-pointer items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors animate-pulse">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
                  </Avatar>
                  <div>
                    <div className="h-4 bg-gray-300 animate-pulse rounded-md w-32" />
                    <div className="h-3 bg-gray-300 animate-pulse rounded-md w-48 mt-1" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="h-4 w-12 bg-gray-300 animate-pulse rounded-md" />
                  <Badge className="h-4 w-16 bg-gray-300 animate-pulse rounded-md" />
                </div>
              </div>
             
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadingSkeleton;

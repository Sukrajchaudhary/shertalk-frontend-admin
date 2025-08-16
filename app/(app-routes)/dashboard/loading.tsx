import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Users, BarChart3, TrendingUp } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card Skeleton */}
        <div className="bg-[#E4FAEF] p-4 rounded-lg">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">
              <Skeleton className="h-4 w-24" />
            </div>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Subscriptions Card Skeleton */}
        <div className="bg-[#FEEFF3] p-4 rounded-lg">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">
              <Skeleton className="h-4 w-32" />
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Sales Card Skeleton */}
        <div className="bg-[#E4FAEF] p-4 rounded-lg">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">
              <Skeleton className="h-4 w-24" />
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Active Now Card Skeleton */}
        <div className="bg-[#FEEFF3] p-4 rounded-lg">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">
              <Skeleton className="h-4 w-32" />
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      {/* Overview and Recent Activity Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Overview Card Skeleton */}
        <div className="col-span-4 p-4 bg-white rounded-lg">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <div className="h-[300px] flex items-center justify-center rounded bg-gray-100">
              <Skeleton className="h-16 w-32" />
            </div>
          </div>
        </div>

        {/* Recent Activity Card Skeleton */}
        <div className="col-span-3 p-4 bg-white rounded-lg">
          <div className="text-sm font-medium">
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="text-xs text-muted-foreground">
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-4 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  DollarSign,
  Users2,
} from "lucide-react";
import { DashbaordIndexTypes } from "@/utils/server/getDashboard";

const Dasboardindex = ({
  dashboardIndex,
}: {
  dashboardIndex: DashbaordIndexTypes;
}) => {
  
  return (
    <div className="flex  flex-1 flex-col  gap-4 ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          style={{
            background: "linear-gradient(90deg, #FE9496 0%, #FFC191 100%)",
          }}
          className="gap-y-1.5"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base text-white font-semibold">
              Total Revenue
            </CardTitle>
            <div className="bg-white rounded-full p-1">
              <DollarSign className="h-6   w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              Rs 45,231.89
            </div>
            <p className="text-xs text-white">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card
          style={{
            background: "linear-gradient(90deg, #1BCFB4 0%, #66FFCF 100%)",
          }}
          className="gap-y-1.5"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base text-white font-semibold">
              Total Users
            </CardTitle>
            <div className="bg-white rounded-full p-1">
              <Users2 className="h-6   w-6 text-green-600" />
            </div>{" "}
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white font-bold">
              +{dashboardIndex?.total_user}
            </div>
          </CardContent>
        </Card>
        <Card
          style={{
            background: "linear-gradient(270deg, #9798FF 0%, #8F4FE6 100%)",
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Inactive users
            </CardTitle>
            <div className="p-1 rounded-full bg-white">
              <Users className="h-6 w-6 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{dashboardIndex?.total_inactive_user}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#FEEFF3]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Blocked Users
            </CardTitle>
            <div className="bg-white p-1 rounded-full">
              <Users className="h-6 w-6 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{dashboardIndex?.total_blocked_user}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center  rounded">
              <p className="text-muted-foreground">
                Dashboard Chart Placeholder
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Activity {i}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Description for activity {i}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">
                    2h ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dasboardindex;

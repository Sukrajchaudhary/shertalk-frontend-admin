import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Users2 } from "lucide-react";
import { DashbaordIndexTypes } from "@/utils/server/getDashboard";

const UserIndex = ({ UserIndex }: { UserIndex: DashbaordIndexTypes }) => {
  return (
    <div className="flex  flex-1 flex-col  gap-4 ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              +{UserIndex?.total_user}
            </div>
          </CardContent>
        </Card>
        <Card
          style={{
            background: "linear-gradient(90deg, #FE9496 0%, #FFC191 100%)",
          }}
          className="gap-y-1.5"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base text-white font-semibold">
              Total Active User
            </CardTitle>
            <div className="bg-white rounded-full p-1">
              <Users2 className="h-6   w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              + {UserIndex?.total_active_user}
            </div>
          </CardContent>
        </Card>
        <Card
          style={{
            background: "linear-gradient(270deg, #9798FF 0%, #8F4FE6 100%)",
          }}
          className="py-1.5"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-base font-semibold">
              Inactive users
            </CardTitle>
            <div className="p-1 rounded-full bg-white">
              <Users className="h-6 w-6 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{UserIndex?.total_inactive_user}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#FEEFF3] py-1.5">
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
              +{UserIndex?.total_blocked_user}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserIndex;

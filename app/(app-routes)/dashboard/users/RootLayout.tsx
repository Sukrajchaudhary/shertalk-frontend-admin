"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashbaordIndexTypes } from "@/utils/server/getDashboard";
import UserIndex from "./_components/UserIndex";

// Define proper types
interface UserResult {
  id: string | number;
  first_name: string;
  last_name?: string;
  email: string;
  role: string;
  is_blocked: boolean;
}

interface UserListTypes {
  results: UserResult[];
  total?: number;
}

export default function RootLayout({
  userList,
  userCounts,
}: {
  userList: UserListTypes;
  userCounts: DashbaordIndexTypes;
}) {
  // Helper function to get user initials
  const getUserInitials = (firstName: string, lastName?: string) => {
    const firstInitial = firstName?.[0]?.toUpperCase() || "";
    const lastInitial = lastName?.[0]?.toUpperCase() || "";
    return firstInitial + lastInitial || "U";
  };

  // Helper function to get status display text
  const getStatusText = (isBlocked: boolean) => {
    return isBlocked ? "Blocked" : "Active";
  };

  // Helper function to get status badge variant
  const getStatusVariant = (isBlocked: boolean) => {
    return isBlocked ? "destructive" : "default";
  };

  // Helper function to get role badge variant
  const getRoleVariant = (role: string) => {
    return role?.toLowerCase() === "super_admin" ? "default" : "secondary";
  };
  

  return (
    <div className="flex-1 space-y-4 p-2">
      <UserIndex UserIndex={userCounts} />
      <div className="flex flex-col space-y-4 mt-4 bg-white p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
            <p className="text-muted-foreground text-xs">
              Manage your team members and their account permissions here.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-8" />
          </div>
        </div>
        <Card className="rounded-sm py-0 pb-2">
          <CardHeader className="bg-[#E5E7EB]  flex flex-col justify-start items-start py-2">
            <CardTitle className="font-semibold text-base text-[#4B5563]">Total users</CardTitle>
            <CardDescription className="text-[#4B5563]">
              A list of all users in your account including their name, title,
              email and role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {userList?.results?.length > 0 ? (
                userList.results.map((user: UserResult) => (
                  <div
                    key={user.id}
                    className="flex cursor-pointer items-center justify-between p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                            user.first_name
                          }${user.last_name || ""}`}
                          alt={`${user.first_name} avatar`}
                        />
                        <AvatarFallback>
                          {getUserInitials(user.first_name, user.last_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-[#111827] font-semibold  leading-none">
                          {user.first_name} {user.last_name || ""}
                        </p>
                        <p className="text-sm text-[#4B5563]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                       variant={getRoleVariant(user.role)}
                      >
                        {user.role}
                      </Badge>
                      <Badge variant={getStatusVariant(user.is_blocked)}>
                        {getStatusText(user.is_blocked)}
                      </Badge>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button className="cursor-pointer" variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => console.log("Delete user:", user.id)}
                          >
                            {user.is_blocked ? "Unblock" : "Block"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => console.log("Delete user:", user.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No users found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

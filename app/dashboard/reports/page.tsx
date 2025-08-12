import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, TrendingUp } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: "Monthly Sales Report",
      description: "Comprehensive sales data for the current month",
      type: "Sales",
      lastGenerated: "2 hours ago",
      status: "Ready",
    },
    {
      id: 2,
      name: "User Activity Report",
      description: "User engagement and activity metrics",
      type: "Analytics",
      lastGenerated: "1 day ago",
      status: "Ready",
    },
    {
      id: 3,
      name: "Financial Summary",
      description: "Revenue, expenses, and profit analysis",
      type: "Finance",
      lastGenerated: "3 days ago",
      status: "Generating",
    },
    {
      id: 4,
      name: "Performance Metrics",
      description: "System performance and uptime statistics",
      type: "Technical",
      lastGenerated: "1 week ago",
      status: "Ready",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">Generate and download various business reports.</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Create Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Active schedules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download or schedule your business reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{report.name}</p>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>Type: {report.type}</span>
                    <span>•</span>
                    <span>Last generated: {report.lastGenerated}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === "Ready" ? "default" : "secondary"}>{report.status}</Badge>
                  <Button variant="outline" size="sm" disabled={report.status !== "Ready"}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

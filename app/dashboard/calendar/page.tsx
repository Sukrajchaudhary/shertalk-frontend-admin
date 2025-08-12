import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CalendarIcon, Clock, Users } from "lucide-react"

export default function CalendarPage() {
  const events = [
    {
      id: 1,
      title: "Team Meeting",
      time: "9:00 AM - 10:00 AM",
      date: "Today",
      type: "Meeting",
      attendees: 5,
    },
    {
      id: 2,
      title: "Project Review",
      time: "2:00 PM - 3:30 PM",
      date: "Today",
      type: "Review",
      attendees: 3,
    },
    {
      id: 3,
      title: "Client Presentation",
      time: "10:00 AM - 11:00 AM",
      date: "Tomorrow",
      type: "Presentation",
      attendees: 8,
    },
    {
      id: 4,
      title: "Sprint Planning",
      time: "1:00 PM - 2:00 PM",
      date: "Tomorrow",
      type: "Planning",
      attendees: 6,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">Manage your schedule and upcoming events.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 meetings, 2 reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Total this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Events completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Your schedule overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded">
              <p className="text-muted-foreground">Calendar Component Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your next scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{event.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

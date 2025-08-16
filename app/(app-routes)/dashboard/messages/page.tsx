import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, MoreHorizontal } from "lucide-react"

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "John Smith",
      lastMessage: "Thanks for the quick response!",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      lastMessage: "Can we schedule a meeting for tomorrow?",
      time: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Mike Wilson",
      lastMessage: "The project looks great so far",
      time: "3h ago",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      lastMessage: "I'll send the files by end of day",
      time: "1d ago",
      unread: 0,
      online: false,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "John Smith",
      content: "Hi there! I wanted to follow up on our previous conversation.",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Of course! I was just about to reach out to you.",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "John Smith",
      content: "Perfect timing then! I have some updates on the project.",
      time: "10:33 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Great! I'd love to hear about them. Should we schedule a call?",
      time: "10:35 AM",
      isOwn: true,
    },
    {
      id: 5,
      sender: "John Smith",
      content: "Thanks for the quick response!",
      time: "10:36 AM",
      isOwn: false,
    },
  ]

  return (
    <div className="flex-1 p-4">
      <div className="grid gap-4 md:grid-cols-3 h-[calc(100vh-8rem)]">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer border-b"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{conversation.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

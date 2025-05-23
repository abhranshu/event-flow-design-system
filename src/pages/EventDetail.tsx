
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, Share2Icon, BookmarkIcon } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { toast } from "@/hooks/use-toast";

// Define the Event type
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  price: string;
  organizer: string;
  attendees: number;
  description: string;
  schedule: { day: string; events: { time: string; title: string; }[]; }[];
};

// Sample event data - in a real app this would come from an API
const eventsDataMap: Record<string, Event> = {
  "1": {
    id: "1",
    title: "Tech Summit 2025",
    date: "June 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Oberoi Hotel, Mumbai, India",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: "$299",
    organizer: "TechCorp Inc.",
    attendees: 1240,
    description: "Join us for the biggest tech summit of 2025. Connect with industry leaders, discover cutting-edge innovations, and expand your professional network. The three-day event will feature keynotes from top tech executives, hands-on workshops, and exclusive networking events.",
    schedule: [
      {
        day: "Day 1",
        events: [
          { time: "9:00 AM", title: "Registration & Breakfast" },
          { time: "10:00 AM", title: "Opening Keynote: The Future of Technology" },
          { time: "12:00 PM", title: "Lunch Break" },
          { time: "1:30 PM", title: "Panel Discussion: AI and Machine Learning" },
          { time: "3:30 PM", title: "Workshop: Cloud Computing Solutions" },
          { time: "5:30 PM", title: "Networking Reception" }
        ]
      },
      {
        day: "Day 2",
        events: [
          { time: "9:00 AM", title: "Breakfast" },
          { time: "10:00 AM", title: "Keynote: Cybersecurity in 2025" },
          { time: "12:00 PM", title: "Lunch Break" },
          { time: "1:30 PM", title: "Workshop: Blockchain Applications" },
          { time: "3:30 PM", title: "Panel: Startup Ecosystem" },
          { time: "6:00 PM", title: "Gala Dinner" }
        ]
      },
      {
        day: "Day 3",
        events: [
          { time: "9:00 AM", title: "Breakfast" },
          { time: "10:00 AM", title: "Workshop: Data Analytics" },
          { time: "12:00 PM", title: "Lunch Break" },
          { time: "1:30 PM", title: "Closing Keynote: Tech Trends" },
          { time: "3:30 PM", title: "Networking & Farewell" }
        ]
      }
    ]
  },
  "2": {
    id: "2",
    title: "Sunburn Music Festival",
    date: "July 10, 2025",
    time: "2:00 PM - 11:00 PM",
    location: "Taj Skyline, Ahemdabad, India",
    category: "Music",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    price: "$149",
    organizer: "Austin Events Co.",
    attendees: 5000,
    description: "Experience the largest music festival in Ahemdabad with performances from top artists across multiple genres. Enjoy a full day of music, food, and fun activities in the beautiful Zilker Park.",
    schedule: [
      {
        day: "Main Event",
        events: [
          { time: "2:00 PM", title: "Gates Open" },
          { time: "3:00 PM", title: "Opening Acts" },
          { time: "5:00 PM", title: "Local Artists Showcase" },
          { time: "7:00 PM", title: "Supporting Acts" },
          { time: "9:00 PM", title: "Headliner Performance" }
        ]
      }
    ]
  },
  "3": {
       id: "3",
    title: "Design Workshop",
    date: "August 5, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Chandni Chowk,Delhi, India",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "Free",
    organizer: "Austin Events Co.",
    attendees: 5000,
    description: "Experience the largest music festival in Austin with performances from top artists across multiple genres. Enjoy a full day of music, food, and fun activities in the beautiful Zilker Park.",
    schedule: [
      {
        day: "Main Event",
        events: [
          { time: "2:00 PM", title: "Gates Open" },
          { time: "3:00 PM", title: "Opening Acts" },
          { time: "5:00 PM", title: "Local Project Showcase" },
          { time: "7:00 PM", title: "Project Demonstration" },
          { time: "9:00 PM", title: "Winner Announcement" }
        ]
      }
    ]
  },
  "4": {
    id: "4",
    title: "Startup Networking",
    date: "September 12, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Bengaluru, Karnataka, India",
    category: "Business",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "49",
    organizer: "Startup Connect",
    attendees: 350,
    description: "A networking event for startups, entrepreneurs, and investors to connect, share ideas, and explore collaboration opportunities.",
    schedule: [
      {
        day: "Main Event",
        events: [
          { time: "2:00 PM", title: "Registration & Welcome" },
          { time: "3:00 PM", title: "Panel Discussion: Startup Success Stories" },
          { time: "4:30 PM", title: "Networking Session" },
          { time: "5:30 PM", title: "Closing Remarks" }
        ]
      }
    ]
  },
    "5": {
    id: "5",
    title: "Photography Exhibition",
    date: "October 8-10, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Chicago, IL",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "25",
    organizer: "Chicago Arts Association",
    attendees: 200,
    description: "A showcase of contemporary photography from emerging artists.",
    schedule: [
      {
        day: "Exhibition Days",
        events: [
          { time: "10:00 AM", title: "Exhibition Opens" },
          { time: "2:00 PM", title: "Artist Meet & Greet" },
          { time: "6:00 PM", title: "Exhibition Closes" }
        ]
      }
    ]
  }
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(eventsDataMap["1"]); // Default to first event

  useEffect(() => {
    // In a real app, this would be an API call
    if (id && eventsDataMap[id as keyof typeof eventsDataMap]) {
      setEventData(eventsDataMap[id as keyof typeof eventsDataMap]);
    } else {
      // If event not found, redirect to events page
      toast({
        title: "Event not found",
        description: "The event you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/events");
    }
  }, [id, navigate, toast]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Event removed from saved" : "Event saved!",
      description: isSaved 
        ? "The event has been removed from your saved events." 
        : "This event has been added to your saved events.",
    });
  };

  const handleShare = () => {
    // In a real app, this would copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Share link copied!",
      description: "Event link has been copied to your clipboard.",
    });
  };

  const handleRegister = () => {
    toast({
      title: "Registration in progress",
      description: `You are registering for ${eventData.title}. Please complete payment to confirm.`,
    });
    // In a real app, this would navigate to checkout
    setTimeout(() => navigate("/checkout"), 1500);
  };

  const handleContactOrganizer = () => {
    toast({
      title: "Contact Request Sent",
      description: `Your message to ${eventData.organizer} has been sent. They will respond shortly.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Event Header */}
        <div className="relative h-80 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${eventData.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="container mx-auto px-4 absolute bottom-0 left-0 right-0 pb-8 text-white">
            <Badge className="bg-event-purple hover:bg-purple-700 mb-3">{eventData.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{eventData.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {eventData.date}
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                {eventData.time}
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {eventData.location}
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="venue">Venue</TabsTrigger>
                  <TabsTrigger value="organizer">Organizer</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <p className="text-gray-700">{eventData.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">What You'll Learn</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Latest trends in technology and innovation</li>
                      <li>Networking opportunities with industry leaders</li>
                      <li>Hands-on experience with cutting-edge technologies</li>
                      <li>Insights into the future of the tech industry</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">Who Should Attend</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Technology professionals</li>
                      <li>Business leaders</li>
                      <li>Entrepreneurs and startup founders</li>
                      <li>Students and academics in tech fields</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule">
                  <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
                  <div className="space-y-8">
                    {eventData.schedule.map((day, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-bold mb-4">{day.day}</h3>
                        <div className="space-y-4">
                          {day.events.map((event, i) => (
                            <div key={i} className="flex gap-4 items-start">
                              <div className="min-w-[80px] text-gray-500 font-medium">
                                {event.time}
                              </div>
                              <div className="flex-1 bg-gray-50 p-3 rounded-md">
                                {event.title}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="venue">
                  <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
                  <div className="mb-6">
                    <p className="text-lg font-bold">Moscone Center</p>
                    <p className="text-gray-700">747 Howard St, San Francisco, CA 94103</p>
                    <p className="text-gray-700 mt-2">The Moscone Center is San Francisco's largest convention and exhibition complex.</p>
                  </div>
                  
                  <div className="bg-gray-200 rounded-lg h-80">
                    <div className="h-full w-full flex items-center justify-center">
                      <p className="text-gray-600">Map will be displayed here</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="organizer">
                  <h2 className="text-2xl font-bold mb-4">Organizer</h2>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-500">TC</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{eventData.organizer}</p>
                      <p className="text-gray-700">Event organizer since 2015</p>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <p className="text-gray-700">
                    TechCorp Inc. is a leading technology events organizer, specializing in conferences, summits, and workshops that bring together professionals from across the tech industry.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={handleContactOrganizer}>Contact Organizer</Button>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white border rounded-xl p-6 shadow-sm sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold">{eventData.price}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <UsersIcon className="h-3 w-3" />
                      {eventData.attendees} attending
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  className="w-full py-6 mb-4 btn-primary" 
                  onClick={handleRegister}
                >
                  Register Now
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 flex items-center gap-2"
                    onClick={handleSave}
                  >
                    <BookmarkIcon className="h-4 w-4" />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 flex items-center gap-2"
                    onClick={handleShare}
                  >
                    <Share2Icon className="h-4 w-4" />
                    Share
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-medium mb-2">Event Details</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-700">Date and Time</p>
                        <p className="font-medium">{eventData.date}</p>
                        <p className="font-medium">{eventData.time}</p>
                      </div>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <MapPinIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-700">Location</p>
                        <p className="font-medium">{eventData.location}</p>
                      </div>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <UsersIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-700">Refund Policy</p>
                        <p className="font-medium">Refundable until June 1, 2025</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;

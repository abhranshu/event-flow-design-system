
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, Share2Icon, BookmarkIcon } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Sample event data - in a real app this would come from an API
const eventData = {
  id: "1",
  title: "Tech Summit 2025",
  date: "June 15-17, 2025",
  time: "9:00 AM - 6:00 PM",
  location: "Moscone Center, San Francisco, CA",
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
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

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
    toast({
      title: "Share link copied!",
      description: "Event link has been copied to your clipboard.",
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
                  <Button variant="outline" className="mt-4">Contact Organizer</Button>
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
                
                <Button className="w-full py-6 mb-4 btn-primary">Register Now</Button>
                
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

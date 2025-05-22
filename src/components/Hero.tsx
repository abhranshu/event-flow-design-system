
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <section className="hero-pattern py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in">
              Find and Create <br />
              <span className="bg-gradient-to-r from-event-purple to-event-teal text-transparent bg-clip-text">
                Amazing Events
              </span>
            </h1>
            
            <p className="text-lg mb-8 text-gray-700 max-w-xl">
              Discover thousands of events near you or create your own and connect with people who share your interests.
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-md mx-auto md:mx-0 mb-8">
              <Input
                type="text"
                placeholder="Search events, workshops, concerts..."
                className="pr-16 pl-5 py-6 shadow-lg rounded-full border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-1 top-1 rounded-full h-10 w-10 p-0 btn-primary"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button 
                className="btn-primary" 
                size="lg"
                onClick={() => navigate("/events")}
              >
                Browse Events
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/create-event")}
              >
                Host Event
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="People at an event" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white p-4">
                <div className="event-badge bg-event-teal mb-2">Featured Event</div>
                <h3 className="text-xl font-bold">Tech Conference 2025</h3>
                <p className="text-sm">Join industry leaders and innovators</p>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-lg shadow-xl overflow-hidden hidden md:block animate-pulse-light">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                alt="People at a workshop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

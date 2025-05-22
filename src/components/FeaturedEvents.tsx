
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import EventCard from './EventCard';
import CategoryFilter from './CategoryFilter';

// Sample event data
const eventsData = [
  {
    id: "1",
    title: "Tech Summit 2025",
    date: "June 15-17, 2025",
    location: "San Francisco, CA",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "299"
  },
  {
    id: "2",
    title: "Annual Music Festival",
    date: "July 10, 2025",
    location: "Austin, TX",
    category: "Music",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "149"
  },
  {
    id: "3",
    title: "Design Workshop",
    date: "August 5, 2025",
    location: "New York, NY",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "Free"
  },
  {
    id: "4",
    title: "Startup Networking",
    date: "September 12, 2025",
    location: "Boston, MA",
    category: "Business",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "49"
  },
  {
    id: "5",
    title: "Photography Exhibition",
    date: "October 8-10, 2025",
    location: "Chicago, IL",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "25"
  },
  {
    id: "6",
    title: "Food & Wine Festival",
    date: "November 5, 2025",
    location: "Napa Valley, CA",
    category: "Food",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "75"
  },
];

// Extract unique categories
const categories = [...new Set(eventsData.map((event) => event.category))];

const FeaturedEvents = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  
  // Filter events based on active category
  const filteredEvents = activeCategory === "all" 
    ? eventsData 
    : eventsData.filter((event) => event.category === activeCategory);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
            <p className="text-gray-600">Discover upcoming events you might like</p>
          </div>
          <Button 
            variant="link" 
            className="text-event-purple"
            onClick={() => navigate("/events")}
          >
            View All Events
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No events found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;

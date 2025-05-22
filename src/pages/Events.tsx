
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Expanded events data for search testing
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
  {
    id: "7",
    title: "Web Development Conference",
    date: "January 20-22, 2026",
    location: "Seattle, WA",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "199"
  },
  {
    id: "8",
    title: "Jazz Festival",
    date: "February 15, 2026",
    location: "New Orleans, LA",
    category: "Music",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "89"
  },
  {
    id: "9",
    title: "Marketing Summit",
    date: "March 10, 2026",
    location: "Miami, FL",
    category: "Business",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "129"
  }
];

// Extract unique categories
const categories = [...new Set(eventsData.map((event) => event.category))];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter events based on active category and search query
  const filteredEvents = eventsData
    .filter(event => activeCategory === "all" || event.category === activeCategory)
    .filter(event => 
      searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <h1 className="text-4xl font-bold mb-4">Browse Events</h1>
              <p className="text-gray-600 mb-6">Find exciting events happening around you</p>
              
              <div className="relative max-w-md mb-8">
                <Input
                  type="text"
                  placeholder="Search events by title, location or category..."
                  className="pr-16 pl-5 py-6"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 top-3">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </div>
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
                <p className="text-xl text-gray-500">No events found. Try adjusting your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;

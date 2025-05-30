import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { useQuery } from '@tanstack/react-query';
import { Event } from '@/types/event';

const API_URL = 'http://localhost:5000/api';

const Events = () => {
  // Fetch events using React Query
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/events`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });
  
  // Filter for featured events only
  const featuredEvents = events?.filter(event => event.isFeatured) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-event-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured events...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center text-red-600">
            <p>Error loading events. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <h1 className="text-4xl font-bold mb-4">Featured Events</h1>
              <p className="text-gray-600 mb-6">Discover our handpicked selection of exceptional events</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard 
                  key={event._id} 
                  id={event._id}
                  title={event.title}
                  date={new Date(event.date).toLocaleDateString()}
                  location={event.location}
                  category={event.category}
                  image={event.image}
                  price={event.price.toString()}
                />
              ))}
            </div>
            
            {featuredEvents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">No featured events available at the moment.</p>
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

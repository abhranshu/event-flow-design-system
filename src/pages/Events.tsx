import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';

// Mock data for events
const mockEvents = [
  {
    _id: "1",
    title: "Tech Summit 2025",
    date: "2025-06-15",
    location: "San Francisco, CA",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "299",
    isFeatured: true
  },
  {
    _id: "2",
    title: "Annual Music Festival",
    date: "2025-07-10",
    location: "Austin, TX",
    category: "Music",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "149",
    isFeatured: true
  },
  {
    _id: "3",
    title: "Design Workshop",
    date: "2025-08-05",
    location: "New York, NY",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "Free",
    isFeatured: true
  },
  {
    _id: "4",
    title: "Startup Networking",
    date: "2025-09-12",
    location: "Boston, MA",
    category: "Business",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "49",
    isFeatured: true
  },
  {
    _id: "5",
    title: "Photography Exhibition",
    date: "2025-10-08",
    location: "Chicago, IL",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "25",
    isFeatured: true
  },
  {
    _id: "6",
    title: "Food & Wine Festival",
    date: "2025-11-05",
    location: "Napa Valley, CA",
    category: "Food",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "75",
    isFeatured: true
  }
];

const Events = () => {
  // Use mock data instead of API call
  const events = mockEvents;
  const featuredEvents = events.filter(event => event.isFeatured);

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


import React from 'react';
import { CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface EventProps {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  price?: string;
}

const EventCard = ({ id, title, date, location, category, image, price }: EventProps) => {
  return (
    <Link to={`/events/${id}`}>
      <Card className="event-card h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300"
          />
          {price && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-white text-event-purple hover:bg-gray-100 font-semibold shadow-md">
                {price === "Free" ? "Free" : `$${price}`}
              </Badge>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge className="bg-event-purple hover:bg-event-purple/90">
              {category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="pt-4 flex-grow">
          <h3 className="font-bold text-lg line-clamp-1 mb-1">{title}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <CalendarIcon className="h-4 w-4 mr-1" /> {date}
          </div>
          <p className="text-sm text-gray-500 line-clamp-1">{location}</p>
        </CardContent>
        
        <CardFooter className="pt-0">
          <button className="text-event-purple hover:text-purple-800 font-medium text-sm flex items-center">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;

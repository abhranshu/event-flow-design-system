import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, this would send data to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Event Created!",
        description: "Your event has been successfully created.",
      });
      
      navigate('/events');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Event Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your event"
              required
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium">
                Time
              </label>
              <Input
                id="time"
                name="time"
                type="time"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              name="location"
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter ticket price"
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/events')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent; 
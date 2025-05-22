
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/create-event");
    toast({
      title: "Get Started",
      description: "Create your first event in minutes!",
    });
  };

  const handleLearnMore = () => {
    navigate("/about");
    toast({
      title: "Learn More",
      description: "Discover how our platform can help you organize successful events.",
    });
  };

  return (
    <section className="py-16 bg-event-light">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Host Your Own Event?</h2>
              <p className="text-gray-700 mb-8">
                Create and manage your events with our easy-to-use platform. Reach your audience and sell tickets effortlessly.
              </p>
              <div className="space-y-3 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
                <Button className="btn-primary" size="lg" onClick={handleGetStarted}>
                  Get Started
                </Button>
                <Button variant="outline" size="lg" onClick={handleLearnMore}>
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 bg-cover bg-center h-64 md:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}>
              <div className="h-full w-full bg-gradient-to-r from-event-purple/60 to-event-teal/60 p-8 md:p-12 lg:p-16 flex items-end">
                <div className="text-white">
                  <p className="font-medium text-lg mb-2">Already a member?</p>
                  <Link to="/login" className="underline font-semibold">Sign in to your account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

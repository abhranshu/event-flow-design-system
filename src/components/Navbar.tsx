import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <button 
            onClick={() => handleNavigation('/')} 
            className="flex items-center"
          >
            <span className="text-2xl font-display font-bold text-event-purple">Event<span className="text-event-teal">Hub</span></span>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('/')} 
              className="text-sm font-medium hover:text-event-purple transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/events')} 
              className="text-sm font-medium hover:text-event-purple transition-colors"
            >
              Events
            </button>
            <button 
              onClick={() => handleNavigation('/categories')} 
              className="text-sm font-medium hover:text-event-purple transition-colors"
            >
              Categories
            </button>
            <button 
              onClick={() => handleNavigation('/about')} 
              className="text-sm font-medium hover:text-event-purple transition-colors"
            >
              About
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative animate-fade-in">
              <Input 
                type="text" 
                placeholder="Search events..." 
                className="w-[200px] lg:w-[300px]"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <div className="hidden sm:block">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-2" 
              onClick={() => handleNavigation("/login")}
            >
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="btn-primary" 
              onClick={() => handleNavigation("/signup")}
            >
              Sign Up
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3 bg-white">
            <button 
              onClick={() => handleNavigation('/')} 
              className="text-base font-medium hover:text-event-purple p-2 text-left"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/events')} 
              className="text-base font-medium hover:text-event-purple p-2 text-left"
            >
              Events
            </button>
            <button 
              onClick={() => handleNavigation('/categories')} 
              className="text-base font-medium hover:text-event-purple p-2 text-left"
            >
              Categories
            </button>
            <button 
              onClick={() => handleNavigation('/about')} 
              className="text-base font-medium hover:text-event-purple p-2 text-left"
            >
              About
            </button>
            <div className="pt-4 flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full sm:w-auto"
                onClick={() => handleNavigation("/login")}
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                className="btn-primary w-full sm:w-auto"
                onClick={() => handleNavigation("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

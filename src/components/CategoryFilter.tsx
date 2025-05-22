
import React from 'react';
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: CategoryFilterProps) => {
  return (
    <div className="overflow-x-auto pb-2 mb-8">
      <div className="flex space-x-2 min-w-max">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          className={activeCategory === "all" ? "bg-event-purple hover:bg-purple-700" : ""}
          onClick={() => setActiveCategory("all")}
        >
          All Events
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={activeCategory === category ? "bg-event-purple hover:bg-purple-700" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

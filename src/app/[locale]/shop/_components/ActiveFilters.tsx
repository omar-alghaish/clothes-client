'use client'
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ActiveFilter {
  type: string;
  value: string;
}

const ActiveFilterButton = ({ 
  label, 
  onRemove 
}: { 
  label: string;
  onRemove: () => void;
}) => {
  return (
    <button 
      className="flex items-center gap-2 border rounded-xl px-3 py-1 hover:bg-accent"
      onClick={onRemove}
    >
      {label} <X size={16} />
    </button>
  );
};

const ActiveFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [allFilters, setAllFilters] = useState<ActiveFilter[]>([]);

  // Get all current filters from URL
  useEffect(() => {
    const filters: ActiveFilter[] = [];
    const params = new URLSearchParams(searchParams);

    // Add all filter types to the array
    ['category', 'color', 'size', 'brand', 'price'].forEach(type => {
      params.getAll(type).forEach(value => {
        filters.push({ type, value });
      });
    });

    setAllFilters(filters);
  }, [searchParams]);

  const handleRemoveFilter = (filterType: string, filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    const newValues = params.getAll(filterType).filter(v => v !== filterValue);
    
    params.delete(filterType);
    newValues.forEach(v => params.append(filterType, v));
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams);
    ['category', 'color', 'size', 'brand', 'price'].forEach(type => {
      params.delete(type);
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-foreground/50">Showing 1-12 of 250 results</h1>
        <div className="flex items-center gap-2">
          Sort by
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <h2 className="w-max font-extrabold text-foreground/60">Active Filters</h2>
        <div className="flex gap-2 flex-wrap flex-1">
          {allFilters.map((filter, index) => (
            <ActiveFilterButton
              key={`${filter.type}-${filter.value}-${index}`}
              label={filter.value}
              onRemove={() => handleRemoveFilter(filter.type, filter.value)}
            />
          ))}
        </div>
        {allFilters.length > 0 && (
          <Button 
            variant="link" 
            className="text-destructive"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
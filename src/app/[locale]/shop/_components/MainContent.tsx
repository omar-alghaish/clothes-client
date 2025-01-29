import React from "react";
import Filters from "./Filters";
import ActiveFilters from "./ActiveFilters";
import Products from "./Products";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const MainContent = () => {
  return (
    <div className="container mt-20 flex flex-col md:flex-row gap-6 px-4">
      {/* Desktop Filters */}
      <div className="hidden md:block w-full md:w-[250px] lg:w-[300px] sticky top-20 h-max">
        <Filters />
      </div>

      {/* Mobile Filters Drawer */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="default"
              className="fixed bottom-4 right-4 z-50 shadow-lg"
              size="lg"
            >
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh] overflow-hidden">
            <ScrollArea className="h-[70vh] overflow-y-auto p-4">
              <Filters />
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        <ActiveFilters />
        <Products />
      </div>
    </div>
  );
};

export default MainContent;
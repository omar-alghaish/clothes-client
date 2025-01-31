import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h1 className="font-extrabold text-2xl">Logout</h1>
        <p>Are you sure you want ot logout</p>
      </div>

      <Button
        variant="outline"
        className="border-destructive rounded-xl font-extrabold text-lg p-6 text-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        Logout
      </Button>
    </div>
  );
};

export default page;

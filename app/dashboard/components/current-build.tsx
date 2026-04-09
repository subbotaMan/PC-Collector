"use client";

import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { Component } from "@/lib/types";
import { useState } from "react";

export const CurrentBuild = () => {
  const [selectedByCategory, setSelectedByCategory] = useState<
    Record<string, Component>
  >({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  return (
    <>
      <div className="flex-justify-between mb-8">
        <TypographyH1>Собери свою сборку</TypographyH1>
        <Button
          className="mt-5 cursor-pointer transition-all duration-300 
             shadow-md hover:shadow-xl hover:-translate-y-0.5 
             hover:shadow-primary/30 active:translate-y-0"
          onClick={() => setSaveDialogOpen(true)}
        >
          Собрать
        </Button>
      </div>
    </>
  );
};

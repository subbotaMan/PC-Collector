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
          size="lg"
          className="hover-lift bg-blue-500 px-4"
          onClick={() => setSaveDialogOpen(true)}
        >
          Собрать
        </Button>
      </div>

      <div className="min-w-0 overflow-x-auto"></div>
    </>
  );
};

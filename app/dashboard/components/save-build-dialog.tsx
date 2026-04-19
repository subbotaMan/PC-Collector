"use client";

import { Component } from "@/lib/types";
import { SaveBuildFromState } from "../actions";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import { Preloader } from "@/lib/preloader";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
};

const initialState: SaveBuildFromState = { status: "idle" };

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath,
}: Props) {
  const router = useRouter();
  const refForm = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const componentIds = useMemo(
    () =>
      Object.values(selectedByCategory)
        .filter((componet): componet is Component => componet !== null)
        .map((component) => component.id),
    [selectedByCategory]
  );

  useEffect(() => {}, [onOpenChange, redirectPath, router]);

  // Handler
  const handleOpenChange = (nextOpen: boolean) => {
    // Сброс формы до исходного состояния при закрытии модального окна.
    if (!nextOpen) refForm.current?.reset();

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Сохранить сборку</DialogTitle>
          <DialogDescription>Введите название сборки</DialogDescription>
        </DialogHeader>

        <form ref={refForm} className="space-y-4">
          {/* UI input */}
          <Input
            name="name"
            placeholder="Название сборки"
            defaultValue={defaultName}
            required
          />

          {/* Скрытое поле для передачи данных на backend */}
          <input
            type="hidden"
            name="componentIds"
            value={componentIds.join(",")}
          />
          <DialogFooter>
            <Button type="submit" disabled={pending || componentIds.length < 1}>
              {pending ? <Preloader /> : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

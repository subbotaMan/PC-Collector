"use client";

import { Component } from "@/lib/types";
import { saveBuildAction, SaveBuildFromState } from "../actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef } from "react";
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
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
};

const initialState: SaveBuildFromState = { status: "idle" };

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedCategory,
  defaultName,
  redirectPath,
}: Props) {
  const router = useRouter();
  const refForm = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  // Action, который будет вызываться при сабмите формы.
  const [state, formAction] = useActionState(saveBuildAction, initialState);

  // <<<<<< ID's выбранных компонентов для сохранения их в конкретной сборке >>>>>>
  const componentIds = useMemo(
    () =>
      Object.values(selectedCategory) // Беру все выбранные категории (cpu, gpu...)
        .filter((componet): componet is Component => componet !== null) // Убираю пустые(не выбранные) слоты
        .map((component) => component.id), // Забираю id
    [selectedCategory]
  );

  useEffect(() => {
    // <<<<<< При успешном создании билда >>>>>>
    if (state.status === "success") {
      // Показываю тостер с сообщением.
      toast.success("Сборка сохранена");
      // Сбрасываю форму.
      refForm.current?.reset();
      // Закрываю модальное окно.
      onOpenChange(false);

      if (redirectPath) {
        // Делаю редирект на страницу созданного билда.
        router.push(redirectPath);
      } else {
        // Или обновляю страницу.
        router.refresh();
      }
    }
  }, [onOpenChange, redirectPath, router, state.status]);

  // Handler для сброса формы при закрытии окна сохранения.
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

        <form ref={refForm} action={formAction} className="space-y-4">
          {/* UI input */}
          <Input
            name="name"
            maxLength={20}
            placeholder="Название сборки"
            defaultValue={defaultName}
            required
          />

          {/* Скрытое поле для передачи данных на backend при сохранении сборки */}
          <input
            type="hidden"
            name="componentIds"
            value={componentIds.join(",")}
          />

          {/* Кнопка сохранить */}
          <DialogFooter>
            <Button
              type="submit"
              disabled={pending || componentIds.length < 1}
              className="cursor-pointer"
            >
              {pending ? <Preloader /> : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

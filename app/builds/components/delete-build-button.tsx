"use client";

import { useTransition, useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Preloader } from "@/lib/preloader";

type Props = {
  buildId: string;
  deleteAction: (formData: FormData) => void;
};

export function DeleteBuildButton({ buildId, deleteAction }: Props) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  //   isPending && <Preloader />;

  const handleDelete = () => {
    // Пустой объект FormData.
    const fd = new FormData();
    // Добавляю поле name "buildId" и значение из пропса buildId.
    fd.set("buildId", buildId);
    startTransition(() => deleteAction(fd));
  };

  return (
    <>
      <Button
        type="button"
        size="icon-lg"
        variant="destructive"
        disabled={isPending}
        onClick={() => setShowConfirm(true)}
        className="cursor-pointer !w-auto !px-3"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Удаление...
          </>
        ) : (
          "Удалить"
        )}
      </Button>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Удалить сборку?"
        description="Вы уверены, что хотите удалить эту сборку? Это действие нельзя отменить."
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </>
  );
}

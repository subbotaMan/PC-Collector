import { Component, dbTypeToCategoryId } from "@/lib/types";

type BuildComponentInput = {
  id: string;
  name: string;
  price: number;
  type: Component["type"];
  socket: string | null;
};

type Props = {
  buildName: string;
  buildComponents: BuildComponentInput[];
};

function buildInitialSelected(
  buildComponents: BuildComponentInput[]
): Record<string, Component | null> {
  const selected: Record<string, Component | null> = {};

  for (const c of buildComponents) {
    const categoryId = dbTypeToCategoryId[c.type];

    if (categoryId) {
      selected[categoryId] = {
        id: c.id,
        name: c.name,
        price: c.price,
        socket: c.socket,
        type: c.type,
      };
    }
  }

  return selected;
}

export function EditBuildForm({ buildName, buildComponents }: Props) {}

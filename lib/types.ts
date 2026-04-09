export type ComponentCategory = {
  id: string;
  name: string;
  icon: string;
};

export type Component = {
  id: string;
  name: string;
  price: string;
  socket: string | null;
  type: ComponentType;
};

export type ComponentType =
  | "cpu"
  | "gpu"
  | "ram"
  | "ssd"
  | "motherboard"
  | "psu"
  | "case"
  | "cooler";

// Если я отправляю запрос в базу данных.
export const categoryIdToDbType: Record<string, ComponentType> = {
  // Record - объект словарь. Ключ - string. Значение -  одно из значений ComponentType.
  cpu: "cpu",
  gpu: "gpu",
  ram: "ram",
  storage: "ssd", // storage на человеческом языке = ssd на языке базы данных
  motherboard: "motherboard",
  psu: "psu",
  case: "case",
  cooling: "cooler",
};

// Если база данных прислала мне запрос.
export const dbTypeToCategoryId: Record<ComponentType, string> = {
  cpu: "cpu",
  gpu: "gpu",
  ram: "ram",
  ssd: "storage",
  motherboard: "motherboard",
  psu: "psu",
  case: "case",
  cooler: "cooling",
};

import { OrderStatus } from "@/api/Order/types";

export type TableItem = {
  id: string;
  customer: string;
  createdAt: string;
  status: OrderStatus;
  carpetsNumber: number;
  update: string;
}

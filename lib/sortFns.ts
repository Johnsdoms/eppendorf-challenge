import type { Row } from "@tanstack/react-table";
import type { Product } from "../app/table/columns";
import { sort } from "color-sorter";

export function hexSortingFn(rowA: Row<Product>, rowB: Row<Product>): number {
  const colorA = rowA.original.color;
  const colorB = rowB.original.color;

  if (colorA === colorB)
    return 0;

  const sorted = sort([colorA, colorB]);

  return sorted[0] === colorA ? -1 : 1;
}

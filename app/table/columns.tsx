"use client"
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// simplification of what a valid hex value is
type ColorValueHex = `#${string}`;

export interface Product  {
  id: number;
  location: string;
  type: string;
  device_health: string;
  last_used: string;
  price: string;
  color: ColorValueHex;
}

export const columns: ColumnDef<Product>[] = [
  {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "device_health",
    header: "Device Health",
  },
  {
    accessorKey: "last_used",
    header: "Last Used",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right">{formatted}</div>
    },
  },
  {
      accessorKey: "color",
      header: () => <div className="text-right">Color</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end items-center gap-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: row.getValue("color") }} />
            <span className="min-w-16 text-right">{row.getValue("color")}</span>
          </div>
        );
      },
  },
]

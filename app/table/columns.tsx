"use client"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { SortableColumnHeader } from "@/components/sortableColumnHeader"
import { hexSortingFn } from "@/lib/sortFns"

// simplification of what a valid hex value is
type ColorValueHex = `#${string}`

export interface Product {
  id: number
  location: string
  type: string
  device_health: string
  last_used: string
  price: string
  color: ColorValueHex
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <SortableColumnHeader
          title="ID"
          type="numeric"
          sortDirection={column.getIsSorted()}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.getValue("id")}</div>
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <SortableColumnHeader
          title="Location"
          type="alpha"
          sortDirection={column.getIsSorted()}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.getValue("location")}</div>
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <SortableColumnHeader
          title="Type"
          type="alpha"
          sortDirection={column.getIsSorted()}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.getValue("type")}</div>
    },
  },
  {
    accessorKey: "device_health",
    header: ({ column }) => {
      return (
        <SortableColumnHeader
          title="Device Health"
          type="alpha"
          sortDirection={column.getIsSorted()}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.getValue("device_health")}</div>
    },
  },
  {
    accessorKey: "last_used",
    header: ({ column }) => {
      return (
        <SortableColumnHeader
          title="Last used"
          type="date"
          sortDirection={column.getIsSorted()}
          onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      )
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.getValue("last_used")}</div>
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <SortableColumnHeader
            title="Price"
            type="numeric"
            sortDirection={column.getIsSorted()}
            onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right pr-4">{formatted}</div>
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <SortableColumnHeader
            title="Color"
            type="numeric"
            sortDirection={column.getIsSorted()}
            onSort={() => {
              column.toggleSorting(column.getIsSorted() === "asc")
            }}
          />
        </div>
      )
    },
    sortingFn: (rowA: Row<Product>, rowB: Row<Product>): number => {
      return hexSortingFn(rowA, rowB)
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-end items-center gap-1 pr-4">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: row.getValue("color") }} />
          <span className="min-w-16 text-right">{row.getValue("color")}</span>
        </div>
      )
    },
  },
]

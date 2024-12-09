import type { Product } from "./columns";
import data from "../data.json";
import { columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): Product[] {
  // simpy return the data from the json file
  return data as Product[];
}

export default function TablePage() {
  const data = getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    ArrowUpDown, 
    ArrowDownAz, 
    ArrowDownZa, 
    ArrowDown01, 
    ArrowDown10,
    CalendarArrowDown,
    CalendarArrowUp
  } from "lucide-react"

type SortDirection = "asc" | "desc" | false;

type ColumnType = "alpha" | "numeric" | "date";

interface SortableColumnHeaderProps {
    title: string;
    type: ColumnType;
    sortDirection: SortDirection;
    onSort: () => void;
}

interface SortedIconProps {
    className: string;
    type: ColumnType;
    sortDirection: SortDirection;
}

function SortedIcon({className, type, sortDirection}: SortedIconProps) {
  if (type === "alpha") {
    return sortDirection === "asc" ? <ArrowDownAz className={className} /> : <ArrowDownZa className={className} />;
  }
  if (type === "numeric") {
    return sortDirection === "asc" ? <ArrowDown01 className={className} /> : <ArrowDown10 className={className} />;
  }
  return sortDirection === "asc" ? <CalendarArrowUp className={className} /> : <CalendarArrowDown className={className} />;
}

export function SortableColumnHeader({title, type, sortDirection, onSort}: SortableColumnHeaderProps) {  
  return (
    <Button
      variant="ghost"
      onClick={() => onSort()}
    >
      {title}
      {!sortDirection && 
        <ArrowUpDown />
      }
      {sortDirection && 
        <Badge className="border-green-600 px-1" variant={"outline"}>
          <SortedIcon className="text-green-600" type={type} sortDirection={sortDirection}/>
        </Badge>
      }
    </Button>
  )
}
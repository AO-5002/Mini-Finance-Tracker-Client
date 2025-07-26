import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropDownFilterProps = {
  setSortBy: (value: string) => void;
  setOrder: (value: "ASC" | "DESC") => void;
};

export function DropDownFilter({ setSortBy, setOrder }: DropDownFilterProps) {
  const handleDateFilter = (date: string, order: "ASC" | "DESC") => {
    setSortBy(date);
    setOrder(order);
  };

  const handleAmountFilter = (amount: string, order: "ASC" | "DESC") => {
    setSortBy(amount);
    setOrder(order);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-zinc-800 text-white font-bold hover:cursor-pointer text-sm flex items-center justify-center"
        >
          <SlidersHorizontal />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleDateFilter("createdAt", "DESC")}
          >
            Date
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleAmountFilter("amount", "DESC")}
          >
            Amount
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

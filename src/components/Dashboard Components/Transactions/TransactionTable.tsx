import { Button } from "@/components/ui/button";
import { TableSelf } from "./TableSelf";
import { CreateTransaction } from "./BtnComponents/CreateTransaction";
import { Import } from "lucide-react";
import { useState } from "react";
import { DropDownFilter } from "./BtnComponents/DropDownFilter";

export default function TransactionTable() {
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<"ASC" | "DESC" | undefined>(undefined);
  return (
    <div className="h-full row-start-3 col-start-2 col-span-4 rounded-lg bg-[#fff] ">
      <div className="h-full w-full grid grid-rows-[100px_1fr]  gap-4 ">
        <div className="h-full w-full shadow-lg p-4 rounded-lg flex justify-center items-center gap-4">
          <div className="h-full w-full flex flex-row items-center gap-4">
            <CreateTransaction />
            <DropDownFilter setSortBy={setSortBy} setOrder={setOrder} />
          </div>

          <Button className="bg-zinc-800 text-white font-bold hover:cursor-pointer text-sm flex items-center justify-center">
            <Import />
            Import
          </Button>
        </div>
        <div className="w-full h-full shadow-lg p-4">
          <TableSelf sortBy={sortBy} order={order} />
        </div>
      </div>
    </div>
  );
}

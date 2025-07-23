import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CreateTransaction() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-white bg-indigo-500 font-bold hover:cursor-pointer text-sm flex items-center justify-center">
          <Plus />
          Transaction
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Transaction</SheetTitle>
          <SheetDescription>
            Input name, type, and amount for this transaction.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Type</Label>
            <Input id="sheet-demo-username" defaultValue="" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-amount">Amount</Label>
            <Input id="sheet-demo-username" defaultValue="" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

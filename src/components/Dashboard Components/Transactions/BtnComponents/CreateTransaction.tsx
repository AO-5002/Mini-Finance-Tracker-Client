import { useState } from "react";
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
import type { TransactionSchema } from "@/utility/Schemas/Transaction";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createTransaction } from "@/utility/APIs/TransactionAPI";
import { useAccessToken } from "@/hooks/useAccessToken";
import { toast } from "sonner";

export function CreateTransaction() {
  const getAccessToken = useAccessToken();
  const queryClient = useQueryClient(); // Use the hook instead

  const [form, setForm] = useState({
    transactionName: "",
    type: "",
    amount: "",
  });

  const { mutate } = useMutation({
    mutationFn: async (
      transactionObject: Omit<TransactionSchema, "id" | "createdAt">
    ) => {
      const token = getAccessToken();
      await createTransaction(token, transactionObject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      toast("Success!");
    },
    onError: () => {
      toast("Fail!");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    mutate({
      transactionName: form.transactionName,
      amount: Number(form.amount),
      type: form.type,
    });
    setForm({ transactionName: "", type: "", amount: "" });
  };

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
            <Label htmlFor="transactionName">Name</Label>
            <Input
              id="transactionName"
              value={form.transactionName}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="type">Type</Label>
            <Input id="type" value={form.type} onChange={handleChange} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" value={form.amount} onChange={handleChange} />
          </div>
        </div>
        <SheetFooter>
          <Button type="button" onClick={() => handleSubmit()}>
            Save changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

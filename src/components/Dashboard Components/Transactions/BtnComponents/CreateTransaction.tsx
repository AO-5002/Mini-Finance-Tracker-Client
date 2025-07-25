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
import {
  type Transaction,
  TransactionSchema,
} from "@/utility/Schemas/Transaction";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createTransaction } from "@/utility/APIs/TransactionAPI";
import { useAccessToken } from "@/hooks/useAccessToken";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateTransaction() {
  const getAccessToken = useAccessToken();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(
      TransactionSchema.omit({ id: true, createdAt: true })
    ),
  });

  const { mutate } = useMutation({
    mutationFn: async (
      transactionObject: Omit<Transaction, "id" | "createdAt">
    ) => {
      const token = getAccessToken();
      await createTransaction(token, transactionObject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      toast("Success!");
      reset();
    },
    onError: () => {
      toast("Fail!");
    },
  });

  const onSubmit = (data: Omit<Transaction, "id" | "createdAt">) => {
    mutate(data);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="transactionName">Name</Label>
              <Input
                id="transactionName"
                {...register("transactionName")} // ✅ Remove manual validation
              />
              {errors.transactionName && (
                <span className="text-red-400">
                  {errors.transactionName.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                {...register("type")} // ✅ Remove manual validation
              />
              {errors.type && (
                <span className="text-red-400">{errors.type.message}</span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number" // ✅ Add number type for better UX
                {...register("amount", { valueAsNumber: true })} // ✅ Convert to number
              />
              {errors.amount && (
                <span className="text-red-400">{errors.amount.message}</span>
              )}
            </div>
          </div>

          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline" type="button">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

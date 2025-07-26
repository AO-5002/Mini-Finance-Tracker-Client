import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccessToken } from "@/hooks/useAccessToken";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema } from "@/utility/Schemas/Transaction";
import { useMutation } from "@tanstack/react-query";
import { type Transaction } from "@/utility/Schemas/Transaction";
import {
  updateTransaction,
  deleteTransaction,
} from "@/utility/APIs/TransactionAPI";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "./ConfirmPopup";

interface EditTransactionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction;
}

export function EditTransaction({
  open,
  onOpenChange,
  transaction,
}: EditTransactionProps) {
  const queryClient = useQueryClient();
  const getAccessToken = useAccessToken();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { register, getValues } = useForm({
    resolver: zodResolver(
      TransactionSchema.omit({ id: true, createdAt: true }).partial()
    ),
  });

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: async (transactionObject: Transaction) => {
      console.log("🔥 Update Mutation started with:", transactionObject);
      const token = getAccessToken();
      const { id, createdAt, ...dataToSend } = transactionObject;
      console.log("🔥 Sending to API - ID:", id, "Data:", dataToSend);

      await updateTransaction(transactionObject.id, token, dataToSend);
    },
    onSuccess: (data) => {
      console.log("🔥 Update Mutation SUCCESS:", data);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast("Transaction Updated!");
      onOpenChange(false);
    },
    onError: (error) => {
      console.log("🔥 Update Mutation ERROR:", error);
      toast("Failed to update Transaction!");
    },
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      console.log("🔥 Delete Mutation started with ID:", id);
      const token = getAccessToken();
      const result = await deleteTransaction(token, id);
      console.log("🔥 Delete API response:", result);
      return result;
    },
    onSuccess: () => {
      console.log("🔥 Delete Mutation SUCCESS");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast("Transaction Deleted!");
      onOpenChange(false);
    },
    onError: (error) => {
      console.log("🔥 Delete Mutation ERROR:", error);
      toast("Failed to delete Transaction!");
    },
  });

  const handleSaveChanges = () => {
    console.log("🔧 DEBUG - Save button clicked");

    if (!transaction?.id) {
      toast("No transaction ID found!");
      return;
    }

    const formData = getValues();
    console.log("🔧 DEBUG - Form data from getValues:", formData);
    console.log("🔧 DEBUG - Original transaction:", transaction);

    const updatedFields = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    console.log("🔧 DEBUG - Filtered updated fields:", updatedFields);

    // ✅ Convert amount to number if present
    if ("amount" in updatedFields) {
      const parsedAmount = parseFloat(updatedFields.amount as string);
      if (!isNaN(parsedAmount)) {
        updatedFields.amount = parsedAmount;
      } else {
        toast("Amount must be a valid number.");
        return;
      }
    }
    const fullTransaction: Transaction = {
      ...transaction,
      ...updatedFields,
    };

    console.log("🔧 DEBUG - Full transaction to send:", fullTransaction);
    updateMutate(fullTransaction);
  };

  const handleDelete = () => {
    if (!transaction?.id) {
      toast("No transaction ID found!");
      return;
    }
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (transaction?.id) {
      deleteMutate(transaction.id);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>
              Make changes to your transaction here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="transactionName">Transaction Name</Label>
              <Input
                id="transactionName"
                defaultValue={transaction?.transactionName || ""}
                {...register("transactionName")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                defaultValue={transaction?.type || ""}
                {...register("type")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                defaultValue={transaction?.amount || ""}
                {...register("amount")}
              />
            </div>
          </div>

          <DialogFooter className="mt-8 gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={isUpdating || isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleDelete}
              variant="destructive"
              disabled={isUpdating || isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              type="button"
              onClick={handleSaveChanges}
              disabled={isUpdating || isDeleting}
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete Transaction"
        description={`Are you sure you want to delete "${transaction?.transactionName}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
}

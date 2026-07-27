"use client";

import { useState, useTransition } from "react";
import {
  Check,
  Loader2,
  X,
  BadgeIndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { approveWithdrawal } from "@/actions/admin/withdrawals/approve-withdrawal";
import { rejectWithdrawal } from "@/actions/admin/withdrawals/reject-withdrawal";
import { markWithdrawalPaid } from "@/actions/admin/withdrawals/mark-withdrawal-paid";

interface Props {
  withdrawalId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PAID";
}

export default function WithdrawalActions({
  withdrawalId,
  status,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  const [message, setMessage] =
    useState("");

  const [transactionId, setTransactionId] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  function approve() {
    setMessage("");

    startTransition(async () => {
      const result =
        await approveWithdrawal(
          withdrawalId
        );

      setMessage(result.message);
    });
  }

  function reject() {
    setMessage("");

    startTransition(async () => {
      const result =
        await rejectWithdrawal(
          withdrawalId,
          remarks
        );

      setMessage(result.message);
    });
  }

  function markPaid() {
    setMessage("");

    startTransition(async () => {
      const result =
        await markWithdrawalPaid(
          withdrawalId,
          transactionId
        );

      setMessage(result.message);

      if (result.success) {
        setTransactionId("");
      }
    });
  }

  if (
    status === "PAID" ||
    status === "REJECTED"
  ) {
    return null;
  }

  return (
    <div className="space-y-3">
      {status === "PENDING" && (
        <>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={approve}
              disabled={pending}
              size="sm"
            >
              {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}

              Approve
            </Button>

            <Input
              value={remarks}
              onChange={(event) =>
                setRemarks(
                  event.target.value
                )
              }
              placeholder="Reason if rejecting"
              disabled={pending}
              className="sm:max-w-xs"
            />

            <Button
              variant="destructive"
              onClick={reject}
              disabled={pending}
              size="sm"
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </>
      )}

      {status === "APPROVED" && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={transactionId}
            onChange={(event) =>
              setTransactionId(
                event.target.value
              )
            }
            placeholder="UPI / Bank Transaction ID"
            disabled={pending}
            className="sm:max-w-sm"
          />

          <Button
            onClick={markPaid}
            disabled={
              pending ||
              !transactionId.trim()
            }
            size="sm"
          >
            {pending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BadgeIndianRupee className="mr-2 h-4 w-4" />
            )}

            Mark Paid
          </Button>

          <Input
            value={remarks}
            onChange={(event) =>
              setRemarks(
                event.target.value
              )
            }
            placeholder="Reason if rejecting"
            disabled={pending}
            className="sm:max-w-xs"
          />

          <Button
            variant="destructive"
            onClick={reject}
            disabled={pending}
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </div>
      )}

      {message && (
        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      )}
    </div>
  );
}
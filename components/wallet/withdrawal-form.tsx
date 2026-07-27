"use client";

import { useState, useTransition } from "react";
import {
  Building2,
  Loader2,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestWithdrawal } from "@/actions/wallet/request-withdrawal";

interface Props {
  balance: number;
}

export default function WithdrawalForm({
  balance,
}: Props) {
  const [mode, setMode] =
    useState<"UPI" | "BANK">("UPI");

  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");

  const [accountName, setAccountName] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [ifscCode, setIfscCode] =
    useState("");

  const [bankName, setBankName] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [pending, startTransition] =
    useTransition();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);

    const numericAmount = Number(amount);

    startTransition(async () => {
      const result =
        mode === "UPI"
          ? await requestWithdrawal({
              payoutMode: "UPI",
              amount: numericAmount,
              upiId,
            })
          : await requestWithdrawal({
              payoutMode: "BANK",
              amount: numericAmount,
              accountName,
              accountNumber,
              ifscCode,
              bankName,
            });

      setMessage(result.message);
      setSuccess(result.success);

      if (result.success) {
        setAmount("");
        setUpiId("");
        setAccountName("");
        setAccountNumber("");
        setIfscCode("");
        setBankName("");
      }
    });
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <div>
        <h2 className="text-xl font-semibold">
          Withdraw Funds
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Minimum withdrawal amount is ₹600.
        </p>
      </div>

      {balance < 600 ? (
        <div className="mt-6 rounded-lg border bg-muted/40 p-4">
          <p className="text-sm font-medium">
            Withdrawal unavailable
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            You need at least ₹600 in your
            available balance.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          {/* Amount */}
          <div>
            <label className="text-sm font-medium">
              Withdrawal Amount
            </label>

            <Input
              type="number"
              min={600}
              max={balance}
              step="0.01"
              value={amount}
              onChange={(event) =>
                setAmount(
                  event.target.value
                )
              }
              placeholder="Minimum ₹600"
              className="mt-2"
              required
            />

            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Minimum ₹600</span>

              <span>
                Available ₹
                {balance.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>

          {/* Mode */}
          <div>
            <label className="text-sm font-medium">
              Receive Money Via
            </label>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setMode("UPI")
                }
                className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition ${
                  mode === "UPI"
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                UPI
              </button>

              <button
                type="button"
                onClick={() =>
                  setMode("BANK")
                }
                className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition ${
                  mode === "BANK"
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                <Building2 className="h-4 w-4" />
                Bank Account
              </button>
            </div>
          </div>

          {/* UPI */}
          {mode === "UPI" && (
            <div>
              <label className="text-sm font-medium">
                UPI ID
              </label>

              <Input
                value={upiId}
                onChange={(event) =>
                  setUpiId(
                    event.target.value
                  )
                }
                placeholder="name@upi"
                className="mt-2"
                required
              />
            </div>
          )}

          {/* Bank */}
          {mode === "BANK" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Account Holder Name
                </label>

                <Input
                  value={accountName}
                  onChange={(event) =>
                    setAccountName(
                      event.target.value
                    )
                  }
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Bank Name
                </label>

                <Input
                  value={bankName}
                  onChange={(event) =>
                    setBankName(
                      event.target.value
                    )
                  }
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Account Number
                </label>

                <Input
                  value={accountNumber}
                  onChange={(event) =>
                    setAccountNumber(
                      event.target.value
                    )
                  }
                  inputMode="numeric"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  IFSC Code
                </label>

                <Input
                  value={ifscCode}
                  onChange={(event) =>
                    setIfscCode(
                      event.target.value
                        .toUpperCase()
                    )
                  }
                  placeholder="ABCD0123456"
                  className="mt-2 uppercase"
                  required
                />
              </div>
            </div>
          )}

          {message && (
            <div
              className={`rounded-lg p-3 text-sm ${
                success
                  ? "bg-green-500/10 text-green-600"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={pending}
          >
            {pending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            {pending
              ? "Submitting..."
              : "Request Withdrawal"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Your balance is reserved when the
            withdrawal request is submitted.
          </p>
        </form>
      )}
    </div>
  );
}
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { decrypt } from "@/lib/utils";
import Transactions from "@/components/Transactions";
function ViewTransactions(props: any) {
  const [transactions, setTransactions] = useState<any>([]);
  const [decrypting, setDecrypting] = useState<boolean>(false);
  const [viewTnx, setViewTnx] = useState<boolean>(false);
  const keyIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.getItem("encTnx")
      ? setTransactions(JSON.parse(localStorage.getItem("encTnx")!))
      : null;
  }, []);

  const decryptTransactions = async () => {
    if (!keyIdRef.current?.value) {
      alert("Please enter a valid key id");
      return;
    }
    setDecrypting(true);
    let encTnx = JSON.parse(localStorage.getItem("encTnx") || "[]");
    if (encTnx.length === 0) {
      alert("No transactions found");
      setDecrypting(false);
      return;
    }
    // try {
    //   decrypt(encTnx[0], keyIdRef?.current?.value);
    // } catch (error) {
    //   alert("Invalid key id");
    //   setDecrypting(false);
    //   return;
    // }
    let decTnx = encTnx.map((txn: any) => {
      try {
        return decrypt(
          txn,
          keyIdRef.current?.value ? keyIdRef.current?.value : ""
        );
      } catch (error) {
        // alert("Error decrypting transaction");
        return null;
      }
    });
    decTnx = decTnx.filter((txn: any) => txn !== null);
    setTransactions(decTnx);
    setDecrypting(false);
    setViewTnx(true);
  };

  return (
    <div className="w-[1000px]">
      <Dialog
        open={props.open}
        onOpenChange={() => {
          props.handleClose();
          setTransactions(JSON.parse(localStorage.getItem("encTnx") || "[]"));
          setViewTnx(false);
        }}
      >
        <DialogContent
          onPointerDownOutside={props.handleClose}
          onEscapeKeyDown={props.handleClose}
          className="max-w-fit"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-4">
              View All Transactions
            </DialogTitle>
          </DialogHeader>
          <DialogDescription style={{ display: "none" }}>
            View All Transactions
          </DialogDescription>
          All customer transactions are securely encrypted 🔒 and stored in the
          database. To view them, please enter a valid system key below and
          click “Decrypt & View” to access all transactions.
          <Input ref={keyIdRef} placeholder="Enter Key ID" className="mt-4" />
          <div className="flex ">
            <Button className="m-4 w-full" onClick={() => setViewTnx(true)}>
              View Encrypted Data
            </Button>
            <Button
              className="m-4 w-full"
              onClick={decryptTransactions}
              disabled={decrypting}
            >
              {decrypting ? "Decrypting" : "Decrypt & View"}
              <Spinner className="text-white" size="large" show={decrypting} />
            </Button>
          </div>
          {viewTnx && (
            <div>
              <Transactions transactions={transactions} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewTransactions;

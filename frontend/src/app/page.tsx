"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Transactions from "@/components/Transactions";
import { useRef } from "react";
import Processing from "@/components/Processing";
import { encrypt } from "@/lib/utils";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useKey } from "@/lib/KeyContext";
import Link from "next/link";
export default function Home() {
  const { key, updateKey } = useKey();
  const [transactions, setTransactions] = useState(Array<any>());
  const billRef = useRef<HTMLInputElement>(null);
  const sendRef = useRef<HTMLInputElement>(null);
  const upiRef = useRef<HTMLInputElement>(null);
  const custRef = useRef<HTMLInputElement>(null);
  const providerRef = useRef<HTMLInputElement>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    localStorage.getItem("transactions")
      ? setTransactions(JSON.parse(localStorage.getItem("transactions")!))
      : null;
  }, []);

  const addTransaction = (type: string, value: number) => {
    if (value <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setIsProcessing(true);
    const transactionId = `TXN-${Math.floor(Math.random() * 1000000000)}`;
    const newTransaction = {
      id: transactionId,
      type: type,
      amount: value,
      date: new Date().toLocaleDateString("en-US"),
    };
    setTransactions([...transactions, newTransaction]);
    localStorage.setItem(
      "transactions",
      JSON.stringify([...transactions, newTransaction])
    );
    let encTnx = JSON.parse(localStorage.getItem("encTnx") || "[]");
    encTnx.push(encrypt(newTransaction, key));
    localStorage.setItem("encTnx", JSON.stringify(encTnx));
    if (type === "Bill Payment" && billRef.current) {
      billRef.current.value = "";
    } else if (type === "Amount Sent" && sendRef.current) {
      sendRef.current.value = "";
    }
    upiRef.current ? (upiRef.current.value = "") : null;
    custRef.current ? (custRef.current.value = "") : null;
    providerRef.current ? (providerRef.current.value = "") : null;
  };

  const handleClose = () => {
    setIsProcessing(false);
  };

  return (
    <div className="flex  ">
      <div className="w-[300px] h-[92vh] bg-white shadow-xl">
        <div className="w-[90%] h-[50px] rounded-lg m-auto mt-[25px] bg-slate-200 flex justify-start items-center cursor-pointer shadow-md">
          <DashboardIcon className="w-[20px] h-[20px] m-[15px]" />
          <p className="text-[15px] font-semibold">Dashboard</p>
        </div>
      </div>
      <div className="flex flex-col pl-5 w-full bg-inherit mt-4">
        <div className="w-[75vw] p-4 pb-2">
          <h1 className="text-xl font-bold">Welcome to Your Dashboard</h1>
          <p className="text-md mt-2 text-gray-600">
            At BankEase, we understand that protecting your assets and
            transactions is our top priority. That’s why we use the
            industry-leading KMIP protocol to secure every transaction. The{" "}
            <Link
              className="text-primary underline"
              href={
                "https://en.wikipedia.org/wiki/Key_Management_Interoperability_Protocol"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Key Management Interoperability Protocol (KMIP)
            </Link>{" "}
            is a powerful standard for securely managing cryptographic keys
            across different applications and systems. By using KMIP, BankEase
            ensures that sensitive data remains protected with top-tier
            security.
          </p>
        </div>
        <div className="flex items-center mb-2">
          <div className="p-4 w-[400px]">
            <Card>
              <CardHeader>
                <CardTitle>Send Money</CardTitle>
                <CardDescription>
                  Send Money easily to any Recipient
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="mb-4">
                    <p className="mb-2">Enter Recipient</p>
                    <Input ref={upiRef} />
                  </div>
                  <div>
                    <p className="mb-2">Enter Amount</p>
                    <Input ref={sendRef} type="number" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    console.log(sendRef);
                    addTransaction(
                      "Amount Sent",
                      sendRef.current?.value ? Number(sendRef.current.value) : 0
                    );
                  }}
                >
                  Send
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="p-4 w-[400px]">
            <Card>
              <CardHeader>
                <CardTitle>Pay Bill</CardTitle>
                <CardDescription>Easily Pay Your Utility Bills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-4 items-end mb-4">
                  <div className="w-[50%]">
                    <p className="mb-2"> Service Provider </p>
                    <Input ref={providerRef} />
                  </div>
                  <div className="w-[50%]">
                    <p className="mb-2">Enter Customer ID</p>
                    <Input ref={custRef} />
                  </div>
                </div>
                <div>
                  <p className="mb-2">Enter Amount</p>
                  <Input ref={billRef} type="number" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    console.log(billRef);
                    addTransaction(
                      "Bill Payment",
                      billRef.current?.value ? Number(billRef.current.value) : 0
                    );
                  }}
                >
                  Pay
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Transactions transactions={transactions} />
        <Processing open={isProcessing} handleClose={handleClose} />

        {/* <div className="basis-1 h-0"></div> */}
      </div>
    </div>
  );
}

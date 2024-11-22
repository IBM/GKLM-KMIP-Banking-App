"use client";
import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import ViewKey from "./viewKey";
import CreateKey from "./CreateKey";
import FetchKey from "./FetchKey";
import Rekey from "./Rekey";
import DeleteKey from "./DeleteKey";
import ViewTransactions from "./ViewTransactions";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
function Page() {
  const [viewKey, setViewKey] = useState(false);
  const [createKey, setCreateKey] = useState(false);
  const [fetchKey, setFetchKey] = useState(false);
  const [rekey, setRekey] = useState(false);
  const [deleteKey, setDeleteKey] = useState(false);
  const [viewTransactions, setViewTransactions] = useState(false);
  return (
    <div>
      <div className="flex flex-col justify-start items-start  p-4 bg-white shadow-md rounded mt-5 ml-5 *:text-slate-900 w-[80vw]">
        <h2 className=" text-lg font-semibold tracking-tight first:mt-0">
          Welcome, Administrator
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          You are viewing the transaction management interface. Here you can
          access all client transactions. Security Notice: All individual
          transactions are securely encrypted using keys generated from{" "}
          <strong>Guardium Key Lifecycle Manager (GKLM)</strong> using{" "}
          <strong>Key Management Interoperability Protocol (KMIP)</strong>.
        </p>
        <div>
          <Link
            href={"https://www.encryptionconsulting.com/education-center/kmip/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
          >
            <Button
              variant="link"
              className="leading-7 [&:not(:first-child)]:mt-4 p-0"
            >
              Click here
              <ExternalLink className="w-4 h-4 translate-x-[-2px] translate-y-[-2px]" />
            </Button>
          </Link>{" "}
          <span>to know more about KMIP</span>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          In this interface, you can view the current encryption key used for
          transaction data. You also have the ability to provision new GKLM keys
          as needed. These newly provisioned keys can be applied to encrypt both
          upcoming transactions and existing transactions from previous weeks.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          For a comprehensive audit of all keys used by the store, please visit
          the Guardium Key Lifecycle Management tool.
        </p>
      </div>
      <div className="flex items-start justify-start  p-4 gap-4 w-[80vw] flex-wrap">
        <Card
          onClick={() => setViewKey(true)}
          className="w-[300px] h-[150px] rounded-lg shadow-lg cursor-pointer "
        >
          <CardContent className="flex items-center justify-start pl-6 w-full h-full">
            <p className="text-lg font-semibold">View Currently Set Key</p>
          </CardContent>
        </Card>
        <Card
          onClick={() => setCreateKey(true)}
          className="w-[300px] h-[150px] rounded-lg shadow-lg cursor-pointer"
        >
          <CardContent className="flex items-center justify-start pl-6 w-full h-full">
            <p className="text-lg font-semibold">Create New Key</p>
          </CardContent>
        </Card>
        <Card
          onClick={() => setFetchKey(true)}
          className="w-[300px] h-[150px] rounded-lg shadow-lg cursor-pointer"
        >
          <CardContent className="flex items-center justify-start pl-6 w-full h-full">
            <p className="text-lg font-semibold">Fetch Key Details</p>
          </CardContent>
        </Card>
        <Card
          onClick={() => setRekey(true)}
          className="w-[300px] h-[150px] rounded-lg shadow-lg cursor-pointer"
        >
          <CardContent className="flex items-center justify-start pl-6 w-full h-full">
            <p className="text-lg font-semibold">Rekey</p>
          </CardContent>
        </Card>
        <Card
          onClick={() => setDeleteKey(true)}
          className="w-[300px] h-[150px] rounded-lg shadow-lg cursor-pointer"
        >
          <CardContent className="flex items-center justify-start pl-6 w-full h-full">
            <p className="text-lg font-semibold">Delete Key</p>
          </CardContent>
        </Card>
        <Card
          onClick={() => setViewTransactions(true)}
          className="w-[300px] h-[150px] rounded-lg shadow-lg cursor-pointer"
        >
          <CardContent className="flex items-center justify-start pl-6 w-full h-full">
            <p className="text-lg font-semibold">View All Transactions</p>
          </CardContent>
        </Card>
        <ViewKey open={viewKey} handleClose={() => setViewKey(false)} />
        <CreateKey open={createKey} handleClose={() => setCreateKey(false)} />
        <FetchKey open={fetchKey} handleClose={() => setFetchKey(false)} />
        <Rekey open={rekey} handleClose={() => setRekey(false)} />
        <DeleteKey open={deleteKey} handleClose={() => setDeleteKey(false)} />
        <ViewTransactions
          open={viewTransactions}
          handleClose={() => setViewTransactions(false)}
        />
      </div>
    </div>
  );
}

export default Page;

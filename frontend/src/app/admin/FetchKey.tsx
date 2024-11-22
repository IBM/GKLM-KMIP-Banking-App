"use client";
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";

function FetchKey(props: any) {
  const [keyDetails, setKeyDetails] = useState<any>({});
  const [fetching, setFetching] = useState<boolean>(false);
  const keyIdRef = useRef<HTMLInputElement>(null);
  const fetchKeyDetails = async () => {
    if (!keyIdRef.current?.value) {
      alert("Please enter a valid key id");
      return;
    }

    setFetching(true);

    await axios
      .post("/api/key-details", {
        key_id: keyIdRef.current.value,
      })
      .then((res) => {
        console.log(res.data);
        setKeyDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.includes("ITEM_NOT_FOUND")) {
          alert("Key Not Found");
        } else {
          alert("Error Getting Key Details");
        }
      });
    setFetching(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onOpenChange={() => {
          props.handleClose();
          setKeyDetails({});
        }}
      >
        <DialogContent
          onPointerDownOutside={props.handleClose}
          onEscapeKeyDown={props.handleClose}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-4">
              Fetch Key Details
            </DialogTitle>
          </DialogHeader>
          <DialogDescription style={{ display: "none" }}>
            Fetch Details of a Key
          </DialogDescription>
          Enter the key ID in the box below, then click “Fetch Key” to view all
          key details, including various attributes associated with it.
          <br />
          <Input ref={keyIdRef} placeholder="Enter Key ID" className="mt-4" />
          <Button onClick={fetchKeyDetails} disabled={fetching}>
            {fetching ? "Fetching Key Details" : "Fetch Key Details"}
            <Spinner className="text-white" size="large" show={fetching} />
          </Button>
          {Object.keys(keyDetails).length > 0 && (
            <>
              <p>Below are the details of this key:</p>
              <ul>
                {Object.keys(keyDetails).map((key) => {
                  return (
                    <li key={key} className="flex gap-5 p-2">
                      <span className="mr-2 min-w-[200px] inline-block">
                        {key}
                      </span>{" "}
                      - <span className="inline-block">{keyDetails[key]}</span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FetchKey;

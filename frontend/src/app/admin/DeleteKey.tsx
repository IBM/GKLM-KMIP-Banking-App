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
import { useKey } from "@/lib/KeyContext";

function FetchKey(props: any) {
  const { key } = useKey();
  const [keyDeleted, setKeyDeleted] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const keyIdRef = useRef<HTMLInputElement>(null);
  const deleteKey = async () => {
    if (!keyIdRef.current?.value) {
      alert("Please enter a valid key id");
      return;
    }
    if (keyIdRef.current.value === key) {
      alert(
        "The currently set key cannot be deleted as it’s actively in use. Please perform a Rekey operation first, and then proceed with deleting this key."
      );
      return;
    }

    setFetching(true);

    await axios
      .post("/api/delete-key", {
        key_id: keyIdRef.current.value,
      })
      .then((res) => {
        console.log(res.data);
        setKeyDeleted(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.includes("ITEM_NOT_FOUND")) {
          alert("Key Not Found");
        } else {
          alert("Error Deleting Key");
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
          setKeyDeleted(false);
        }}
      >
        <DialogContent
          onPointerDownOutside={props.handleClose}
          onEscapeKeyDown={props.handleClose}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-4">
              Delete Key
            </DialogTitle>
          </DialogHeader>
          <DialogDescription style={{ display: "none" }}>
            Delete a Key
          </DialogDescription>
          Enter the key ID below and click “Delete Key” to permanently remove it
          from the system, including GKLM.
          <br /> <strong>Warning: This action is irreversible.</strong>
          <Input ref={keyIdRef} placeholder="Enter Key ID" className="mt-4" />
          <Button onClick={deleteKey} disabled={fetching}>
            {fetching ? "Deleting Key" : "Delete Key"}
            <Spinner className="text-white" size="large" show={fetching} />
          </Button>
          {keyDeleted && <p>Key Deleted Successfully</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FetchKey;

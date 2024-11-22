"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getRandomLetter } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { useKey } from "@/lib/KeyContext";

function Rekey(props: any) {
  const { key, updateKey } = useKey();
  const [newKeyGenerated, setNewKeyGenerated] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const generateKey = async () => {
    setGenerating(true);

    await axios
      .post("/api/create-key", {
        key_name: getRandomLetter() + getRandomLetter() + getRandomLetter(),
      })
      .then((res) => {
        updateKey(res.data.key_id);
        console.log(res.data.key_id);
        setNewKeyGenerated(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setGenerating(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onOpenChange={() => {
          props.handleClose();
          setNewKeyGenerated(false);
        }}
      >
        <DialogContent
          onPointerDownOutside={props.handleClose}
          onEscapeKeyDown={props.handleClose}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-4">
              ReKey
            </DialogTitle>
          </DialogHeader>
          <DialogDescription style={{ display: "none" }}>
            ReKey
          </DialogDescription>
          You&apos;ll be creating a new AES 256 bits key, which will replace the
          existing system key and mark it for decommissioning. Click the button
          below to perform the rekey operation. <br />
          <Button onClick={generateKey} disabled={generating}>
            {generating ? "Generating Key" : "ReKey"}
            <Spinner className="text-white" size="large" show={generating} />
          </Button>
          {newKeyGenerated && (
            <p>
              The following key has been generated and set: <br /> {key}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Rekey;

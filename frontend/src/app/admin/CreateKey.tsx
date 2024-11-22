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

function CreateKey(props: any) {
  const [newKey, setNewKey] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const generateKey = async () => {
    setGenerating(true);

    await axios
      .post("/api/create-key", {
        key_name: getRandomLetter() + getRandomLetter() + getRandomLetter(),
      })
      .then((res) => {
        console.log(res.data.key_id);
        setNewKey(res.data.key_id);
      })
      .catch((err) => {
        console.log(err);
        alert("Error generating key");
      });
    setGenerating(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onOpenChange={() => {
          props.handleClose();
          setNewKey("");
        }}
      >
        <DialogContent
          onPointerDownOutside={props.handleClose}
          onEscapeKeyDown={props.handleClose}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-4">
              Create A New Key
            </DialogTitle>
          </DialogHeader>
          <DialogDescription style={{ display: "none" }}>
            Currently Set Key
          </DialogDescription>
          You&apos;ll be creating a new AES 256 bits key. This key can be used
          to encrypt your data. Click the button below to generate a new key.
          <br />
          <Button onClick={generateKey} disabled={generating}>
            {generating ? "Generating Key" : "Generate New Key"}
            <Spinner className="text-white" size="large" show={generating} />
          </Button>
          {newKey && (
            <p>
              Here is your new key: <br /> {newKey}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateKey;

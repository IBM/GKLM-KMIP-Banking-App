"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import "./Processing.css";
import { LockClosedIcon } from "@radix-ui/react-icons";
function Processing(props: any) {
  const [loadingText, setLoadingText] = useState("Transaction Processing");
  useEffect(() => {
    if (props.open) {
      setTimeout(() => {
        props.handleClose();
        setLoadingText("Transaction Processing");
      }, 7000);
      setTimeout(() => {
        setLoadingText("Securing Your Transaction With KMIP");
      }, 3500);
    }
  }, [props.open]);

  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle style={{ display: "none" }}>Processing</DialogTitle>
        <DialogContent className="[&>button]:hidden">
          <DialogDescription style={{ display: "none" }}>
            Processing Transaction
          </DialogDescription>
          <div className="flex items-center gap-2">
            <div className="loader"></div>
            <div className="text-lg font-semibold text-zinc-950 ml-4 transition-all flex">
              {loadingText}
              {loadingText.includes("KMIP") && (
                <LockClosedIcon className="w-6 h-6 font-semibold ml-2" />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Processing;

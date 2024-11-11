"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useKey } from "@/lib/KeyContext";

function ViewKey(props: any) {
  const { key, updateKey } = useKey();

  return (
    <div>
      <Dialog
        open={props.open}
        onOpenChange={() => {
          props.handleClose();
        }}
      >
        <DialogContent
          onPointerDownOutside={props.handleClose}
          onEscapeKeyDown={props.handleClose}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-4">
              Currently Set Key
            </DialogTitle>
          </DialogHeader>
          <DialogDescription style={{ display: "none" }}>
            Currently Set Key
          </DialogDescription>
          {key}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewKey;

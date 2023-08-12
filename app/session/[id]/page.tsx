"use client";

import { FileTransfer } from "@/components/FIleTransfer";
import { usePeer } from "@/utils/peerContext";
import { useParams } from "next/navigation";
import { DataConnection } from "peerjs";
import { useEffect, useState } from "react";

export default function Session() {
  const peer = usePeer();
  const { id } = useParams();

  const [connection, setConnection] = useState<DataConnection>();

  useEffect(() => {
    if (!peer) return;

    setConnection(peer.connect(id as string, { reliable: true }));
  }, [id, peer]);

  return (
    <main className="flex gap-4 flex-col">
      <FileTransfer connection={connection} />
    </main>
  );
}

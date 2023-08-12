"use client";

import { FileTransfer } from "@/components/FIleTransfer";
import { usePeer } from "@/contexts/PeerContext";
import { DataConnection } from "peerjs";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { TbBrandSpeedtest } from "react-icons/tb";
import { AiOutlineSafety, AiOutlineStar } from "react-icons/ai";
import { IconItem } from "@/components/IconItem";

export default function Home() {
  const peer = usePeer();
  const url = `${window.location.origin}/session/${peer?.id}`;

  const [connection, setConnection] = useState<DataConnection>();

  useEffect(() => {
    if (!peer) return;

    peer.on("connection", setConnection);
  }, [peer]);

  return (
    <main className="flex gap-4 flex-col">
      <div className="flex py-4 flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center">
          <p className="text-2xl font-light">
            Effortlessly move files between your devices
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-lg">Why use quick-share?</p>
          <IconItem
            icon={<TbBrandSpeedtest />}
            title="Fast"
            description="Quick-share uses WebRTC allowing peer-to-peer communication.
                When transfering data in your local network, the only limiting
                factor is your router."
          />
          <IconItem
            icon={<AiOutlineSafety />}
            title="Safe"
            description="Thanks to peer-to-peer communication, your data is never saved
            on a server. This means that your data is never exposed to third
            parties."
          />
          <IconItem
            icon={<AiOutlineStar />}
            title="Simple"
            description=" No logins required. Just scan the QR code and you are ready to
            go."
          />
        </div>
      </div>
      <div className="flex gap-4 rounded-xl p-4 bg-black bg-opacity-10 flex-col sm:flex-row">
        <QRCode value={url} />
        <div className="flex justify-between flex-col">
          <p className="text-lg">
            Scan the QR code using your mobile device to initiate connection
          </p>
          <div>
            <p className="">Or open the following address</p>
            <a className="text-indigo-500" href={url}>
              {url}
            </a>
          </div>
        </div>
      </div>
      <FileTransfer connection={connection} />
    </main>
  );
}

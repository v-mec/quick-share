"use client";

import Peer from "peerjs";
import { createContext, useContext, useEffect, useState } from "react";

const PeerContext = createContext<Peer | null>(null);

export const usePeer = () => {
  return useContext(PeerContext);
};

export const PeerProvider = ({ children }: { children: React.ReactNode }) => {
  const [peer, setPeer] = useState<Peer | null>(null);

  useEffect(() => {
    const peerInstance = new Peer();

    peerInstance.on("open", () => {
      console.log("Connected to PeerJS server with ID:", peerInstance.id);
      setPeer(peerInstance);
    });

    return () => {
      peerInstance.destroy();
    };
  }, []);

  return <PeerContext.Provider value={peer}>{children}</PeerContext.Provider>;
};

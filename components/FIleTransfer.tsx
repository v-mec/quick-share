import { Data } from "@/utils/types";
import clsx from "clsx";
import fileDownload from "js-file-download";
import { DataConnection } from "peerjs";
import { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";

type FileTransferProps = {
  connection?: DataConnection;
};

export function FileTransfer(props: FileTransferProps) {
  const [notification, setNotification] = useState<string>();

  useEffect(() => {
    props.connection?.on("data", (data) => {
      const castedData = data as Data;

      setNotification("Receiving files");
      fileDownload(castedData.file, castedData.fileName);
    });
  }, [props.connection]);

  useEffect(() => {
    if (!notification) return;

    const timeout = setTimeout(() => {
      setNotification(undefined);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files?.length) return;

    setNotification("Sending files");

    Array.from(files).forEach((file) => {
      const data: Data = {
        file: file,
        fileName: file.name,
      };

      props.connection?.send(data);
    });
  };

  return (
    <>
      <div
        className={clsx(
          "absolute top-6 right-4 rounded-xl px-4 py-2 bg-black  transition-transform ease-in-out flex items-center gap-2 text-white",
          !notification && "-translate-y-20 opacity-0"
        )}
      >
        <span className="text-indigo-500">
          <FiInfo />
        </span>
        {notification}
      </div>
      {props.connection ? (
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-black bg-opacity-10">
          <p>
            Select files to be transfered to your other device or wait for
            incoming files
          </p>
          <input
            type="file"
            className="file:border-0 file:rounded-xl file:bg-indigo-500 file:bg-opacity-20 hover:file:bg-opacity-30 dark:file:text-white file:px-3 file:py-2 file:mr-2 file:cursor-pointer file:transition"
            multiple
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <p className="animate-pulse text-center">Waiting for connection</p>
      )}
    </>
  );
}

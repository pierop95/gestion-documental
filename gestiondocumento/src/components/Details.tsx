import { useEffect, useState } from "react";
import { getById } from "../services/get";
import { Document } from "../models/Documents";

interface Props {
  readonly id: string;
}

export function Details({ id }: Props) {
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    getById(id).then((response) => {
      if (response.status === 200) {
        setDocument(response.data as Document);
      }
    });
  }, [id]);

  return (
    <div
      style={{
        backgroundColor: "gray",
        border: "1px solid black",
        padding: "10px",
      }}
    >
      <h1>{document?.title}</h1>
      <p>{document?.content}</p>
    </div>
  );
}

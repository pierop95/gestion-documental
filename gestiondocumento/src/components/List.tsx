import { useEffect, useState } from "react";
import { getAll } from "../services/get";
import { Document } from "../models/Documents";
import { Details } from "./Details";

export function List() {
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    getAll().then((response) => {
      if (response.status === 200) {
        setDocuments(response.data);
      }
    });
  }, []);

  function handleDocumentClick(documentId: string) {
    if (id === "" || id !== documentId) {
      setId(documentId);
    } else {
      setId("");
    }
  }

  return (
    <div>
      <h1>Documents</h1>
      {documents.length > 0 ? (
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            listStyleType: "none",
            gap: "2vw",
            width: "50vw",
          }}
        >
          {documents.map((doc) => (
            <li
              style={{
                backgroundColor: "#292929",
                borderRadius: "20px",
                width: "100%",
                padding: "0.5rem",
              }}
              key={doc.id}
            >
              <h2>{doc.title}</h2>
              <p>{doc.content}</p>
              <button
                onClick={() => {
                  handleDocumentClick(doc?.id as string);
                }}
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents found.</p>
      )}
      <div>{documents.length > 0 && id !== "" && <Details id={id} />}</div>
    </div>
  );
}

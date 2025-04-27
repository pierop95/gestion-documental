import { API_BASE } from "../config/url";
import { ApiResponse } from "../models/Api";
import { Document } from "../models/Documents";

export async function createDocument(document: Document) {
  const result = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(document),
  });

  const data = await result.json();

  const response: ApiResponse<Document> = {
    data: data,
    status: result.status,
  };

  return response;
}

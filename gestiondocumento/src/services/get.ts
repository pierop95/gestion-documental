import { API_BASE } from "../config/url";
import { ApiResponse } from "../models/Api";
import { Document } from "../models/Documents";

export async function getAll() {
  const result = await fetch(API_BASE);
  const data = await result.json();

  const response: ApiResponse<Document[]> = {
    data: data,
    status: result.status,
  };

  return response;
}

export async function getById(id: string) {
  const result = await fetch(`${API_BASE}/${id}`);
  const data = await result.json();

  const response: ApiResponse<Document> = {
    data: data.data,
    status: result.status,
  };

  return response;
}

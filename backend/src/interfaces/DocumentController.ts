import { Request, Response } from "express";
import { create, getAll, getById } from "../application/DocumentService";
import { datos } from "../infrastructure/DocumentRepositoryInMemory";

export function getDocuments(res: Response) {
  getAll(res);
}

export function createDocument(req: Request, res: Response) {
  create(req, res);
}

export function getDocumentById(req: Request, res: Response) {
  getById(req, res);
}

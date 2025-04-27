import { Router, Request, Response } from "express";
import {
  createDocument,
  getDocumentById,
  getDocuments,
} from "./interfaces/DocumentController";

const router = Router();

router.post("/documents", (req: Request, res: Response) => {
  createDocument(req, res);
});

router.get("/documents", (_req: Request, res: Response) => {
  getDocuments(res);
});

router.get("/documents/:id", (req: Request, res: Response) => {
  getDocumentById(req, res);
});

export default router;

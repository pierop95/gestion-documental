import { Request, Response } from "express";
import { Document, validateCurrentData } from "../domain/Document";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs";
import { datos } from "../infrastructure/DocumentRepositoryInMemory";

export async function getAll(res: Response) {
  res.json(datos);
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const document = datos.find((doc) => doc.id === id);
  if (document) {
    res.status(200).json({ data: document, message: "Document found" });
  } else {
    res.status(404).json({ message: "Document not found" });
  }
}

export async function create(req: Request, res: Response) {
  const data = req.body as Document;
  const filePath = path.resolve(
    __dirname,
    `../../src/infrastructure/DocumentRepositoryInMemory.ts`
  );

  const parsedData = {
    ...data,
    id: uuid(),
  };

  let arrayData = validateCurrentData(filePath);

  arrayData.push(parsedData);

  const contentData = `export const datos = ${JSON.stringify(
    arrayData,
    null,
    2
  )};\n`;

  await fs.writeFile(filePath, contentData, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).json({ message: "Error writing file" });
    } else {
      res.status(200).json({ message: "File written successfully" });
    }
  });
}

import fs from "fs";

export interface Document {
  id: string;
  title: string;
  content: string;
}

export function validateCurrentData(filePath: string): any[] {
  if (fs.existsSync(filePath)) {
    const currentContent = fs.readFileSync(filePath, "utf-8");
    const match = currentContent.match(/export const datos = (.*);/s);

    if (match && match[1]) {
      try {
        return eval(match[1]);
      } catch (e) {
        console.error("Error to parsed exist data:", e);
      }
    }
  }
  return [];
}

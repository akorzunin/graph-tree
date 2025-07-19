import { readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import { g2 } from "./test_layout";

export async function fetchFiles(path: string) {
  // TODO: пока не понятно откуда будетм читать файлы
  const dir = await readDir(path, { baseDir: BaseDirectory.Document });
  console.log(dir);
  return g2;
}

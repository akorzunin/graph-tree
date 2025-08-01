import { readDir, BaseDirectory, DirEntry } from "@tauri-apps/plugin-fs";

export interface FileNode {
  type: "dir" | "file";
  id: number;
  label: string;
  color: string;
}

export async function fetchFiles(path: string) {
  const dir: DirEntry[] = await readDir(path, {
    baseDir: BaseDirectory.Document,
  });
  // const dir: DirEntry[] = await readDir(path);
  // return dir.filter((f) => f.isSymlink === false);
  const l: FileNode[] = dir.map((f, i) => ({
    type: f.isDirectory ? "dir" : "file",
    id: i + 1,
    label: f.name,
    color: getColor(i),
  }));
  const root: FileNode = {
    type: "dir",
    id: 10000,
    label: "root",
    color: getColor(l.length),
  };

  return {
    nodes: [root, ...l],
    links: getLinks(root, l),
  };
}

function getLinks(root: FileNode, l: FileNode[]) {
  return l.map((node) => {
    return { source: node.id, target: root.id };
  });
}

function getColor(n: number): any {
  return "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0");
}

export function parsePath(path: string) {
  const l = path.split("/").filter((p) => p !== "");
  if (l.length === 0) return ["."];
  if (l[0] !== ".") l.unshift(".");
  return l;
}

export function dotdot(path: string) {
  if (path === ".") return ".";
  return parsePath(path).slice(0, -1).join("/");
}

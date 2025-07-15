import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

interface FileNode {
  name: string;
  is_dir: boolean;
  children: FileNode[];
}

interface FileTreeState {
  tree: FileNode[];
  selectedPath: string | null;
}

export default function FileExplorer() {
  const [fileTree, setFileTree] = useState<FileTreeState>({
    tree: [
      {
        name: ".",
        is_dir: true,
        children: [],
      },
      {
        name: "aboba",
        is_dir: true,
        children: [
          {
            name: "pepe",
            is_dir: true,
            children: [],
          },
        ],
      },
    ],
    selectedPath: ".",
  });

  //   const toggleDirectory = async (path: string, isDir: boolean) => {
  //     try {
  //       const data = await invoke("get_file_tree", { path });
  //       setFileTree((prevState) => ({
  //         ...prevState,
  //         tree: prevState.tree.map((node) =>
  //           node.name === path && node.is_dir ? { ...node, children: data } : node
  //         ),
  //       }));
  //     } catch (error) {
  //       console.error("Failed to expand directory:", error);
  //     }
  //   };

  const FileNodeComponent = ({ node }: { node: FileNode }) => (
    <div key={node.name}>
      <div
        className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer ${
          node.is_dir ? "folder" : "file"
        }`}
        // onClick={() => node.is_dir && toggleDirectory(node.name, true)}
      >
        <span>{node.is_dir ? "📁" : "📄"}</span>
        <span>{node.name}</span>
      </div>
      {node.is_dir && (
        <div className="ml-4">
          {node.children.map((child) => (
            <FileNodeComponent key={child.name} node={child} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full h-[60vh] overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4">File Explorer</h2>
      {fileTree.tree.map((node) => (
        <FileNodeComponent key={node.name} node={node} />
      ))}
    </div>
  );
}

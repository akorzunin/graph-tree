import type ForceGraph from "force-graph";
import ForceGraph2D from "react-force-graph-2d";
import { dotdot, fetchFiles, FileNode } from "../uitls/fs";

interface FileNodeWithCoords extends FileNode {
  x: number;
  y: number;
}
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { GraphControls } from "./GraphControls";
import { useAtom, useAtomValue } from "jotai";
import {
  chargeAtom,
  cliArgsAtom,
  cliLevelAtom,
  cliPathAtom,
  distanceAtom,
  strengthAtom,
} from "../store/store";

const BASE_RADIUS = 6;
const BASE_TRIANGLE_SIZE = 7;

function nodePaint(
  node: FileNodeWithCoords,
  color: string,
  ctx: CanvasRenderingContext2D,
) {
  ctx.fillStyle = "#000";
  ctx.font = "12px Sans-Serif";
  ctx.textAlign = "center";
  ctx.fillText(node.label, node.x, node.y - 12);

  ctx.fillStyle = color;

  if (!node.label) {
    ctx.fillRect(node.x - 6, node.y - 4, 12, 8);
    return;
  }
  if (node.type === "dir") {
    ctx.beginPath();
    ctx.arc(node.x, node.y, BASE_RADIUS * 1.5, 0, 2 * Math.PI, false);
    ctx.fill();
  } else if (node.type === "file") {
    ctx.beginPath();
    ctx.moveTo(node.x, node.y - BASE_TRIANGLE_SIZE);
    ctx.lineTo(node.x - BASE_TRIANGLE_SIZE, node.y + BASE_TRIANGLE_SIZE);
    ctx.lineTo(node.x + BASE_TRIANGLE_SIZE, node.y + BASE_TRIANGLE_SIZE);
    ctx.fill();
  }
}

export function FG() {
  const fgRef = useRef<ForceGraph>(null);
  const d = useAtomValue(distanceAtom);
  const s = useAtomValue(strengthAtom);
  const ch = useAtomValue(chargeAtom);

  const [cliPath, setCliPath] = useAtom(cliPathAtom);

  function onNodeClick(node: any) {
    if (node.label == "root") {
      setCliPath(dotdot(cliPath));
      return;
    }
    if (node.type === "dir") {
      setCliPath(cliPath + "/" + node.label);
    } else if (node.type === "file") {
      // TODO: open file
      console.log("Trying to open file", node.label);
    }
  }
  const gd = useQuery({
    queryKey: ["graphData", cliPath],
    queryFn: async () => {
      return await fetchFiles(cliPath);
    },
  });

  useEffect(() => {
    if (!fgRef.current) return;
    const f = fgRef.current as ForceGraph;
    f.d3Force("link")?.distance(d);
    f.d3Force("link")?.strength(s);
    f.d3Force("charge")?.strength(ch * -1);
    f.zoom(1.2);
    f.d3ReheatSimulation();
  }, [d, s, ch]);
  return (
    <>
      <GraphControls />
      {gd.isLoading && <div>Loading...</div>}
      <ForceGraph2D
        // @ts-expect-error
        ref={fgRef}
        // @ts-expect-error
        graphData={gd.data}
        nodeLabel="label"
        nodeCanvasObject={(node, ctx) => nodePaint(node, node.color, ctx)}
        nodePointerAreaPaint={nodePaint}
        onNodeClick={onNodeClick}
        backgroundColor="oklch(70.4% 0.04 256.788)"
      />
    </>
  );
}

import type ForceGraph from "force-graph";
import ForceGraph2D from "react-force-graph-2d";
import { fetchFiles, FileNode } from "../uitls/fs";

interface FileNodeWithCoords extends FileNode {
  x: number;
  y: number;
}
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { GraphControls } from "./GraphControls";
import { useAtomValue } from "jotai";
import { chargeAtom, distanceAtom, strengthAtom } from "../store/store";

const BASE_RADIUS = 6;

//   () => {
//     ctx.beginPath();
//     ctx.moveTo(x, y - 5);
//     ctx.lineTo(x - 5, y + 5);
//     ctx.lineTo(x + 5, y + 5);
//     ctx.fill();
//   }, // triangle

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
  ctx.beginPath();
  ctx.arc(node.x, node.y, BASE_RADIUS * 1.5, 0, 2 * Math.PI, false);
  ctx.fill();
}

function onNodeClick(node: any) {
  console.log(node);
}

export function FG() {
  const fgRef = useRef<ForceGraph>(null);
  const d = useAtomValue(distanceAtom);
  const s = useAtomValue(strengthAtom);
  const ch = useAtomValue(chargeAtom);
  const [pwd, setPwd] = useState(".");
  const gd = useQuery({
    queryKey: ["graphData", pwd],
    queryFn: async () => {
      return await fetchFiles(pwd);
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

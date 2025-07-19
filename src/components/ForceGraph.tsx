import ForceGraph2D from "react-force-graph-2d";
import { fetchFiles, FileNode } from "../uitls/fs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BASE_RADIUS = 6;

//   () => {
//     ctx.beginPath();
//     ctx.moveTo(x, y - 5);
//     ctx.lineTo(x - 5, y + 5);
//     ctx.lineTo(x + 5, y + 5);
//     ctx.fill();
//   }, // triangle

function nodePaint(
  node: FileNode & { x: number; y: number },
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

export function ForceGraph() {
  const [pwd, setPwd] = useState(".");
  const gd = useQuery({
    queryKey: ["graphData", pwd],
    queryFn: async () => {
      return await fetchFiles(pwd);
    },
  });
  return (
    <>
      {gd.isLoading && <div>Loading...</div>}
      <ForceGraph2D
        // @ts-expect-error
        graphData={gd.data}
        nodeLabel="label"
        // d3VelocityDecay={0.1}
        // d3AlphaMin={0}
        // nodeCanvasObject={(node, ctx) =>
        //   nodePaint(node, getColor(node.id), ctx)
        // }
        nodeCanvasObject={(node, ctx) => nodePaint(node, node.color, ctx)}
        nodePointerAreaPaint={nodePaint}
        onNodeClick={onNodeClick}
        backgroundColor="oklch(70.4% 0.04 256.788)"
        // nodeRelSize={1}
        // nodeVal={10}
        // dagMode={"radialin"}
        // dagLevelDistance={50}
      />
    </>
  );
}

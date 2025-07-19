// import ForceGraph2D from "https://esm.sh/react-force-graph-2d?external=react";
import ForceGraph2D from "react-force-graph-2d";
import { g2 } from "../uitls/test_layout";
import { readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import { fetchFiles } from "../uitls/fs";
import { useQuery } from "@tanstack/react-query";

function nodePaint({ id, x, y, label }, color, ctx) {
  ctx.fillStyle = color;
  if (id === "aboba") {
    ctx.fillRect(x - 6, y - 4, 12, 8);
    ctx.font = "12px Sans-Serif";
    // ctx.textAlign = "top";
    ctx.textBaseline = "bottom";
    ctx.fillText(id, x, y);
  }
  if (label) {
    ctx.font = "12px Sans-Serif";
    // TODO: center text on top of node
    // ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
  }
  // if (id === 0) {
  //   // console.log(label);
  // }
  // ctx.font = "12px Sans-Serif";
  // ctx.textAlign = "center";
  // ctx.textBaseline = "middle";
  // ctx.fillText("Text", x, y);
  ctx.fillRect(x - 6, y - 4, 12, 8);
  // [
  //   () => {
  //     ctx.fillRect(x - 6, y - 4, 12, 8);
  //   }, // rectangle
  //   () => {
  //     ctx.beginPath();
  //     ctx.moveTo(x, y - 5);
  //     ctx.lineTo(x - 5, y + 5);
  //     ctx.lineTo(x + 5, y + 5);
  //     ctx.fill();
  //   }, // triangle
  //   () => {
  //     ctx.beginPath();
  //     ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
  //     ctx.fill();
  //   }, // circle
  //   () => {
  //     ctx.font = "12px Sans-Serif";
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";
  //     ctx.fillText("Text", x, y);
  //   }, // text
  // ][id % 4]();
}

// gen a number persistent color from around the palette
const getColor = (n) =>
  "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0");

// createRoot(document.getElementById("graph")).render();
export function ForceGraph() {
  const gd = useQuery({
    queryKey: ["graphData"],
    queryFn: async () => {
      return await fetchFiles(".");
    },
  });
  return (
    <>
      {gd.isLoading && <div>Loading...</div>}
      <ForceGraph2D
        // graphData={async () => {return await fetchFiles(".")}}
        graphData={gd.data}
        nodeLabel="id"
        nodeCanvasObject={(node, ctx) =>
          nodePaint(node, getColor(node.id), ctx)
        }
        nodePointerAreaPaint={nodePaint}
      />
    </>
  );
}

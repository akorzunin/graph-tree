import React from 'react'
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import { generateGraph } from "./generateGraph";

const elements = generateGraph(10, 10, true);

const layout = cytoscape.layout({
  name: "dagre",
  nodeSep: 100,
  rankSep: 100,
  rankDir: "LR",
});

const stylesheet = [
  {
    selector: "node",
    style: {
      "background-color": "#666",
      label: "data(label)",
    },
  },

  {
    selector: "edge",
    style: {
      width: 4,
      "line-color": "#ccc",
      "target-arrow-color": "#ccc",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
    },
  },
];

const cyRef = React.createRef<cytoscape.Core>();

export const NodeExplorer = () => {
  return (
    <div>
      <CytoscapeComponent
        elements={elements}
        style={{
          width: "800px",
          height: "500px",
          border: "1px solid black",
        }}
        layout={layout}
        stylesheet={stylesheet}
        // cy={(cy) => (cyRef.current = cy)}
      />
    </div>
  );
}

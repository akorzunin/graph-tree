import Cytoscape from "cytoscape";
import COSEBilkent from "cytoscape-cose-bilkent";
import CytoscapeComponent from "react-cytoscapejs";

Cytoscape.use(COSEBilkent);

export const NodeExplorer = () => {
    const elements = [
      { data: { id: "one", label: "Node 1" }, position: { x: 0, y: 0 } },
      { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 0 } },
      {
        data: {
          source: "one",
          target: "two",
          label: "Edge from Node1 to Node2",
        },
      },
    ];

    const layout = { name: "cose-bilkent" };

    return <CytoscapeComponent elements={elements} layout={layout} />;
  }
}

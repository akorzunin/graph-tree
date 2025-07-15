import Cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
// import COSEBilkent from "cytoscape-cose-bilkent";
import d3Force from "cytoscape-d3-force";

// Cytoscape.use(COSEBilkent);
Cytoscape.use(d3Force);

export function MyApp() {
  const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 200, y: 100 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 200 } },
    {
      data: {
        source: "one",
        target: "two",
        label: "Edge from Node1 to Node2",
      },
    },
  ];
  // const layout = { name: "cose-bilkent" };
  const layout = {
    name: "d3-force",
    animate: true,
    fixedAfterDragging: false,
    linkId: function id(d: { id: any; }) {
      return d.id;
    },
    linkDistance: 80,
    manyBodyStrength: -300,
    ready: function () {},
    stop: function () {},
    tick: function (progress: any) {
      console.log("progress - ", progress);
    },
    randomize: false,
    infinite: true,
    // some more options here...
  };

  return (
    <>
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        className="h-[80vh] w-screen"
      />
      <div className="">
        <h1>Hello World</h1>
      </div>
    </>
  );
}

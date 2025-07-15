// import React from "react";
// import FileExplorer from "./FileExplorer";
// import ReactDOM from "react-dom/client";

// function Root() {
//   return (
//     <div className="flex h-screen bg-gray-500 text-white">
//       <FileExplorer />
//     </div>
//   );
// }

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <NodeExplorer />
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { MyApp } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TreeSearchVisualizer from "./components/demo/TreeSearchVisualizer.jsx";
import TreeSearchVisualizerUser from "./components/builder/TreeSearchVisualizerUser.jsx";
import "./App.css";

function App() {
  return <TreeSearchVisualizer></TreeSearchVisualizer>;
  // return <TreeSearchVisualizerUser></TreeSearchVisualizerUser>;
}

export default App;

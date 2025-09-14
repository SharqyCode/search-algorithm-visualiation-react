import { useState } from "react";
import { bfsSteps } from "../../algos/BFS";
import { dfsSteps } from "../../algos/DFS";
import { tree } from "../../algos/tree";

function flatten(node) {
  return [node, ...node.children.flatMap(flatten)];
}

export default function TreeSearchVisualizer() {
  const [mode, setMode] = useState("BFS");

  const nodes = flatten(tree);
  console.log(nodes);

  const steps = mode === "BFS" ? bfsSteps(tree) : dfsSteps(tree);

  const [stepIndex, setStepIndex] = useState(0);
  const { current, frontier, visited } = steps[stepIndex];

  function generateNodes(nodes) {
    let baseX = 600,
      baseY = 0;

    let myNodes = nodes.map((node) => {
      baseY += 50;
      baseX /= 2;
      return (
        <g key={node.id}>
          <circle
            cx={baseX}
            cy={baseY}
            r={20}
            fill={visited.includes(node.id) ? "steelblue" : "lightgray"}
            stroke={frontier.includes(node.id) ? "orange" : "black"}
            strokeDasharray={frontier.includes(node.id) ? "4" : "0"}
            style={{
              filter: current === node.id ? "url(#glow)" : "none",
            }}
          />
          <text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fill="white"
            fontWeight="bold"
          >
            {node.id}
          </text>
        </g>
      );
    });

    return myNodes;
  }

  return (
    <div className="p-4">
      {/* Mode Toggle */}
      <div className="mb-2 flex gap-2">
        <button
          onClick={() => {
            setMode("BFS");
            setStepIndex(0);
          }}
          disabled={mode === "BFS"}
        >
          BFS
        </button>
        <button
          onClick={() => {
            setMode("DFS");
            setStepIndex(0);
          }}
          disabled={mode === "DFS"}
        >
          DFS
        </button>
      </div>

      {/* SVG Tree (same as before) */}
      <svg width={600} height={400} style={{ border: "1px solid #ddd" }}>
        {/* Edges */}
        {nodes.flatMap((node) =>
          node.children.map((child) => (
            <line
              key={node.id + "-" + child.id}
              x1={node.x}
              y1={node.y}
              x2={child.x}
              y2={child.y}
              stroke="black"
            />
          ))
        )}

        {/* Nodes */}
        {/* {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={300}
              cy={50}
              r={20}
              fill={visited.includes(node.id) ? "steelblue" : "lightgray"}
              stroke={frontier.includes(node.id) ? "orange" : "black"}
              strokeDasharray={frontier.includes(node.id) ? "4" : "0"}
              style={{
                filter: current === node.id ? "url(#glow)" : "none",
              }}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontWeight="bold"
            >
              {node.id}
            </text>
          </g>
        ))} */}
        {generateNodes(nodes)}
        {/* Glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Controls */}
      <div className="mt-4 flex gap-2">
        <button onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}>
          Prev
        </button>
        <button
          onClick={() =>
            setStepIndex(Math.min(steps.length - 1, stepIndex + 1))
          }
        >
          Next
        </button>
      </div>
      {/* Step Log Panel */}
      <div className="mt-4 p-3 border rounded bg-gray-50 font-mono text-sm">
        <p>
          <strong>Current:</strong> {current}
        </p>
        <p>
          <strong>Frontier:</strong> [{frontier.join(", ")}]
        </p>
        <p>
          <strong>Visited:</strong> [{visited.join(", ")}]
        </p>
      </div>
    </div>
  );
}

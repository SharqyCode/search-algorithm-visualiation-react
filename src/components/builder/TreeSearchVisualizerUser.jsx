import { useState } from "react";
import { bfsUser } from "../../algos/bfsUser";
import { dfsUser } from "../../algos/dfsUser";
import { userTree as ut } from "../../algos/userTree";
import TreeEditor from "./treeEditor";

function layoutBinaryTree(node, depth = 0, offset = 300, spacing = 300) {
  if (!node) return [];
  const x = offset;
  const y = depth * 100 + 50;

  const nodes = [{ ...node, x, y }];

  if (node.left) {
    nodes.push(
      ...layoutBinaryTree(
        node.left,
        depth + 1,
        offset - spacing / 2,
        spacing / 2
      )
    );
  }
  if (node.right) {
    nodes.push(
      ...layoutBinaryTree(
        node.right,
        depth + 1,
        offset + spacing / 2,
        spacing / 2
      )
    );
  }
  return nodes;
}

export default function TreeSearchVisualizerUser() {
  const [userTree, setUserTree] = useState(ut);
  const [mode, setMode] = useState("BFS");
  const [stepIndex, setStepIndex] = useState(0);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  // Compute traversal steps fresh every time
  const steps = userTree
    ? mode === "BFS"
      ? Array.from(bfsUser(userTree))
      : Array.from(dfsUser(userTree))
    : [];

  const { current, frontier, visited } = steps[stepIndex] || {};

  const nodes = userTree ? layoutBinaryTree(userTree) : [];

  // after you compute `nodes`
  const posById = Object.fromEntries(
    nodes.map((n) => [n.id, { x: n.x, y: n.y }])
  );

  function collectEdges(node, out = []) {
    if (!node) return out;
    if (node.left) out.push([node.id, node.left.id]);
    if (node.right) out.push([node.id, node.right.id]);
    collectEdges(node.left, out);
    collectEdges(node.right, out);
    return out;
  }

  const edges = collectEdges(userTree).filter(
    ([p, c]) => posById[p] && posById[c]
  ); // guard against placeholders

  function handleAddChild(parentId, side) {
    const newId = prompt("Enter node value:");
    if (!newId) return;

    // recursive insert
    function insert(node) {
      if (!node) return;
      if (node.id === parentId) {
        node[side] = { id: newId, left: null, right: null };
      } else {
        insert(node.left);
        insert(node.right);
      }
    }

    const newTree = structuredClone(userTree);
    insert(newTree);
    setUserTree(newTree);
  }

  function isCurrent(id) {
    return stepIndex?.current === id;
  }

  function handleDeleteNode(nodeId) {
    function removeNode(node) {
      if (!node) return null;
      if (node.id === nodeId) {
        return null; // cut off this node
      }
      return {
        ...node,
        left: removeNode(node.left),
        right: removeNode(node.right),
      };
    }

    const newTree = removeNode(userTree);
    setUserTree(newTree);
  }

  return (
    <div className="p-4 flex gap-6">
      {/* Tree Builder Panel */}
      <div className="w-1/3 border-r pr-4">
        <h2 className="font-bold mb-2">Build Your Tree</h2>
        <TreeEditor node={userTree} onChange={setUserTree} />
      </div>

      {/* Visualization Panel */}
      <div className="flex-1">
        <div className="mb-2 flex gap-2">
          <button
            onClick={() => {
              setMode("BFS");
              setStepIndex(0);
            }}
          >
            BFS
          </button>
          <button
            onClick={() => {
              setMode("DFS");
              setStepIndex(0);
            }}
          >
            DFS
          </button>
        </div>

        <svg width={600} height={400} style={{ border: "1px solid #ddd" }}>
          {/* {nodes.flatMap((node) =>
            [node.left, node.right]
              .filter(Boolean)
              .map((child) => (
                <line
                  key={node.id + "-" + child.id}
                  x1={node.x}
                  y1={node.y}
                  x2={child.x}
                  y2={child.y}
                  stroke="black"
                />
              ))
          )} */}
          {/* Edges */}
          {edges.map(([p, c]) => {
            const P = posById[p];
            const C = posById[c];
            return (
              <line
                key={`${p}-${c}`}
                x1={P.x}
                y1={P.y}
                x2={C.x}
                y2={C.y}
                stroke="black"
              />
            );
          })}

          {nodes.map((node) => (
            // <g key={node.id}>
            //   <circle
            //     cx={node.x}
            //     cy={node.y}
            //     r={20}
            //     fill={visited?.includes(node.id) ? "steelblue" : "lightgray"}
            //     stroke={frontier?.includes(node.id) ? "orange" : "black"}
            //     strokeDasharray={frontier?.includes(node.id) ? "4" : "0"}
            //     style={{
            //       filter: current === node.id ? "url(#glow)" : "none",
            //     }}
            //   />
            //   <text
            //     x={node.x}
            //     y={node.y + 5}
            //     textAnchor="middle"
            //     fill="white"
            //     fontWeight="bold"
            //   >
            //     {node.id}
            //   </text>
            // </g>
            <g
              key={node.id}
              // onMouseEnter={() => setHoveredNodeId(node.id)}
              // onMouseLeave={() => setHoveredNodeId(null)}
            >
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={isCurrent(node.id) ? "steelblue" : "lightgray"}
              />
              <text x={node.x} y={node.y + 4} textAnchor="middle">
                {node.id}
              </text>

              {/* Show hover controls */}
              {true && (
                <>
                  {/* Add Left */}
                  {!node.left && (
                    <g
                      onClick={() => handleAddChild(node.id, "left")}
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        cx={node.x - 40}
                        cy={node.y}
                        r={10}
                        fill="green"
                      />
                      <text
                        x={node.x - 40}
                        y={node.y + 4}
                        textAnchor="middle"
                        fill="white"
                        fontWeight="bold"
                      >
                        +
                      </text>
                    </g>
                  )}

                  {/* Add Right */}
                  {!node.right && (
                    <g
                      onClick={() => handleAddChild(node.id, "right")}
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        cx={node.x + 40}
                        cy={node.y}
                        r={10}
                        fill="green"
                      />
                      <text
                        x={node.x + 40}
                        y={node.y + 4}
                        textAnchor="middle"
                        fill="white"
                        fontWeight="bold"
                      >
                        +
                      </text>
                    </g>
                  )}

                  {/* Delete Node */}
                  {node.id !== root.id && ( // prevent deleting the root here
                    <g
                      onClick={() => handleDeleteNode(node.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <circle cx={node.x} cy={node.y - 40} r={10} fill="red" />
                      <text
                        x={node.x}
                        y={node.y - 36}
                        textAnchor="middle"
                        fill="white"
                        fontWeight="bold"
                      >
                        ×
                      </text>
                    </g>
                  )}
                </>
              )}
            </g>
          ))}

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

        {steps.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

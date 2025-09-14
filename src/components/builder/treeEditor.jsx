export default function TreeEditor({ node, onChange }) {
  if (!node) return null;

  const updateNode = (changes) => {
    onChange({ ...node, ...changes });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px" }}>
      <input
        type="text"
        value={node.id}
        onChange={(e) => updateNode({ id: e.target.value })}
        placeholder="Node ID"
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
        {/* Left child */}
        {node.left ? (
          <TreeEditor
            node={node.left}
            onChange={(child) => updateNode({ left: child })}
          />
        ) : (
          <button
            onClick={() =>
              updateNode({ left: { id: "?", left: null, right: null } })
            }
          >
            Add Left
          </button>
        )}

        {/* Right child */}
        {node.right ? (
          <TreeEditor
            node={node.right}
            onChange={(child) => updateNode({ right: child })}
          />
        ) : (
          <button
            onClick={() =>
              updateNode({ right: { id: "?", left: null, right: null } })
            }
          >
            Add Right
          </button>
        )}
      </div>

      <button
        style={{ marginTop: "5px", color: "red" }}
        onClick={() => onChange(null)}
      >
        Delete Node
      </button>
    </div>
  );
}

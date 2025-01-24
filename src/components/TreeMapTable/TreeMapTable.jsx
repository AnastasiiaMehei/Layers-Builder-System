import React from "react";
import Draggable from "react-draggable";

const TreeMapTable = ({ data, onLayerSelect }) => {
  if (!data) {
    return <div>No data available.</div>;
  }

  const createTable = (nodes) => {
    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {nodes
              .filter((node) => node.type === "folder")
              .map((node, index) => (
                <th
                  key={index}
                  colSpan={node.children ? node.children.length : 1}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: node.color || "#ffffff" // Додавання кольору
                  }}
                >
                  {node.title}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {nodes.map((node, index) =>
              node.type === "folder" && node.children ? (
                <td
                  key={index}
                  colSpan={node.children.length}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {createTable(node.children)}
                </td>
              ) : (
                node.type === "file" && (
                  <td
                    key={index}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    <Draggable>
                      <div
                        style={{
                          margin: "4px",
                          padding: "4px",
                          border: "1px solid #ccc",
                          cursor: "move",
                          backgroundColor: node.color || "#ffffff" // Додавання кольору
                        }}
                        onClick={() => onLayerSelect(node)}
                      >
                        {node.title}
                      </div>
                    </Draggable>
                  </td>
                )
              )
            )}
          </tr>
        </tbody>
      </table>
    );
  };

  return <div style={{ overflowX: "auto", height: "100vh" }}>{createTable(data.blocks)}</div>;
};

export default TreeMapTable;

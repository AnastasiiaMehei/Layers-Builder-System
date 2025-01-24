import Draggable from "react-draggable";
import styles from "./TreeMapTable.module.css"; // Імпорт CSS модуля

const TreeMapTable = ({ data }) => {
  const createTable = (nodes) => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {nodes
              .map((node, index) => (
                <th
                  key={index}
                  colSpan={node.children ? node.children.length : 1}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {node.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {nodes.map((node, index) =>
              node.children ? (
                <td
                  key={index}
                  colSpan={node.children.length || 1}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {createTable(node.children)}
                </td>
              ) : (
                <td
                  key={index}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  <Draggable>
                    <div className={styles.draggableBlock}>
                      {node.label}
                    </div>
                  </Draggable>
                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    );
  };

  return <div className={styles.treeMapTableContainer}>{createTable(data.blocks)}</div>;
};

export default TreeMapTable;

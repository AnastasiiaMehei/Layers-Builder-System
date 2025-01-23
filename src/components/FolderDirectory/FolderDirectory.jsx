import { useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";

const initialData = [
  {
    key: "2.1",
    title: "Business Process Framework",
    children: [
      {
        key: "2.1.1",
        title: "Strategy to Readiness",
        children: [
          {
            key: "2.1.1.1",
            title: "Strategy Management",
            children: [
              {
                key: "3.1.1",
                title: "Market and Sales Domain",
                children: [
                  { key: "4.1", title: "Processes" },
                  { key: "4.2", title: "Processes" },
                  { key: "4.3", title: "Processes" },
                  { key: "4.4", title: "Processes" },
                  { key: "4.5", title: "Processes" },
                ],
              },
              { key: "3.1.2", title: "Customer Domain" },
              { key: "3.1.3", title: "Product Domain" },
            ],
          },
          { key: "2.1.2", title: "Capability Management" },
          { key: "2.1.3", title: "Business Value Development" },
          { key: "2.1.4", title: "Operations Readiness & Support" },
        ],
      },
      {
        key: "2.2",
        title: "Operations",
        children: [
          { key: "2.2.1", title: "Fulfillment" },
          { key: "2.2.2", title: "Assurance" },
          { key: "2.2.3", title: "Billing" },
        ],
      },
    ],
  },
];

const FolderDirectory = ({ onLayerSelect }) => {
  const [treeData, setTreeData] = useState(initialData);

  const onSelect = (selectedKeys, info) => {
    const selectedNode = info.node;
    onLayerSelect(selectedNode);
  };

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ddd" }}>
      <Tree showLine defaultExpandAll treeData={treeData} onSelect={onSelect} />
    </div>
  );
};

export default FolderDirectory;

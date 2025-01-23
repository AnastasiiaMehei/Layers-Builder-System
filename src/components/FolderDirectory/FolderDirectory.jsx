import { useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";

const initialData = [
  {
    key: "0-0",
    title: "Business Process Framework",
    children: [
      {
        key: "0-0-0",
        title: "Strategy to Readiness",
        children: [
          {
            key: "0-0-0-0",
            title: "Strategy Management",
            children: [
              {
                key: "0-0-0-0-0",
                title: "Market and Sales Domain",
                children: [
                  { key: "0-0-0-0-0-0", title: "Sales Strategy Management" },
                  { key: "0-0-0-0-0-1", title: "Market Analysis" },
                ],
              },
              {
                key: "0-0-0-0-1",
                title: "Customer Domain",
                children: [
                  { key: "0-0-0-0-1-0", title: "Customer Strategy" },
                ],
              },
              {
                key: "0-0-0-0-2",
                title: "Product Domain",
                children: [
                  { key: "0-0-0-0-2-0", title: "Product Development" },
                ],
              },
            ],
          },
          {
            key: "0-0-0-1",
            title: "Capability Management",
            children: [
              {
                key: "0-0-0-1-0",
                title: "Organizational Design",
                children: [
                  { key: "0-0-0-1-0-0", title: "Structure Development" },
                ],
              },
            ],
          },
          {
            key: "0-0-0-2",
            title: "Business Value Development",
            children: [
              {
                key: "0-0-0-2-0",
                title: "Value Proposition",
                children: [
                  { key: "0-0-0-2-0-0", title: "Customer Value" },
                ],
              },
            ],
          },
          {
            key: "0-0-0-3",
            title: "Operations Readiness & Support",
            children: [
              {
                key: "0-0-0-3-0",
                title: "Process Optimization",
                children: [
                  { key: "0-0-0-3-0-0", title: "Workflow Improvement" },
                ],
              },
            ],
          },
        ],
      },
      {
        key: "0-0-1",
        title: "Operations",
        children: [
          {
            key: "0-0-1-0",
            title: "Fulfillment",
            children: [
              { key: "0-0-1-0-0", title: "Order Fulfillment" },
            ],
          },
          {
            key: "0-0-1-1",
            title: "Assurance",
            children: [
              { key: "0-0-1-1-0", title: "Quality Assurance" },
            ],
          },
          {
            key: "0-0-1-2",
            title: "Billing",
            children: [
              { key: "0-0-1-2-0", title: "Invoice Processing" },
            ],
          },
        ],
      },
    ],
  },
];
const FolderDirectory = ({ onLayerSelect, selectedLayer }) => {
  const [treeData, setTreeData] = useState(initialData);

  const onSelect = (selectedKeys, info) => {
    const selectedNode = info.node;
    onLayerSelect(selectedNode);
  };

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ddd" }}>
      <Tree
        showLine
        defaultExpandAll
        treeData={treeData}
        onSelect={onSelect}
        selectedKeys={selectedLayer ? [selectedLayer.key] : []}
      />
    </div>
  );
};

export default FolderDirectory;
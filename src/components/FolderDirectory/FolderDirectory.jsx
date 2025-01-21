import  { useState } from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';

const initialData = [
  {
    key: '0-0',
    title: 'Business Process Framework',
    children: [
      {
        key: '0-0-0',
        title: 'Strategy to Readiness',
        children: [
          {
            key: '0-0-0-0',
            title: 'Strategy Management',
            children: [
              {
                key: '0-0-0-0-0',
                title: 'Market and Sales Domain',
                children: [
                  { key: '0-0-0-0-0-0', title: 'Processes' },
                  { key: '0-0-0-0-0-1', title: 'Processes' },
                  { key: '0-0-0-0-0-2', title: 'Processes' },
                  { key: '0-0-0-0-0-3', title: 'Processes' },
                  { key: '0-0-0-0-0-4', title: 'Processes' },
                ],
              },
              { key: '0-0-0-0-1', title: 'Customer Domain' },
              { key: '0-0-0-0-2', title: 'Product Domain' },
            ],
          },
          { key: '0-0-0-1', title: 'Capability Management' },
          { key: '0-0-0-2', title: 'Business Value Development' },
          { key: '0-0-0-3', title: 'Operations Readiness & Support' },
        ],
      },
      {
        key: '0-0-1',
        title: 'Operations',
        children: [
          { key: '0-0-1-0', title: 'Fulfillment' },
          { key: '0-0-1-1', title: 'Assurance' },
          { key: '0-0-1-2', title: 'Billing' },
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
    <div style={{ width: '250px', borderRight: '1px solid #ddd' }}>
      <Tree
        showLine
        defaultExpandAll
        treeData={treeData}
        onSelect={onSelect}
      />
    </div>
  );
};

export default FolderDirectory;

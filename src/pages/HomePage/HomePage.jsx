import { useState } from 'react';
import css from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/diagrams/selectors';
import FolderDirectory from '../../components/FolderDirectory/FolderDirectory';
import Block from '../../components/Block/Block';
import TreeMapTable from '../../components/TreeMapTable/TreeMapTable';

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
const HomePage = () => {
  const [treeData, setTreeData] = useState(initialData);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const loading = useSelector(selectLoading);

  const handleNodeSelect = (node) => {
    setSelectedLayer(node);
  };

  const handleTreeChange = (newData) => {
    setTreeData(newData);
  };

  return (
    <div className={css.container}>
      <div className={css.folder}>
        <FolderDirectory
          treeData={treeData}
          onLayerSelect={handleNodeSelect}
          onTreeChange={handleTreeChange}
        />
      </div>
      <div className={css.customizer}>
        {selectedLayer && <Block node={selectedLayer} />}
      </div>
      <div className={css.treemap}>
        <TreeMapTable
          selectedLayer={selectedLayer}
          onLayerSelect={handleNodeSelect}
        />
      </div>
    </div>
  );
};

export default HomePage;

import { useState } from 'react';
import css from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/diagrams/selectors';
import FolderDirectory from '../../components/FolderDirectory/FolderDirectory';
import Block from '../../components/Block/Block';
import TreeMapTable from '../../components/TreeMapTable/TreeMapTable';

const initialData = [
  {
    key: '1',
    title: 'Business Process Framework',
    children: [
      {
        key: '2.1',
        title: 'Strategy to Readiness',
        children: [
          {
            key: '2.1.1',
            title: 'Strategy Management',
            children: [
              {
                key: '3.1.1',
                title: 'Market and Sales Domain',
                children: [
                  { key: '4.1', title: 'Processes' },
                  { key: '4.2', title: 'Processes' },

                ],
              },
              { key: '3.1.2', title: 'Customer Domain' },
              { key: '3.1.3', title: 'Product Domain' },
            ],
          },
          { key: '2.1.2', title: 'Capability Management' },
          { key: '2.1.3', title: 'Business Value Development' },
          { key: '2.1.4', title: 'Operations Readiness & Support' },
        ],
      },
      {
        key: '2.2',
        title: 'Operations',
        children: [
          {
            key: '3.2.1',
            title: 'Operations',
            children: [
              { key: '3.2.1.1', title: 'Fulfillment' },
              { key: '3.2.1.2', title: 'Assurance' },
              { key: '3.2.1.3', title: 'Billing' },
            ],
          },
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

import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';

const FolderDirectory = ({ treeData, onNodeSelect, onTreeChange }) => {
  const onSelect = (selectedKeys, info) => {
    const selectedNode = info.node;
    onNodeSelect(selectedNode);
  };

  const onDragEnter = (info) => {
    console.log('onDragEnter', info);
  };

  const onDrop = (info) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = [...treeData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (dropPosition === -1) {
      data.unshift(dragObj);
    } else {
      loop(data, dropKey, (item, index, arr) => {
        arr.splice(index + dropPosition, 0, dragObj);
      });
    }

    onTreeChange(data);
  };

  const handleAddNode = (key) => {
    const newNode = { key: `new-node-${Date.now()}`, title: 'New Node', children: [] };

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = [...treeData];
    loop(data, key, (item) => {
      item.children = item.children || [];
      item.children.push(newNode);
    });

    onTreeChange(data);
  };

  const handleDeleteNode = (key) => {
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = [...treeData];
    loop(data, key, (item, index, arr) => {
      arr.splice(index, 1);
    });

    onTreeChange(data);
  };

  const renderTreeNodes = (data) =>
    data.map((item) => (
      <Tree.TreeNode key={item.key} title={(
        <span>
          {item.title}
          <button onClick={() => handleAddNode(item.key)}>+</button>
          <button onClick={() => handleDeleteNode(item.key)}>Delete</button>
        </span>
      )}>
        {item.children ? renderTreeNodes(item.children) : null}
      </Tree.TreeNode>
    ));

  return (
    <div style={{ width: '250px', borderRight: '1px solid #ddd' }}>
      <button onClick={() => handleAddNode(null)}>Add Root Node</button>
      <Tree
        showLine
        defaultExpandAll
        treeData={treeData}
        onSelect={onSelect}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </div>
  );
};

export default FolderDirectory;

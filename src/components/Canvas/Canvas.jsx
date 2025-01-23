import { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 0 } },
];

const initialEdges = [];

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onAddBlock = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `Block ${nodes.length + 1}` },
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  const onDeleteBlock = useCallback((id) => {
    setNodes((nds) => nds.filter(node => node.id !== id));
  }, []);

  const onChangeBlock = useCallback((id, newData) => {
    setNodes((nds) =>
      nds.map(node => node.id === id ? { ...node, data: newData } : node)
    );
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <button onClick={onAddBlock}>Add Block</button>
      
      <ReactFlowProvider>
        <div style={{ height: '90%', width: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Canvas;
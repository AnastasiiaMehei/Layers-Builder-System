import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

const DiagramWrapper = ({ nodeDataArray, linkDataArray, onNodeDataChange }) => {
  const initDiagram = () => {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true,
      layout: $(go.GridLayout),
    });

    diagram.nodeTemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'Rectangle',
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8 },
          new go.Binding('text', 'text'))
      );

    diagram.groupTemplate =
      $(go.Group, 'Vertical',
        {
          layout: $(go.GridLayout),
          isSubGraphExpanded: true,
          ungroupable: true,
        },
        $(go.TextBlock,
          { font: 'bold 19px sans-serif', isMultiline: false, editable: true },
          new go.Binding('text', 'text')),
        $(go.Panel, 'Auto',
          { name: 'BODY' },
          $(go.Shape, 'Rectangle', { fill: 'rgba(128,128,128,0.2)', stroke: 'gray', strokeWidth: 2 }),
          $(go.Placeholder, { padding: 5 })
        )
      );

    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    diagram.addDiagramListener('ExternalObjectsDropped', (e) => {
      const newNodes = e.subject.toArray().map(part => part.data);
      onNodeDataChange([...nodeDataArray, ...newNodes]);
    });

    return diagram;
  };

  return (
    <ReactDiagram
      initDiagram={initDiagram}
      divClassName="diagram-component"
      style={{ width: '100%', height: '600px' }}
    />
  );
};

export default DiagramWrapper;

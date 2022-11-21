import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import type { Connection } from "reactflow";
// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import BotSender from "./nodes/BotSender/BotSender";

const initialNodes = [
  { id: "1", position: { x: 100, y: 10 }, data: { label: "1" } },
  {
    id: "2",
    position: { x: 200, y: 100 },
    data: { label: "2" },
    type: "bot-sender",
    // dragHandle: ".custom-drag-handle",
  },

  // { id: "3", position: { x: 100, y: 300 }, data: { label: "2" } },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
];

const nodeTypes = {
  "bot-sender": BotSender,
};

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}

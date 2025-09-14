import { rootNode, treeNode } from "./treeNode";
export interface tree {
  id: string;
  nodes: object;
  depth: number;
  targetNode: treeNode;
}

export const defaultTree: tree = {
  id: "a01",
  nodes: {
    id: rootNode.id,
    children: rootNode.children,
  },
};

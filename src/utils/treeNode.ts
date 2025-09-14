export interface treeNode {
  id: string;
  level: number;
  children: treeNode[];
}

export const rootNode: treeNode = {
  id: "A",
  level: 0,
  children: [],
};

function nextLetter(letter) {
    return String.fromCharCode(letter.charCodeAt(0) + 1);
}

function insertNode(tree, parentId, newNode, side) {
    if (!tree) return null;

    if (tree.id === parentId) {
        if (side === "left" && !tree.left) {
            return { ...tree, left: newNode };
        }
        if (side === "right" && !tree.right) {
            return { ...tree, right: newNode };
        }
        // If side is already occupied, return unchanged
        return tree;
    }

    return {
        ...tree,
        left: insertNode(tree.left, parentId, newNode, side),
        right: insertNode(tree.right, parentId, newNode, side),
    };
}

function flatten(tree, depth = 0, x = 0, positions = {}, result = []) {
    if (!tree) return result;

    const pos = positions[tree.id] || { x, y: depth * 100 };
    result.push({ ...tree, ...pos });

    flatten(tree.left, depth + 1, x - 100, positions, result);
    flatten(tree.right, depth + 1, x + 100, positions, result);

    return result;
}

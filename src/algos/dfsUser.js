export function* dfsUser(root) {
    if (!root) return;

    const stack = [root];
    const visited = new Set();

    while (stack.length > 0) {
        const current = stack.pop();

        if (!visited.has(current.id)) {
            visited.add(current.id);

            yield {
                current: current.id,
                frontier: stack.map(n => n.id),
                visited: Array.from(visited),
            };

            // push right first → left gets explored first
            if (current.right) stack.push(current.right);
            if (current.left) stack.push(current.left);
        }
    }
}

export function* bfsUser(root) {
    if (!root) return;

    const queue = [root];
    const visited = new Set();

    while (queue.length > 0) {
        const current = queue.shift();

        if (!visited.has(current.id)) {
            visited.add(current.id);

            yield {
                current: current.id,
                frontier: queue.map(n => n.id),
                visited: Array.from(visited),
            };

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }
}

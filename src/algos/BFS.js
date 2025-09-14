// bfsSteps.js
export function bfsSteps(root) {
    const steps = [];
    const queue = [root];
    const visited = new Set();

    while (queue.length > 0) {
        const current = queue[0];

        // Step 1: before expanding
        steps.push({
            current: current.id,
            frontier: queue.map(n => n.id),
            visited: Array.from(visited)
        });

        // Expand
        queue.shift();
        visited.add(current.id);
        queue.push(...current.children);

        // Step 2: after expanding
        steps.push({
            current: current.id,
            frontier: queue.map(n => n.id),
            visited: Array.from(visited)
        });
    }

    return steps;
}

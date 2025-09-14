// dfsSteps.js
export function dfsSteps(root) {
    const steps = [];
    const stack = [root];
    const visited = new Set();

    while (stack.length > 0) {
        const current = stack[stack.length - 1]; // peek top of stack

        // Step 1: before expanding
        steps.push({
            current: current.id,
            frontier: stack.map(n => n.id),
            visited: Array.from(visited),
        });

        // Expand
        stack.pop();
        visited.add(current.id);

        // Push children in reverse order so leftmost child is processed first
        for (let i = current.children.length - 1; i >= 0; i--) {
            stack.push(current.children[i]);
        }

        // Step 2: after expanding
        steps.push({
            current: current.id,
            frontier: stack.map(n => n.id),
            visited: Array.from(visited),
        });
    }
    console.log(steps);

    return steps;
}

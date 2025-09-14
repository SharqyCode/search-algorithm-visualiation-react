## Search function

    - takes tree object as parameter
    - takes root node as parameter
    - returns (steps) array showing iteration at each node

## Node object

    - id/label : string
    - level (0 : root, 1, 2, .., n) : number
    - children : Node[]

## Tree (user-built)

    - rootId : string
    - Nodes : Node[]
    - depth : number
    - targetNode? : Node

## Edit mode

    - Only build, no search
    - Cutomize tree style
    - Add and delete buttons on each node (except root)
    - Select target node or traverse whole tree
    - Save button -> returns Tree

## Play/Search mode

    - Play/Pause buttons -> automatically traverse tree with delay
      (e.g. 1 Node/sec)
    - Next/Prev buttons -> traverse one step at a time
    - Save currentStep in state
    - Show current step data

## Hierarchy panel

    - Display tree structure
    - Allow user to delete/add nodes
    - Changes reflect in tree
    - Clicking activates Edit mode

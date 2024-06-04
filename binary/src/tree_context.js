import React from 'react';
import Tree from './components/tree.component';
import Node from './components/node.component';
const TreeContext = React.createContext({
    root_idx:0,
    curr_node_idx:0,
    traversal_type:0
});

export default TreeContext;
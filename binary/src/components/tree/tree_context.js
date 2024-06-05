import React from 'react';
import Tree from './tree.component';
import Node from './subtree/node/node.component';


const TreeContext = React.createContext({
    rootidx:0,
    curr_node_idx:0,
    traversal_type:0
});

export default TreeContext;
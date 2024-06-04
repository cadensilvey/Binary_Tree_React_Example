import NodeModel from "./components/tree.component";

class TreeModel {
    constructor() {
        this.root = null;
    }

    // function to insert a key-value pair into the bin tree
    insert(key, value ) {
        // validate the the key is a number , else do nothing 
        if (!Number.isInteger(key)) return;
        

        // new node using node model of the key and the value 
        const newNode = NodeModel(key, value);

        // if the tree is empty, set the new node at the root node
        if (this.root === null) {
            this.root = newNode;
        }
        // otherise, find the correct positon to insert the new node 
        else this.insertNode(this.root, newNode);
    }

    // function to insert a new node into the tree
    insertNode(node, newNode){
        // if the new nodes key is less then the current noes key, go to the left subtree
        if(newNode.key < node.key){
            // if the left child is null, insert a new node here
            if(node.left === null) node.left = newNode;
            // otherwise, continure searching in the left subtree
            else this.insertNode(node.left, newNode);

            // if the new nodes key is equal to the current nodes key update the nodes value 
        } else if (newNode.key === node.key){
            node.value = newNode.value;
        } else {
            // if the new nodes key is greater then the current nodes key go to the left subtree
            if (node.right === null ) node.right = newNode;
            // otherwise continue searching in the right subtree
            else this.insertNode(node.right, newNode);
        }
    }

    // functino to remove a node with a given key from the bin tree
    remove(key){
        // validate that the key is a number
        if (!Number.isInteger(key)) return;

        // remove, and update the root of the tree
        this.root = this.removeNode(this.root, key);
    }

    // function to remove a node with a given key from the tree
    removeNode(node, key){

        // this is our base case. if the node is null, then return null
        if(node === null) return null;
        
        // if the key is less then the current nodes key, recurse on the left subtree
        else if (key < node.key ) {
            node.left = this.removeNode(node.left, key);
            return node;
        }

        // if the key is greater then the current nodes key, recurse on the right subtree
        else if ( key > node.key) {
            node.right = this.removeNode(node.left, key);
            return node;
        }

        // if the key matches the current nodes key...
        else {

            // Case 1: Node with no children 
            if(node.left === null && node.right === null) {
                node = null; // remove the node by setting it to null and return 
                return node;
            }

            // Case 2 : Node with only left children 
            if ( node.left === null ) {
                node = node.right;
                return node;
            } 
            
            // Case 3: Node with only right children
            else if (node.right === null ) {
                node=node.left;
                return node;
            }

            // Case 4: Node with 2 Chilren 
            const aux = this.findMinimumNode(node.right);
            node.key = aux.key;

            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }

    // perform inorder traversal of the binary search tree
    inorder(node, fn){
        if(node !== null){
            this.inorder(node.left, fn);
            fn(node);
            this.inorder(node.right, fn);
        }
    }

    // perform preorder traversal of the binary search tree
    preorder(node, fn) {
        if(node !== null){
            fn(node);
            this.preorder(node.left, fn);
            this.preorder(node.right, fn);
        }
    }

    // perform postorder traversal of the binary search tree
    postorder(node, fn) {
        if(node !== null){
            this.postorder(node.left, fn);
            this.postorder(node.right, fn);
            fn(node);
        }
    }

    // perform breadth first traversal of the binary tree
    breadthFirst(node, fn){
        // create a queue and initialize with root node
        const queue = [node];

        // process nodes in the queue until its empty 
        while (queue.length > 0){

            // check the left and right children of the first node in the queue
            if(queue[0].left != null) queue.push(queue[0].left);
            if(queue[0].right != null) queue.push(queue[0].right);

            // perform the specified on the first node in the queue 
            fn(queue.shift());

        }
    }

    // perform depth first traversal of the binary tree
    depthFirst(node, fn){

        // create a stack and init it with the root node
        const stack = [node];

        // process nodes in the stack until its empty 
        while(stack.length > 0 ){

            // peek at the top node of the stack using -1
            const x = stack[stack.length -1];

            // perform a pop at the top node of the stack 
            fn(stack.pop());

            // push the right child onto the stack 
            if(x.left != null) stack.push(x.left);

            // push the left child onto the stack 
            if(x.right != null) stack.push(x.right);
        }
    }

    // find the minimum value node in a given tree
    findMinimumNode(node){
        // if the left child of the current node is null, then the current node is the minimum node
        if (node.left === null) return node;

        // if the left child is not null, then keep going until the null value is found 
        else return this.findMinimumNode(node.left);
    }

    // search for a specific key in a binary search tree
    findingKey(node, fn, key){

        // base: if the node is null, then the key is not found
        if (node === null) {
            return false;
        }

        fn(node);

        // check if the current nodes key matches the target key 
        if(node.key === key ) {
            return true; // the key is found 
        }

        // if the target key is less or equal to the current nodes key search left and findKey again 
        else if (node.key >= key) {
            return this.findingKey(node.left, fn, key);
        }

        // then the key would be greater and we search to the right 
        else {
            return this.findingKey(node.right, fn, key);
        }
    }
}

export default TreeModel;
// class
class NodeModel {
    // special method that is called when a new instance of the class is created
    // "key" and "value" are params passed to the constructor when creating a new instance of NodeModel 
    constructor(key, value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.key = key;
    }

    // return the left child node of the current node
    getLeftNode() {
        return this.left
    }

    // return the right child node of the current node
    getRightNode() {
        return this.right
    }

    // sets both left and right nodes to null essentially freeing them
    free(){
        this.left = null;
        this.right = null;
    }
}

export default NodeModel;
import Node from "./node.js";

export default class Tree {
    constructor(array){
        this.array = this.removeDuplicates(this.sort(array));
        this.root = this.buildTree(this.array);
    }

    /*
    *   Sort(array): Sorts the array.
    */

    sort(array){
        return array.sort((a,b) => a - b);

    }

    /*
    *   removeDuplicates(array): Removes any duplicates in the array.
    */

    removeDuplicates(array){
        return array.filter((element,index) => {
            if(index-1 >= 0){
                return element != array[index-1];
            }
            return true;
        })
    }

    /*
    *   buildTree(array): builds the balanced binary search tree with the given array.
    */

    buildTree(array){

        const start = 0;
        const end = array.length-1;

        if(start > end) return null;

        const mid = parseInt((start + end) / 2);

        const treeNode = new Node(array[mid]);
        
        treeNode.left = this.buildTree(array.slice(start, mid));
        treeNode.right = this.buildTree(array.slice(mid+1, end+1));
        
        return treeNode;
    }

    /*
    *   prettyPrint(node, prefix="", isLeft = true): Prints the binary search tree to the console.
    */

    prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
    
    
    /*
    *   insert(value, root = this.root): inserts the given value to the binary search tree.
    */  

    insert(value, root = this.root){

        if(root.data > value){
            if(root.left == null) {
                return root.left = new Node(value);
            }            

            this.insert(value, root.left);
        }
        if(root.data < value){
            if(root.right == null) {
                return root.right = new Node(value);
            }
            
            this.insert(value, root.right);
        }

        if(root.data == value){
            return null;
        }
    }

    /*
    *   deleteItem(value, node= this.root): removes the given value if it's in the binary search tree.
    */

    deleteItem(value, node=this.root, lastNode=null){

        if(node.data == value){

            if(node.left == null && node.right == null){
                return lastNode.data > node.data ? lastNode.left = null : lastNode.right = null;
            }
            else if(node.left != null && node.right != null){
                //Look for the next biggest node and remove it.
                let mostLeftNode = this.findMostLeftNode(node.right,node.right);
                
                //Assign value left and right nodes to mostLeftNode.
                mostLeftNode.left = node.left;
                if(node.right != mostLeftNode){
                    mostLeftNode.right = node.right;
                }
                
                if(lastNode == null){
                    return this.node = mostLeftNode;
                }

                return lastNode.data > mostLeftNode.data ? lastNode.left = mostLeftNode : lastNode.right = mostLeftNode;
            }
            else {
                if(node.left != null){
                    return lastNode.data > node.data ? lastNode.left = node.left
                                                     : lastNode.right = node.left;
                }
                else if(node.right != null){
                    return lastNode.data > node.data ? lastNode.left = node.right
                                                     : lastNode.right = node.right;
                }
            }
        }
        

        if(node.data > value){
            this.deleteItem(value, node.left, node);
        }
        else {
            this.deleteItem(value, node.right, node);
        }
        


        return;
    }
    /*
    *   findMostLeftNode(value, lastnode): Helps deleteItem function delete a node with left and right nodes attached to it.
    */
    findMostLeftNode(value, lastNode){
        
        let mostLeftNode;

        if(value.left == null){
            lastNode.left = null;
            return value;
        }

        if(value.left != null){
            mostLeftNode = this.findMostLeftNode(value.left,value);
        }


        //If mostLeftNode has children to it's right
        //append it to right node of given value.
        if(mostLeftNode.left == null && mostLeftNode.right != null){
            lastNode.left = mostLeftNode.right;
        }

        return mostLeftNode;
    }

    /*
    *   find(value,node): Finds the specify value if it's in the BST.
    */
    find(value, node=this.root){
        let valueFound;

        if(node == null){
            return null;
        }

        if(node.data == value){
            return node;
        }

        if(node.data > value){
            valueFound = this.find(value, node.left);
        }
        else {
            valueFound = this.find(value, node.right);
        }

        return valueFound;
    }

    /*
    *   levelOrder(callback): accepts a callback function as its parameter.
    *                         Traverses the tree in breadth-first level order and
    *                         call the callback on each node as it traverses.
    */

    levelOrder(callback, queue = [this.root]){
        
        //base case
        if(callback == null){
            throw new Error('Parameter needs to be a function!');
        }
        if(queue[0] == null){
            return;
        }

        //reference to first item in queue.
        let node = queue[0];

        /*
        *   levelOrder takes a value, calls a function on it.
        *   after its done calling a function on the value, add its children to the end of the array.
        *   then remove it from queue.
        */

        //callback on first item in queue.
        callback(queue[0]);

        //add the left right of current node.
        if(node.left != null){
            queue.push(node.left);
        }
        if(node.right != null){
            queue.push(node.right);
        }

        //remove the current node
        queue.shift();

        //continue with rest of items in queue.
        this.levelOrder(callback, queue);
    }

    /*
    *   inOrder(callback): traverses the tree in-order and calls the function for each value.
    */
    inOrder(callback, node = this.root){
        if(callback == null){
            throw new Error('Parameter needs to be a function!');
        }
        if(node == null){
            return;
        }

        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }
    /*
    *   postOrder(callback): traverses the tree post-order and calls the function for each value.
    */
    postOrder(callback, node = this.root){
        if(callback == null){
            throw new Error('Parameter needs to be a function!');
        }
        if(node == null){
            return;
        }

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }
    /*
    *   preOrder(callback): traverses the tree pre-order and calls the function for each value.
    */
    preOrder(callback, node=this.root){
        if(callback == null){
            throw new Error('Parameter needs to be a function!');
        }
        if(node == null){
            return;
        }

        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    /*
    *   height(node): Finds the height of the given node.
    */

    height(node){
        if(node == null){
            return 0;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    /*
    *   depth(node): Finds the depth of the given node.
    */

    depth(node, currentNode=this.root){
        
        if(currentNode == node){
            return 0;
        }

        if(currentNode.data > node.data){
            return this.depth(node, currentNode.left) + 1;
        }
        else{
            return this.depth(node, currentNode.right) + 1;
        }

    }

    /*
    *   isBalanced(): Checks if the Balanced Binary search tree is balanced.
    */

    isBalanced(node=this.root){
        /*
        *   the node to the left and right should differ by a height difference of 1.
        *   I will check each node to see if the heights of the left and right node differ by 1.
        * 
        */

        if(node == null){
            return 0;
        }

        const leftHeight = this.isBalanced(node.left);
        const rightHeight = this.isBalanced(node.right);

        if(leftHeight == -1){
            return -1;
        }
        if(rightHeight == -1){
            return -1;
        }

        if(Math.abs(leftHeight - rightHeight) > 1){
            return -1;
        }

        return Math.max(leftHeight, rightHeight) + 1;
        
    }

    /*
    *   reBalance(): re-balance the binary search tree.
    */

    reBalance(){
        const Array = [];

        this.inOrder((node) => {
            Array.push(node.data);
        })

        this.root = this.buildTree(Array);
    }
}
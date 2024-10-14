import Node from "./node.js";

export default class Tree {
    constructor(array){
        this.array = this.removeDuplicates(this.sort(array));
        this.root = this.buildTree(this.array);
    }

    /*
    *   Sort(array): Sorts the array.
    *   
    */
    sort(array){
        return array.sort((a,b) => a - b);

    }

    /*
    *   removeDuplicates(array): Removes any duplicates in the array.
    *
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
    *
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
    *
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
     
}
import Tree from "./BST.js";

const Array = [];

for(let i=0; i < 101; i++){
    Array.push(parseInt(Math.random() * 101));
}



const binarySearchTree = new Tree(Array);

console.log(binarySearchTree.isBalanced());

function printLevelOrder(node){
    console.log(`${node.data} read level order`);
}

function printInOrder(node){
    console.log(`${node.data} read in-order`);
}

function printPreOrder(node){
    console.log(`${node.data} read  pre-order`);
}

function printPostOrder(node){
    console.log(`${node.data} read post-order`);
}

binarySearchTree.insert(43);
binarySearchTree.insert(53);
binarySearchTree.insert(34);
binarySearchTree.insert(42);
binarySearchTree.insert(51);
binarySearchTree.insert(31);
binarySearchTree.insert(44);
binarySearchTree.insert(52);
binarySearchTree.insert(32);


binarySearchTree.levelOrder(printLevelOrder);
binarySearchTree.preOrder(printPreOrder);
binarySearchTree.postOrder(printPostOrder);
binarySearchTree.inOrder(printInOrder);

console.log(binarySearchTree.isBalanced());

binarySearchTree.prettyPrint(binarySearchTree.root);

binarySearchTree.reBalance();
console.log(binarySearchTree.isBalanced());

binarySearchTree.levelOrder(printLevelOrder);
binarySearchTree.preOrder(printPreOrder);
binarySearchTree.postOrder(printPostOrder);
binarySearchTree.inOrder(printInOrder);
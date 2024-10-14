import Tree from "./BST.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const BST = new Tree(array);

BST.prettyPrint(BST.root);
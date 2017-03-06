var matrixFun = require("./matrixOperation.js");

/*
Parameters:
matrix -- a matrix to be printed that expressed by a two-dimensional array,
shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];
*/
function printMatrix(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            process.stdout.write(matrix[i][j] + ' ');
        }
        console.log();
    }
};

var a = [
    [0,0,3],
    [0,2,0],
    [0,0,0]
];

var b = [
    [1,3,4],
    [5,6,7],
    [1,3,4]
];

var c = [
    [2,3,7],
    [5,6,4]
];

var d = [
    [1,1,4,5],
    [0,6,8,7],
    [0,0,3,9],
    [0,0,2,1]
];

var e = [
    [1,2,3],
    [4,5,6],
    [2,3,4],
    [5,6,7]
];
console.log("矩阵a：");
printMatrix(a);

console.log("矩阵b：");
printMatrix(b);

console.log("矩阵c：");
printMatrix(c);

console.log("矩阵d：");
printMatrix(d);

console.log("矩阵e：");
printMatrix(e);

console.log("矩阵a" + "+" + "矩阵b：");
printMatrix(matrixFun.matrixAddition(a,b));

console.log("矩阵a" +  "*" + "矩阵b：");
printMatrix(matrixFun.matrixMultiplication(c,b));

console.log("矩阵b的伴随矩阵:");
printMatrix(matrixFun.matrixAdjoint(b));

console.log("矩阵a的转置矩阵:");
printMatrix(matrixFun.matrixTranspose(a));

console.log("矩阵b的逆矩阵:");
printMatrix(matrixFun.matrixInverse(b));

console.log("7阶单位矩阵:");
printMatrix(matrixFun.matrixIdentity(7));

console.log("矩阵b的余子式:");
printMatrix(matrixFun.matrixCofactor(b,1,3));

console.log("矩阵b的行列式:");
console.log(matrixFun.matrixDeterminant(b,3));

console.log("矩阵a的秩:");
console.log(matrixFun.matrixRank(a));

'use strict'

var m = require('./matrix');

var data1 = [[3]];

var data2 = [[0,0,0],
             [0,0,0],
             [0,0,0]]; 

var data3 = [[1,2,3,4],
             [2,3,-3,-4],
             [3,0,-9,4],
             [1,-21,3,7]];

var data4 = [[1,3,1],
             [1,0,0]];

var data5 = [[1,2],
             [3,4],
             [5,6]];

var data6 = [[3,-3,1],
             [1,-1,2],
             [-2,2,-4]];

var data7 = [[1,2,3],
             [4,5,6],
             [7,8,9]];

var data8 = [[1,2],
             [4,5]];

//display all matrices

process.stdout.write('矩阵1：');
showMatrix(data1);

process.stdout.write('矩阵2：');
showMatrix(data2);

process.stdout.write('矩阵3：');
showMatrix(data3);

process.stdout.write('矩阵4：');
showMatrix(data4);

process.stdout.write('矩阵5：');
showMatrix(data5);

process.stdout.write('矩阵6：');
showMatrix(data6);

process.stdout.write('矩阵7：');
showMatrix(data7);

process.stdout.write('矩阵8：');
showMatrix(data8);

//add

process.stdout.write('矩阵6 + 矩阵7：');
var result = m.addMatrix(data6,data7);
showMatrix(result);

//multiply

process.stdout.write('矩阵4 * 矩阵5：');
var result = m.mulMatrix(data4,data5);
showMatrix(result);

//transposition

process.stdout.write('矩阵3的转置：');
var result = m.transOfMatrix(data3);
showMatrix(result);

process.stdout.write('矩阵4的转置：');
var result = m.transOfMatrix(data4);
showMatrix(result);

//determinant

process.stdout.write('矩阵1(1阶矩阵)的行列式：');
var result = m.detOfMatrix(data1);
console.log(result);

process.stdout.write('矩阵2(零矩阵)的行列式：');
var result = m.detOfMatrix(data2);
console.log(result);

process.stdout.write('矩阵8(2阶矩阵)的行列式：');
var result = m.detOfMatrix(data8);
console.log(result);

process.stdout.write('矩阵6(普通矩阵)的行列式：');
var result = m.detOfMatrix(data6);
console.log(result);

process.stdout.write('矩阵3(普通矩阵)的行列式：');
var result = m.detOfMatrix(data3);
console.log(result);

//rank

process.stdout.write('矩阵1(1阶矩阵)的秩：');
var result = m.rankOfMatrix(data1);
console.log(result);

process.stdout.write('矩阵2(零矩阵)的秩：');
var result = m.rankOfMatrix(data2);
console.log(result);

process.stdout.write('矩阵6(普通矩阵)的秩：');
var result = m.rankOfMatrix(data6);
console.log(result);

process.stdout.write('矩阵3(满秩矩阵)的秩：');
var result = m.rankOfMatrix(data3);
console.log(result);

//cofactor

process.stdout.write('矩阵3(a12)的余子式：');
var result = m.cofactor(data3,1,2);
console.log(result);

// adjoint matrix

process.stdout.write('矩阵3的伴随矩阵：');
var result = m.adjointMatrix(data3);
showMatrix(result);

//inverse matrix

process.stdout.write('矩阵3的逆矩阵：');
var result = m.inverseMatrix(data3);
showMatrix(result);



function showMatrix(data){

	console.log();
	for(var i=0;i<data.length;i++){
		for(var j=0;j<data[0].length;j++){

			process.stdout.write(data[i][j] + ' ');
		}
		
		console.log();
	}
}


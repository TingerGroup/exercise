"use strict";

/*  矩阵输出  */
function printMatrix(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            process.stdout.write(matrix[i][j] + ' ');
        }
        console.log();
    }
};

/*  矩阵相加  */
function matrixAddition(a,b) {
    var result = new Array();

    if (a.length == b.length && a[0].length == b[0].length) {
        for (var i = 0; i < a.length; i++) {
            result[i] = [];
            for (var j = 0; j < a[i].length; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
    }

    else {
        throw new TypeError("Invalid parameters");
    }

    return result;
};

/*  矩阵相乘  */
function matrixMultiplication(a,b) {
    var result = new Array();

    if (a[0].length == b.length) {
        for (var i = 0; i < a.length; i++) {
            result[i] = [];
            for (var j = 0; j < b[i].length; j++) {
                var resultCol = 0;
                for (var k = 0;k < a[i].length;k++) {
                    resultCol += a[i][k] * b[k][j];
                }
                result[i][j] = resultCol;
            }
        }
    }

    else {
        throw new TypeError("Invalid parameters");
    }

    return result;
};

/*  伴随矩阵  */
function matrixAdjoint(a) {
    var result = new Array();

    if (a[0].length == a.length) {
        for (var i = 0; i < a.length; i++) {
            result[i] = [];
            for (var j = 0;j < a.length;j++) {
                result[i][j] = Math.pow(-1,i+j) * matrixDeterminant(matrixCofactor(a,i+1,j+1),a.length-1);
            }
        }
        result = matrixTranspose(result);
    }

    else {
        throw new TypeError("Invalid parameter");
    }

    return result;
};

/*  矩阵转置  */
function matrixTranspose(a) {
    var result = new Array();

    for (var i = 0; i < a[0].length; i++) {
        result[i] = [];
        for (var j = 0; j < a.length; j++) {
            result[i][j] = a[j][i];
        }
    }

    return result;
};

/*  逆矩阵  */
function matrixInverse(a) {
    var result = new Array();

    if (a[0].length == a.length && matrixDeterminant(a,a.length) != 0) {
        for (var i = 0; i < a.length; i++) {
            result[i] = [];
            for (var j = 0; j < a.length; j++) {
                var k = 1 / matrixDeterminant(a,a.length);
                result[i][j] = k * Math.pow(-1,i+j) * matrixDeterminant(matrixCofactor(a,j+1,i+1),a.length-1);
            }
        }
    }

    else {
        throw new TypeError("Invalid parameter");
    }

    return result;
};

/*  单位矩阵  */
function matrixIdentity(n) {
    var result = new Array();

    if (n > 0 && n % 1 == 0) {
        if (n == 1) {
            result[0] = [];
            result[0][0] = 1;
        }
        else {
            for (var i = 0; i < n; i++) {
                result[i] = [];
                for (var j = 0; j < n; j++) {
                    if (i == j) {
                        result[i][j] = 1;
                    }
                    else {
                        result[i][j] = 0;
                    }
                }
            }
        }
    }

    else {
        throw new TypeError("Invalid parameter");
    }

    return result;
};

/*  矩阵余子式  */
function matrixCofactor(a,i,j) {
    var result = new Array();

    if (a[0].length == a.length && i <= a.length && j <= a.length) {
        for (var m = 0; m < a.length - 1; m++) {
            result[m] = [];
            for (var n = 0; n < a.length - 1; n++) {
                var h = (m < (i - 1)) ? m : m + 1;
                var k = (n < (j - 1)) ? n : n + 1;
                result[m][n] = a[h][k];
            }
        }
    }

    else {
        throw new TypeError("Invalid parameters");
    }

    return result;
};

/*  行列式  */
function matrixDeterminant(a,n) {
    var result = 0;

    if (a[0].length == a.length && n == a.length) {
        if (n == 2) {
            result = (a[0][0] * a[1][1]) - (a[0][1] * a[1][0]);
        }
        else {
            for (var i = 0; i < n; i++) {
                result += a[0][i] * Math.pow(-1,i) * matrixDeterminant(matrixCofactor(a,1,i+1),n-1);
            }
        }
    }

    else {
        throw new TypeError("Invalid parameters");
    }

    return result;
};

/*  交换矩阵i行与j行  */
function matrixSwapRows(a,i,j) {
    var result = new Array();

    if (i <= a.length && j <= a.length) {
        for (var m = 0; m < a.length; m++) {
            result[m] = [];
            for (var n = 0; n < a[m].length; n++) {
                if (m == i-1) {
                    result[m][n] = a[j-1][n];
                }
                else {
                    result[m][n] = (m == j-1) ? a[i-1][n] : a[m][n];
                }
            }
        }
    }

    else {
        throw new TypeError("Invalid parameters");
    }

    return result;
};

/*  矩阵j行元素加i行元素k倍  */
function matrixElementaryTransformation(a,k,i,j) {
    var result = new Array();

    if (i <= a.length && j <= a.length) {
        for (var m = 0; m < a.length; m++) {
            result[m] = [];
            for (var n = 0; n < a[0].length; n++) {
                if (m == j-1) {
                    result[m][n] = (a[i-1][n] * k + a[m][n]);
                }
                else {
                    result[m][n] = a[m][n];
                }
            }
        }
    }

    else {
        throw new TypeError("Invalid parameters");
    }

    return result;
};

/*  矩阵的秩  */
function matrixRank(a) {
    var rank = a.length < a[0].length ? a.length : a[0].length;

    if (a.length > a[0].length) {
        a = matrixTranspose(a);
    }
    var row = a.length;

    /*  初等变换—>行阶梯矩阵 */
    for (var i = 0; i < row; i++) {
        if (a[i][i] != 0) {
            for (var j = i+1; j < row; j++) {
                a = matrixElementaryTransformation(a,-(a[j][i] / a[i][i]),i+1,j+1);
            }
        }
        else {
            var flag = true;
            for (var m = i+1; m < row; m++) {
                if (a[m][i] != 0) {
                    a = matrixSwapRows(a,i+1,m+1);
                    i = i - 1;
                    flag = false;
                    break;
                }
            }
            if (flag) {
                var temp = 0;
                for (var n = 0; n < row; n++) {
                    a[i][n] = temp;
                    a[i][n] = a[row-1][n];
                    a[row-1][n] = temp;
                }
            }
        }
    }

    console.log("行阶梯矩阵：");
    printMatrix(a);

    loop:
    for (var m = a.length - 1; m >= 0; m--) {
        for (var n = 0; n < a[0].length; n++) {
            if (a[m][n] != 0) {
                rank = m + 1;
                return rank;
                break loop;
            }
            else {
                return 0;
            }
        }
    }
};

var a = [
    [0,0,3],
    [0,2,6],
    [0,0,1]
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

// printMatrix(matrixAddition(a,b));
// printMatrix(matrixMultiplication(c,b));
// printMatrix(matrixAdjoint(b));
// printMatrix(matrixTranspose(a));
// printMatrix(matrixInverse(b));
// printMatrix(matrixIdentity(7));
// printMatrix(matrixCofactor(b,1,3));
// console.log(matrixDeterminant(b,3));
// printMatrix(matrixSwapRows(d,1,3));
// printMatrix(matrixElementaryTransformation(a,-3,1,2));
console.log(matrixRank(a));

"use strict";

/*
Parameters:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];
b -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [1,3,4],
    [5,6,7],
    [1,3,4]
];

Make sure that the rows of given matrix equals the rows and of
the other given matrix,so as their columns;
Returns the result of a added b that expressed by a two-dimensional array;
*/
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
        console.log("Invalid parameters");
    }

    return result;
};

/*
Parameters:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];
b -- a mutiplied matrix expressed by a two-dimensional array,shaped as follows:
[
    [1,3,4],
    [5,6,7],
    [1,3,4]
];

Make sure that the rows of given mutiplied matrix
equals the columns of given matrix;
Returns the result of the multiplication of two matrices that
expressed by a two-dimensional array;
*/
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
        console.log("Invalid parameters");
    }

    return result;
};

/*
Parameter:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];

Make sure that the rows of given matrix equals the columns of given matrix;
Returns the adjoint matrix of the given matrix that
expressed by a two-dimensional array;
*/
function matrixAdjoint(a) {
    var result = new Array();

    if (a[0].length == a.length) {
        for (var i = 0; i < a.length; i++) {
            result[i] = [];
            for (var j = 0;j < a.length;j++) {
                result[i][j] = Math.pow(-1,i+j) *
                        matrixDeterminant(matrixCofactor(a,i+1,j+1),a.length-1);
            }
        }
        result = matrixTranspose(result);
    }

    else {
        console.log("Invalid parameter");
    }

    return result;
};

/*
Parameter:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];

Returns the transpose matrix of the given matrix that
expressed by a two-dimensional array;
*/
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

/*
Parameter:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];

Make sure that the rows of given matrix equals the columns of given matrix;
Returns the inverse matrix of the given matrix that
expressed by a two-dimensional array;
*/
function matrixInverse(a) {
    var result = new Array();

    if (a[0].length == a.length && matrixDeterminant(a,a.length) != 0) {
        for (var i = 0; i < a.length; i++) {
            result[i] = [];
            for (var j = 0; j < a.length; j++) {
                var k = 1 / matrixDeterminant(a,a.length);
                result[i][j] = k * Math.pow(-1,i+j) *
                        matrixDeterminant(matrixCofactor(a,j+1,i+1),a.length-1);
            }
        }
    }

    else {
        console.log("Invalid parameter");
    }

    return result;
};

/*
Parameter:
n -- the order of the identity matrix you wanted,a integer;

Returns a identity matrix of the given order that
expressed by a two-dimensional array;
*/
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
        console.log("Invalid parameter");
    }

    return result;
};

/*
Parameters:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];
i -- one row number of given matrix that will be deleted;
j -- one column number of given matrix that will be deleted;

Make sure that the rows of given matrix equals the columns of given matrix;
Returns the cofactor of the given matrix that
expressed by a two-dimensional array;
*/
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
        console.log("Invalid parameters");
    }

    return result;
};

/*
Parameters:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];
n -- the rows of given matrix,a integer;

Make sure that the rows of given matrix equals the columns of given matrix;
Returns the determinant of the given matrix;
*/
function matrixDeterminant(a,n) {
    var result = 0;

    if (a[0].length == a.length && n == a.length) {
        if (n == 2) {
            result = (a[0][0] * a[1][1]) - (a[0][1] * a[1][0]);
        }
        else {
            for (var i = 0; i < n; i++) {
                result += a[0][i] * Math.pow(-1,i) *
                          matrixDeterminant(matrixCofactor(a,1,i+1),n-1);
            }
        }
    }

    else {
        console.log("Invalid parameters");
    }

    return result;
};

/*
Parameters:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];
i -- one row number of given matrix that will be swaped;
j -- the other row number of given matrix that will be swaped;

Returns the matrix that swaped two rows of the given matrix that
expressed by a two-dimensional array;
*/
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
        console.log("Invalid parameters");
    }

    return result;
};

/*
Parameters:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];
k -- ratio;
i -- one row number of given matrix that will be multiplied by ratio;
j -- the other row number of given matrix that will be added;

Returns a elementary transformed matrix of the given matrix that
expressed by a two-dimensional array;
*/
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
        console.log("Invalid parameters");
    }

    return result;
};

/*
Parameter:
a -- a matrix expressed by a two-dimensional array,shaped as follows:
[
    [0,0,3],
    [0,2,6],
    [0,0,1]
];

Returns the rank of the given matrix;
*/
function matrixRank(a) {
    var rank = a.length < a[0].length ? a.length : a[0].length;

    if (a.length > a[0].length) {
        a = matrixTranspose(a);
    }
    var row = a.length;

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

    loop:
    for (var m = a.length - 1; m >= 0; m--) {
        for (var n = 0; n < a[0].length; n++) {
            if (a[m][n] != 0) {
                rank = m + 1;
                return rank;
                break loop;
            }
            else if (m == 0 && n == 2 && a[m][n] == 0) {
                return 0;
            }
        }
    }
};

module.exports = {
    matrixAddition          : matrixAddition,
    matrixMultiplication    : matrixMultiplication,
    matrixAdjoint           : matrixAdjoint,
    matrixTranspose         : matrixTranspose,
    matrixInverse           : matrixInverse,
    matrixIdentity          : matrixIdentity,
    matrixCofactor          : matrixCofactor,
    matrixDeterminant       : matrixDeterminant,
    matrixRank              : matrixRank
};

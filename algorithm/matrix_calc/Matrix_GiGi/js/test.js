
function myFunc(){

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
    var mHtml = "";

    mHtml = "<table>矩阵1：</table>";
    document.write(mHtml);
    showMatrix(data1);

    mHtml = "<table>矩阵2：</table>";
    document.write(mHtml);
    showMatrix(data2);

    mHtml = "<table>矩阵3：</table>";
    document.write(mHtml);
    showMatrix(data3);

    mHtml = "<table>矩阵4：</table>";
    document.write(mHtml);
    showMatrix(data4);

    mHtml = "<table>矩阵5：</table>";
    document.write(mHtml);
    showMatrix(data5);

    mHtml = "<table>矩阵6：</table>";
    document.write(mHtml);
    showMatrix(data6);

    mHtml = "<table>矩阵7：</table>";
    document.write(mHtml);
    showMatrix(data7);

    mHtml = "<table>矩阵8：</table>";
    document.write(mHtml);
    showMatrix(data8);

    //add

    mHtml = "<br/><br/><table>矩阵6 + 矩阵7：</table>";
    document.write(mHtml);
    var result = addMatrix(data6,data7);
    showMatrix(result);

    //multiply

    mHtml = "<br/><br/><table>矩阵4 * 矩阵5：</table>";
    document.write(mHtml);
    var result = mulMatrix(data4,data5);
    showMatrix(result);

    //transposition

    mHtml = "<br/><br/><table>矩阵3的转置：</table>";
    document.write(mHtml);
    var result = transOfMatrix(data3);
    showMatrix(result);

    mHtml = "<br/><table>矩阵4的转置：</table>";
    document.write(mHtml);
    var result = transOfMatrix(data4);
    showMatrix(result);

    //determinant

    mHtml = "<br/><br/><table>矩阵1(1阶矩阵)的行列式：</table>";
    document.write(mHtml);
    var result = "<table>"+detOfMatrix(data1)+"</table>";
    document.write(result);

    mHtml = "<br/><table>矩阵2(零矩阵)的行列式：</table>";
    document.write(mHtml);
    var result = "<table>"+detOfMatrix(data2)+"</table>";
    document.write(result);

     mHtml = "<br/><table>矩阵8(2阶矩阵)的行列式：</table>";
    document.write(mHtml);
    var result = "<table>"+detOfMatrix(data8)+"</table>";
    document.write(result);

    mHtml = "<br/><table>矩阵6(普通矩阵)的行列式：</table>";
    document.write(mHtml);
    var result = "<table>"+detOfMatrix(data6)+"</table>";
    document.write(result);

    mHtml = "<br/><table>矩阵3(普通矩阵)的行列式：</table>";
    document.write(mHtml);
    var result = "<table>"+detOfMatrix(data3)+"</table>";
    document.write(result);

    //rank

    mHtml = "<br/><br/><table>矩阵1(1阶矩阵)的秩：</table>";
    document.write(mHtml);
    var result = "<table>"+rankOfMatrix(data1)+"</table>";
    document.write(result);

    mHtml = "<br/><table>矩阵2(零矩阵)的秩：</table>";
    document.write(mHtml);
    var result = "<table>"+rankOfMatrix(data2)+"</table>";
    document.write(result);

    mHtml = "<br/><table>矩阵6(普通矩阵)的秩：</table>";
    document.write(mHtml);
    var result = "<table>"+rankOfMatrix(data6)+"</table>";
    document.write(result);

    mHtml = "<br/><table>矩阵3(满秩矩阵)的秩：</table>";
    document.write(mHtml);
    var result = "<table>"+rankOfMatrix(data3)+"</table>";
    document.write(result);

}

/**

    show matrix

*/
function showMatrix(data){
    var sHtml = "";
    sHtml = "<table>";
    for(var i=0; i<data.length; i++){
        sHtml += "<tr>";
        for(var j=0; j<data[0].length; j++){
            sHtml += "<td>"+data[i][j]+" </td>";
        }
        sHtml +="</tr>";

    }
    sHtml += "</table>";
    document.write(sHtml);
}


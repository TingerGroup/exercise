
/**

data is a valid matrix or not 

*/
function isMatrix(data){

    if(typeof data != "object"||typeof data.length == "undefined"||!data){
        throw new Error("data's type is error");
    }
    else{
        return true;
    }
}

/**

    adding matrices

*/
function addMatrix(data1,data2){

    var result = new Array();

    if(isMatrix(data1) && isMatrix(data2)){
        if((data1.length == data2.length) && (data1[0].length == data2[0].length)){ 
            for(var i=0; i<data1.length; i++){
                result[i] = new Array();
                for(var j=0; j<data1[0].length; j++){
                    result[i][j] = data1[i][j] + data2[i][j];
                }
            }
        }
    }
    return result;
}


/**

    matrix multiplication
    
*/
function mulMatrix(data1,data2){

    var result = new Array();

    if(isMatrix(data1) && isMatrix(data2)){
        if(data1[0].length == data2.length){ 

            for(var i=0; i<data1.length; i++){
                result[i] = new Array();
                for(var j=0; j<data2[0].length; j++){

                    result[i][j] = 0;
                    for(var m=0; m<data1[0].length; m++){
                    
                        result[i][j] += data1[i][m] * data2[m][j];                      
                    }

                }
            }
        }
    }
    return result;
}



/**
    
    matrix transposition

*/
function transOfMatrix(data){

    var result = new Array();

    if(isMatrix(data)){
        for(var i=0; i<data[0].length; i++){
            result[i] = new Array();
            for(var j=0; j<data.length; j++){
                result[i][j] = data[j][i];
            }
        }

    }
    return result;
}


/**

    matrix determinant

*/
function detOfMatrix(data){

    var m = 0;              
    var temp1,temp2 = 1;  
    var result = 0;

    if(isMatrix(data)){
        if(data.length == data[0].length){
            
            if(1 == data.length){
                result = data[0][0];
            }
            else if(2 == data.length){
                result = data[0][0] * data[1][1] - data[0][1] * data[1][0];
            }
            else{

                var len = data.length;
                for(var i=0; i<len; i++){

                    m = 0;
                    temp1 = 1;
                    temp2 = 1;

                    for(var j=i; j<len+i; j++,m++){

                        temp1 *= data[m][j%len];
                        temp2 *= data[m][len-j%len-1];
                    }
                    result += (temp1 - temp2);
                }
            }            
        }
    }
    return result;
}



/**

    the rank of matrix

*/
function rankOfMatrix(data){

    var k = 0;       
    var rows,cols = 0;      
    var zero = 0;
    var mark;
    var maxLen = (data.length<=data[0].length)?data.length:data[0].length;

    //the zero matrix
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data[0].length;j++){
            if(0==data[i][j]){
                zero++;
            }
        }
    }
    if(zero==data.length*data[0].length){
        return 0;
    }
    
    //the non-zero matrix
    for(k=1; k<maxLen; k++){

        mark = true;
        rows = data.length;
        cols = data[0].length;

        for(var i=0; i<rows-k; i++){
            for(var j=0; j<cols-k; j++){

                var det = getDet(data,i,j,k+1);

                if(0!=detOfMatrix(det)){
                    mark = false;
                    break;
                }
            }
            if(!mark){
                break;
            }
        }

        if(mark){

            for(var i=0; i<=rows-k; i++){                   
                for(var j=0; j<=cols-k; j++){

                    var det = getDet(data,i,j,k);
                    if(0!=detOfMatrix(det)){
                        return k;
                    }
                }
            }
        }     
       
    }
    if(k == maxLen){
       return maxLen;
    }
}

/**

    get n order determinants from a matrix

*/
function getDet(data,xindex,yindex,n){

    var maxLen = (data.length<=data[0].length)?data.length:data[0].length;
    var det = new Array();

    if(n>=0 && n<=maxLen){
        if(xindex>=0 && xindex<=data.length-n && yindex>=0 && yindex<=data[0].length-n){

            for(var i=0;i<n;i++){
                det[i] = new Array();
                for(var j=0; j<n; j++){
                    det[i][j] = data[xindex+i][yindex+j];
                }
            }

        }
        
    }      
    return det;
}

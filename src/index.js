module.exports = function zeros(expression) {  //  //Expression contains only factorials of numbers and multiplying signs,
  
    var factorials = expression.split("*");
    var buffer, number, phase,zeros = 0;        
    var summ = "1";

    for(var i = 0; i < factorials.length; i++){
       buffer =  factorials[i].split(/(!)/g);        //split by ! including !
       number = buffer.shift();
       phase = buffer.join("");
       summ = multiply(summ, bigFactorial(number,phase));            //zeros += zerosInFactorial(number, phase);
    }

    for(var i = summ.length - 1; summ.charAt(i) == "0"; i--){
        zeros++;
    }

    return zeros;
}
//calculating factorial for very big numbers using function from previous task
function bigFactorial(number, config){   //config = str where "!" stand for usual factorial, and "!!"
                                      //stand for factorial through one like "10!! === 2 * 4 * 6 * 8 * 10`"
  var phase  = config == "!" ? 1 : 2;   //config should be "!" either "!!"
  var summ = "" + number;          
  
  for(var i = number - phase; i > 0; i -= phase){
    summ = multiply(summ, "" + i);
  }  

  return summ;
}

function multiply(first, second){   //both String
    if(typeof(first) != "string" || typeof(second) != "string" ||
    isNaN(first) || isNaN(second))  return false;
  
    if(first.length < 7 && second.length < 7) return (first * second).toString();
  
    first = first.split('').reverse();
    second = second.split('').reverse();
      var result = [];
  
      for (var i = 0; i < first.length; i++) {      //iterate over first operand
          for (var j = 0; j < second.length; j++) {    //iterate over second operand
              if (result[i + j] == undefined) {    //create slot in the [result]    
                  result[i + j] = 0;
              }
  
              result[i + j] += first[i] * second[j];
          }
      }
  
      for (var i = 0; i < result.length; i++) {   //summing up all number in the [result] with carry over
          if (result[i] >= 10) {
              if (result[i + 1] == undefined) {   //create slot in the [result] 
                  result[i + 1] = 0;
              }
  
              result[i + 1] += Math.floor(result[i] / 10);
              result[i] %= 10;
          }
      }
  
      return result.reverse().join('');
  }
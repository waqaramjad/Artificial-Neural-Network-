var inputs , bias , weightsOfInputHidden , result , i ,j ,  

inputs = [1,0,1]
var OutPutFinalResult = []
bias = [-0.4,0.2,0.1]
weightsOfInputHidden = [[0.2, -0.3],[0.4,0.1],[-0.5,0.2]]

// input to hidden layer 
 for(j=0;j<=1;j++){
   var oneObjectResult = []
  for(i=0;i<=2;i++){
    result= inputs[i]*weightsOfInputHidden[i][j]
    console.log('result',result)
    
    oneObjectResult.push(result) 

    if(i==2){


     var hiddenOutPut = oneObjectResult.reduce(function(a, b) { return a + b; }, 0)
     hiddenOutPut = hiddenOutPut + bias[j]
     console.log('hiddenOutPut',hiddenOutPut)
     var sigmoidOutput =1/(1+ Math.exp(-hiddenOutPut))
     console.log('sigmoidOutput',sigmoidOutput)
 
     OutPutFinalResult.push(sigmoidOutput)
    }



  }
 }


 // hidden to output 
console.log('hidden to output')
 var weightsOfHiddenToOuput = [-0.3, -0.2]
 var resultForHidddentoOutput = []
 for(i=0;i<=1;i++){
    result= OutPutFinalResult[i]*weightsOfHiddenToOuput[i]
    resultForHidddentoOutput.push(result)
    if(i==1){


        console.log('ARRAY ',resultForHidddentoOutput)
        var hiddenOutPut = resultForHidddentoOutput.reduce(function(a, b) { return a + b; }, 0)
        hiddenOutPut = hiddenOutPut + bias[2]
        console.log('hiddenOutPut',hiddenOutPut)
        var sigmoidOutput =1/(1+ Math.exp(-hiddenOutPut))
        console.log('sigmoidOutput',sigmoidOutput)
    
        OutPutFinalResult.push(sigmoidOutput)
       }
 }

// error result 

console.log('error result ')

var errorArray = []

// erorr for output layer 
var target = 1 
var Oj = OutPutFinalResult[2]
var errorOfOutput = Oj*(1-Oj)*(target-Oj)
errorArray.push({type:'Output', value:errorOfOutput})

// error of hidden layer 

for(i=0;i<=1;i++){
    var Oj= OutPutFinalResult[i]
    console.log(Oj)
    // var errorOfOutput =  Oj*(1-Oj)*(errorArray[0]*weightsOfHiddenToOuput[i])
    var errorOfOutput =  Oj*(1-Oj)*(errorArray[0].value) * weightsOfHiddenToOuput[i]
    console.log(errorOfOutput)
    errorArray.push({type:'Hidden', value:errorOfOutput})
    
}

//
// console.log(errorArray)


    // update weights 

// hiiden layer weights 
// weightsOfHiddenToOuput
var learning = 0.9
for(i=0;i<=1;i++){
    var daltaWeights = learning * errorArray[0].value * OutPutFinalResult[i]
    weightsOfHiddenToOuput[i] = weightsOfHiddenToOuput[i]+daltaWeights

}

console.log(OutPutFinalResult)
console.log(weightsOfHiddenToOuput)


// input layer weights 
var errorIndex = 1
for(j=0;j<=1;j++){
    var oneObjectResult = []
   for(i=0;i<=2;i++){
   
    var daltaWeights = learning * errorArray[errorIndex].value * inputs[i]
    console.log('daltaWeights',daltaWeights)
    weightsOfInputHidden[i][j] = weightsOfInputHidden[i][j]+daltaWeights


}
errorIndex++
} 

console.log(weightsOfInputHidden)





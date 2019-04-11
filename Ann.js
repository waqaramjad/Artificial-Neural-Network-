var inputs , bias , weightsOfInputHidden , result , i ,j ,  

inputs = [1,0,1]
var OutPutFinalResult = []
bias = [-0.4,0.2,0.1]
weightsOfInputHidden = [[0.2, -0.3],[0.4,0.1],[-0.5,0.2]]
var weightsOfHiddenToOuput = [-0.3, -0.2]
var resultForHidddentoOutput = []
var errorArray = []
// errorArray[0]=1
var target = 1 
var learning = 0.9
var counter = 1
var OutputError = 2
// input to hidden layer 
while( OutputError>0.05){
    // for(j=0;j<=1;j++){
        var oneObjectResult = []
        // var oneObjectResult = []
  for(i=0;i<=2;i++){
    result= inputs[i]*weightsOfInputHidden[i][0]
    //console.log('result',result)
    // console.log(inputs[2])
    oneObjectResult.push(result) 

    if(i==2){


     var hiddenOutPut = oneObjectResult.reduce(function(a, b) { return a + b; }, 0)
     hiddenOutPut = hiddenOutPut + bias[0]
     //console.log('hiddenOutPut',hiddenOutPut)
     var sigmoidOutput =1/(1+ Math.exp(-hiddenOutPut))
    //  console.log('sigmoidOutput',sigmoidOutput)
    //  console.log('OutPutFinalResult',OutPutFinalResult.length)
 
     OutPutFinalResult[0] = sigmoidOutput
    }



  }
        var oneObjectResult = []
        // var oneObjectResult = []
  for(i=0;i<=2;i++){
    result= inputs[i]*weightsOfInputHidden[i][1]
    //console.log('result',result)
    // console.log(inputs[2])
    oneObjectResult.push(result) 

    if(i==2){


     var hiddenOutPut = oneObjectResult.reduce(function(a, b) { return a + b; }, 0)
     hiddenOutPut = hiddenOutPut + bias[1]
     //console.log('hiddenOutPut',hiddenOutPut)
     var sigmoidOutput =1/(1+ Math.exp(-hiddenOutPut))
    //  console.log('sigmoidOutput',sigmoidOutput)
    //  console.log('OutPutFinalResult',OutPutFinalResult.length)
 
     OutPutFinalResult[1] = sigmoidOutput
     console.log()
    }



  }
//  }


 // hidden to output 
//console.log('hidden to output')
var resultForHidddentoOutput = []
 for(i=0;i<=1;i++){
    result= OutPutFinalResult[i]*weightsOfHiddenToOuput[i]
    resultForHidddentoOutput.push(result)
    if(i==1){
        // console.log('check')
        
        //console.log('ARRAY ',resultForHidddentoOutput)
        var hiddenOutPut = resultForHidddentoOutput.reduce(function(a, b) { return a + b; }, 0)
        hiddenOutPut = hiddenOutPut + bias[2]
        //console.log('hiddenOutPut',hiddenOutPut)
        var sigmoidOutput =1/(1+ Math.exp(-hiddenOutPut))
        //console.log('sigmoidOutput',sigmoidOutput)
    
        OutPutFinalResult[2] = sigmoidOutput
        // console.log(OutPutFinalResult[2]) 

    }
 }

 // error result 
 
 //console.log('error result ')
 

// erorr for output layer 
var Oj = OutPutFinalResult[2]
var errorOfOutput = Oj*(1-Oj)*(target-Oj)
errorArray[0] = {type:'Output', value:errorOfOutput}
OutputError = errorArray[0].value


// error of hidden layer 

// for(i=0;i<=1;i++){
    var Oj= OutPutFinalResult[0]
    //console.log(Oj)
    // var errorOfOutput =  Oj*(1-Oj)*(errorArray[0]*weightsOfHiddenToOuput[i])
    var errorOfOutput =  Oj*(1-Oj)*(errorArray[0].value) * weightsOfHiddenToOuput[0]
    //console.log(errorOfOutput)
    errorArray[1] = {type:'Output', value:errorOfOutput}
// }
// for(i=0;i<=1;i++){
    var Oj= OutPutFinalResult[1]
    //console.log(Oj)
    // var errorOfOutput =  Oj*(1-Oj)*(errorArray[0]*weightsOfHiddenToOuput[i])
    var errorOfOutput =  Oj*(1-Oj)*(errorArray[0].value) * weightsOfHiddenToOuput[1]
    //console.log(errorOfOutput)
    errorArray[2] = {type:'Output', value:errorOfOutput}
    
// }

//
// //console.log(errorArray)


    // update weights 

// hiiden layer weights 
// weightsOfHiddenToOuput
for(i=0;i<=1;i++){
    var daltaWeights = learning * errorArray[0].value * OutPutFinalResult[i]
    weightsOfHiddenToOuput[i] = weightsOfHiddenToOuput[i]+daltaWeights

}

//console.log(OutPutFinalResult)
//console.log(weightsOfHiddenToOuput)


// input layer weights 
var errorIndex = 1
for(j=0;j<=1;j++){
    var oneObjectResult = []
   for(i=0;i<=2;i++){
   
    var daltaWeights = learning * errorArray[errorIndex].value * inputs[i]
    //console.log('daltaWeights',daltaWeights)
    weightsOfInputHidden[i][j] = weightsOfInputHidden[i][j]+daltaWeights


}
errorIndex++
} 

//console.log(weightsOfInputHidden)

// calculate bias 

var BIASj = learning*errorArray[0].value
bias[2]= bias[2]+BIASj
//console.log(bias[2])

var erorIndexForBias = 1
for(i=0;i<=1;i++){

     var BIASj = learning*errorArray[erorIndexForBias].value
    bias[i]= bias[i]+BIASj
    erorIndexForBias++
}

// console.log(bias[0])

// console.log( 'counter ' + counter + 'error ' +errorArray[0].value)
// console.log(OutPutFinalResult[2])
  console.log(OutputError)
// console.log(bias[0])
// console.log(weightsOfHiddenToOuput[1])
counter++
}
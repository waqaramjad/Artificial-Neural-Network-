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




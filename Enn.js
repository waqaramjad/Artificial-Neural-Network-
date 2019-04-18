
var maximum = 25 
var minimum = 20
var ParentsRange =   Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
// console.log(ParentsRange)


var matrix = [],
    cols = 3;
var ParentNode = []
//init the grid matrix
for ( var i = 0; i < ParentsRange; i++ ) {
    // console.log('i',i)
    var SingleNode = []
    // weights 
    for ( var j = 0; j <= 7; j++ ) {
        SingleNode[j] = (Math.random() * (-0.5 - 0.5) + 0.5).toFixed(4)
        SingleNode[j] *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        // console.log('j',j)
        // console.log( SingleNode[j])

    }
    // bias 
    for ( var k=8 ; k <= 10; k++ ) {
        SingleNode[k] = (Math.random() * (-0.5 - 0.5) + 0.5).toFixed(4)
        SingleNode[k] *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

    }

// console.log(SingleNode)
ParentNode.push(SingleNode)
    matrix[i] = []; 
}
console.log(ParentNode)
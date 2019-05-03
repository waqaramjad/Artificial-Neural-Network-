const fs=require('fs');

const initial_population = 25;
const children_count = 10; // 20 in total
const gene_count = 3;
let initial_population_array = [];
let children_array = [];
let x_range_max = 2;
let y_range_max = 3;
let z_range_max = 3;


const fitness_function_equation = (x, y, z) => {
   return (Math.pow(x, 2) - 2*x*y*Math.pow(z, 2) + 2*Math.pow(y, 2)*z - 5.7 *x*y*z + Math.pow(z, 2));   
}

function random_number_for_x(){
    var random = (Math.random()*4) - 2;
    return random;
}

function random_number_for_y(){
    var random = (Math.random()*4) - 1;
    return random;
}

function random_number_for_z(){
    var random = (Math.random()*3);
    return random;
}

function random_number_for_crossover(){
    var random = Math.round(Math.random()*24);
    return random;
}

function random_number_for_mutation(){
    var random = Math.round(Math.random()*1);
    return random;
}

function random_number_for_gene_mutation(){
    var random = Math.round(Math.random()*2);
    return random;
}

const population = (initial_population_size) => { // calculate initial population
    let array = [];
    for(let i=0; i<initial_population_size; i++){
        array[i] = [];
        for(let j=0; j<gene_count; j++){
            switch(j) {
                case 0: //x
                array[i][j] = random_number_for_x();
                break;
                case 1: //y
                array[i][j] = random_number_for_y();
                break;
                case 2: //z
                array[i][j] = random_number_for_z();
                break; 
            }
        }
    }
    return(array)
}

const check_similar_chromosome_genes = (chromosome1, chromosome2, array) => {
    if( array[chromosome1][0] === array[chromosome2][0] && 
        array[chromosome1][1] === array[chromosome2][1] &&
        array[chromosome1][2] === array[chromosome2][2]
        ){
        return true;
    }       
    return false;
} 

const check_repeated_chromosome = (array, chromosome_added_value) => {
    console.log(array.includes(chromosome_added_value))
    return array.includes(chromosome_added_value);
}

const crossover = (array, children_population_count) => {
    let children_array = [];
    let chromosome_ledger = [];
    for(let i=0; i<children_population_count; i++){
        let chromosome1 = random_number_for_crossover();
        let chromosome2 = random_number_for_crossover();
        console.log("Chromosomes", chromosome1, chromosome2);
        if(check_similar_chromosome_genes(chromosome1, chromosome2, array) || check_repeated_chromosome(chromosome_ledger, chromosome1 +""+ chromosome2)){
            console.log("works");
            i--;
        }
        else{
            // Duplicate ledger maintaining
            chromosome_ledger.push(chromosome1 +""+ chromosome2);
            chromosome_ledger.push(chromosome2 +""+ chromosome1);

            children_array[i] = array[chromosome1];
            children_array[i+10] = array[chromosome2];

            children_array[i][0] =  children_array[i][0] + children_array[i+10][0];
            children_array[i+10][0] = children_array[i][0] - children_array[i+10][0];
            children_array[i][0] = children_array[i][0] - children_array[i+10][0];
            // array[chromosome1][0] = 
            // array[chromosome2][0] =
        }
    }
    return(children_array)
}

const mutation = (array) => {
    console.log("Crossover", array)
    for(let i=0; i<array.length; i++){
        if(random_number_for_mutation()){
            let gene_value = random_number_for_gene_mutation();
            switch(gene_value) {
                case 0:
                if(array[i][gene_value] + 0.05 > x_range_max){
                    array[i][gene_value] = array[i][gene_value] - 0.05
                    console.log("subtrat", gene_value)
                }else {
                    array[i][gene_value] = array[i][gene_value] + 0.05
                    console.log("addition", gene_value)
                }
                break;
                case 1:
                if(array[i][gene_value] + 0.05 > y_range_max){
                    array[i][gene_value] = array[i][gene_value] - 0.05
                    console.log("subtrat", gene_value)
                }else {
                    array[i][gene_value] = array[i][gene_value] + 0.05
                    console.log("addition", gene_value)
                }
                break;
                case 2:
                if(array[i][gene_value] + 0.05 > z_range_max){
                    array[i][gene_value] = array[i][gene_value] - 0.05
                    console.log("subtrat", gene_value)
                }else {
                    array[i][gene_value] = array[i][gene_value] + 0.05
                    console.log("addition", gene_value)
                }
                break;
            }
        }
        else{
            // console.log("nothing")
        }
    }
    return array;
}

const fitness_function_calculator = (array) => {
    for(let i = 0; i<array.length; i++){
        array[i][3] = fitness_function_equation(array[i][0], array[i][1], array[i][2]) // array[i][3] is the value for fitness
    }
    return array;
}


initial_population_array = population(initial_population); // Initial Parent Selection
children_array = crossover(initial_population_array, children_count); // Produce Children Array
children_array = mutation(children_array);
final_population = initial_population_array.concat(mutation(children_array))
final_population_with_fitness_value =  fitness_function_calculator(final_population)
// console.log(final_population_with_fitness_value)
final_population_with_fitness_value.sort((a, b) => {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] < b[3]) ? -1 : 1;
    }
})

// for(var i=0;  )

fs.writeFile('output'+'.txt', final_population_with_fitness_value, err => {
    console.log(err)
})
// initial_population_array = final_population;

console.log(final_population_with_fitness_value);
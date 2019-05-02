const MaxRangeOf_X = 2, MacRangeOf_Y = 3, MacRangeOf_Z = 4;
const MinRangeOf_X =-2, MinRangeOf_Y = -3, MinRangeOf_Z =0;
const FitnessEquation = (x, y, z) => { //FitnessEquation
    return (Math.pow(x, 2) - 2 * x * y * Math.pow(z, 2) + 2 * Math.pow(y, 2) * z - 5.7 * x * y * z + Math.pow(z, 2));
}

function random_number_for_x() {
    var random = (Math.random() * 4) - 2; //between 2 and -2
    return random;
}

function random_number_for_y() {
    var random = (Math.random() * 4) - 1; //between -1 and 3
    return random;
}

function random_number_for_z() {
    var random = (Math.random() * 3); // between 0 and 3
    return random;
}

const is_rangeChecker_X = (val) => {
   return (val < MaxRangeOf_X && val > MinRangeOf_X)? true : false 
}

const is_rangeChecker_Y = (val) => {
    return (val < MacRangeOf_Y && val > MinRangeOf_Y) ? true : false     
}

const is_rangeChecker_Z = (val) => {
   return (val < MacRangeOf_Z && val > MinRangeOf_Z) ? true : false     
}

function r1() {
    var random = (Math.random() * 1); // between 0 and 1
    return random;
}

function r2() {
    var random = (Math.random() * 1); // between 0 and 1
    return random;
}

const c1 =2, c2 = 2;
 
const population = (initial_population_size ) => { // calculate initial particles 10 in size
    let Particles = [];
    let personal_best = [];
    for (let i = 0; i < initial_population_size; i++) {
        Particles[i] = [];
        personal_best[i] = [];
        for (let j = 0; j < 4; j++) {
            switch (j) {
                case 0: 
                    Particles[i][j] = random_number_for_x();
                    personal_best[i][j] = Particles[i][j];
                    break;
                case 1: 
                    Particles[i][j] = random_number_for_y();
                    personal_best[i][j] = Particles[i][j];
                    break;
                case 2: 
                    Particles[i][j] = random_number_for_z();
                    personal_best[i][j] = Particles[i][j];
                    break;
                case 3:
                    Particles[i][j] = FitnessEquation(Particles[i][j-3], Particles[i][j-2], Particles[i][j-1]) // fitness function
                    personal_best[i][j] = Particles[i][j];
            }  
        }
    }
    return {init_arr : Particles, personal_best : personal_best}
}

function globalBestAnalyzer (Particles) {
    Particles.sort((a, b) => {
        if (a[3] === b[3]) {
            return 0;
        }
        else {
            return (a[3] < b[3]) ? -1 : 1;
        }
    })
    // console.log('////////////////////////////////////////////////////////////////////////////')
    // console.log(Particles)

    return Particles[Particles.length - 1];
}

function particle_position(Particles, pers_best, global_best) {
    // let arr = Particles;
    // //console.log(Particles)
    let new_x_value, new_y_value, new_z_value;
    for (let i = 0; i < Particles.length; i++) {
        var rangeChecker_X = true;
        var rangeChecker_Y = true;
        var rangeChecker_Z = true;
        for (let j = 0; j < 4; j++) {
            switch (j) {
                case 0: //x
                new_x_value = Particles[i][j] + ((c1 * r1()) * (pers_best[i][j] - Particles[i][j])) + ((c2 * r2()) * (global_best[j] - Particles[i][j]))
                    if(is_rangeChecker_X(new_x_value)){
                        //console.log("In RANGE", Particles[i][j])
                    Particles[i][j] = new_x_value;
                    pers_best[i][j] = Particles[i][j];
                }else {
                    //console.log("x is outside of the range, In else", Particles[i][j])
                    rangeChecker_X = false;
                }
                    break;
                case 1: //y
                new_y_value = Particles[i][j] + ((c1 * r1()) * (pers_best[i][j] - Particles[i][j])) + ((c2 * r2()) * (global_best[j] - Particles[i][j]))
                if(is_rangeChecker_Y(new_y_value)){
                Particles[i][j] = new_y_value;
                pers_best[i][j] = Particles[i][j];
            }else {
                //console.log("y is outside of the range, In else", Particles[i][j])
                rangeChecker_Y = false;
            }
                // Particles[i][j] = Particles[i][j] + ((c1 * r1()) * (pers_best[i][j] - Particles[i][j])) + ((c2 * r2()) * (global_best[j] - Particles[i][j]));
                // personal_best[i][j] = Particles[i][j];
                    break;
                case 2: //z
                new_z_value = Particles[i][j] + ((c1 * r1()) * (pers_best[i][j] - Particles[i][j])) + ((c2 * r2()) * (global_best[j] - Particles[i][j]))
                if(is_rangeChecker_Z(new_z_value)){
                Particles[i][j] = new_z_value;
                pers_best[i][j] = Particles[i][j];
            }else {
                //console.log("z is outside of the range, In else", Particles[i][j])
                rangeChecker_Z = false;
            }
                    break;
                case 3:
                if(rangeChecker_X && rangeChecker_Y && rangeChecker_Z)
                Particles[i][j] = FitnessEquation(Particles[i][j-3], Particles[i][j-2], Particles[i][j-1]);
                pers_best[i][j] = Particles[i][j];
                break;
                default : 
                break;
            }  
        }
    }
    return {ind : Particles, personal_best : pers_best, global_best : globalBestAnalyzer(pers_best)}
}

// export const particle_swarm_optimization = (number_of_iterations) => {

    number_of_iterations = 10
    // return(number_of_iterations)
    let initial_population = population(10);
    let ind = initial_population.init_arr;
    let personal_best = initial_population.personal_best;
    let global_best = globalBestAnalyzer(personal_best);
    let HistoryOfAllParticle  = [] 
    let data = { 
        ind : ind,
        personal_best : personal_best,
        global_best : global_best
    };
    for (let i = 0; i < number_of_iterations; i++) {
        let fitness_arr = []
        //console.log(data.ind);
        for (let j = 0; j < data.ind.length; j++) {
            fitness_arr[j] = data.ind[j][3];
        }
        HistoryOfAllParticle .push(fitness_arr)
        data = particle_position(data.ind, data.personal_best, data.global_best);                
        console.log(data)
        //console.log('====================================');
        // //console.log('====================================');
    }
    // //console.log('**********************************');
    // //console.log(HistoryOfAllParticle , "HistoryInd");
    // //console.log('**********************************');
    console.log(data.global_best[3])
    // return {fitnesses : HistoryOfAllParticle , global_best : data.global_best};
// }

// //console.log(particle_swarm_optimization(10))
let result = [];

for (let i = 2; i < 100; i++){
    for(let j = 2; j <= i; j++){
        if (i % j == 0 && j < i){
            break;
        }
        else if (j === i){
            result.push(i)
        }
    }
}
console.log(result)
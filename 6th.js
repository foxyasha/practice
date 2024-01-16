let result = [1];
let current = 2;
let prev = 1;

while (current < 200){
    result.push(current)
    let i = current + prev
    prev = current
    current = i;
}

console.log(result)
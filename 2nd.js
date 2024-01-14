let str = 'hello alexandr!';
let arr = str.split(' ');
let result = [];

for(let i = 0; i < arr.length; i++){
    result.push(arr[i].slice(0,1).repeat(arr[i].length))

}
console.log(result.join(' '))
const twoDimensionalArr  = [[1,4,5], [1,3,4], [2,6]]

const arr = twoDimensionalArr.reduce(function (acc, el){
    return acc.concat(el);
})
arr.sort()

console.log(arr)

const object = {
    a: 1,
    b: 2,
}
const objToArr = (obj) => {
    let result = []
    for (let key in obj){
        result.push([key,obj[key]]);
    }
    return result;
}
console.log(objToArr(object))
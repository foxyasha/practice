const numsArr = [1,2,3,6,8,1,6,3,2,1,0,4]
const strArr = ['one', 'two', 'three']
let result = []

const bubbleSort = (arr) =>{
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr.length; j++){
            if (arr[j+1] <arr[j]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr
}

result = [...bubbleSort(numsArr), ...strArr]
console.log(result)
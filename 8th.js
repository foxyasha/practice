const arr = [6,1,7,3,5,8,0,-1,3,2,4,5]

const filteredArr = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        let min = i;
        for(let j = i+1; j < arr.length; j++) {
            if(arr[j] < arr[min]) {
                min = j;
            }
        }
        if(min !== i) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}

const binarySearch = (arr, item) =>{
    let start = 0
    let end = arr.length
    let middle;
    let found = false
    let position = -1
    while (found === false && start <= end){
        middle = Math.floor((start + end) / 2);
        if (arr[middle] === item){
            found = true
            position = middle
            return position;
        }
        if (item < arr[middle]){
            end = middle - 1
        }
        else{
            start = middle + 1
        }
    }
}
const filteredArray = filteredArr(arr)

console.log(filteredArray)
console.log("Индекс:" ,binarySearch(filteredArray, 0))

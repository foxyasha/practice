const str = 'DDADSADASDAAADS'
const arr = Array.from(str)
const chars = Array.from(new Set(arr))
console.log(chars.join(''))
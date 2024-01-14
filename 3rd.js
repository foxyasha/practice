const palindrome = ["дим", "манек", "рота"]
let reversedPalindrome = [];
for(let i = 0; i < palindrome.length; i++){
    reversedPalindrome.push(palindrome[i] += palindrome[i].split("").reverse().toSpliced(0, 1).join(""))
}
console.log(reversedPalindrome)
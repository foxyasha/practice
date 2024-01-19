class MyString{
    constructor(string) {
        this.string = string;
    }

    reverse(){
        const splitStr = this.string.split('')
        const reversedArr = splitStr.reverse();
        return reversedArr.join('');
    }
    ucFirst(){
        return this.string[0].toUpperCase() + this.string.slice(1)
    }
    ucWords(){
        const ucWordsStr = this.string.trim().split(" ").map((word) =>{
            return word[0].toUpperCase() + word.slice(1);
        })
        return ucWordsStr.join(' ');
    }

}
const myString = new MyString('hello, world!')
console.log(`Перевернутая строка: ${myString.reverse()}\nПервое слово с заглавной буквы: ${myString.ucFirst()}\nКаждое слово с заглавной буквы: ${myString.ucWords()}`)
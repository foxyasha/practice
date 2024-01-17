let month = Math.floor(Math.random() * 12) + 1
let year = 2024
const season = (month) =>{
    if(month == 12 || month < 3){
        return 'Зима'
    }
    else if (month < 6){
        return 'Весна'
    }
    else if (month < 9){
        return 'Лето'
    }
    else return 'Осень'
}
const leapYear = (year) =>{
    if (year % 4 === 0){
        return 'Високосный год'
    }
    else return 'Не високосный год'
}

console.log(month, season(month), year, leapYear(year))

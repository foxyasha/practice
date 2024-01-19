class Worker {
    #name;
    #surname;
    #rate;
    #days
    constructor(name, surname, rate, days) {
        this.#name = name;
        this.#surname = surname;
        this.#rate = rate;
        this.#days = days;
    }
    getSalary(){
        return this.#rate * this.#days;
    }
    get name(){
        return this.#name;
    }
    get surname(){
        return this.#surname;
    }
    get rate(){
        return this.#rate;
    }
    set rate(newRate){
        this.#rate = newRate
    }
    get days(){
        return this.#days;
    }
    set days(newDays){
        this.#days = newDays
    }
}
const worker = new Worker('Илья', 'Кунтиков', 500, 5)
worker.rate = 15 // используем сеттер, чтобы обновить значение 'rate'
worker.days = 10 // используем сеттер, чтобы обновить значение 'days'
console.log(worker.name, worker.surname, worker.rate, worker.days, "Зарплата:", worker.getSalary())




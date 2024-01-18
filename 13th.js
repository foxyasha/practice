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
    get days(){
        return this.#days;
    }
}
const worker = new Worker('Илья', 'Кунтиков', 500, 5)
console.log(worker.name, worker.surname, worker.rate, worker.days, "Зарплата:", worker.getSalary())




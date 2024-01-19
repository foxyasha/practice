class Calculation{
    constructor() {
        this.calculationLine = "";
    }
    setterCalculationLine(newCalcLine){
        this.calculationLine = newCalcLine
    }

    setLastSymbolCalculationLine(symbol){
        this.calculationLine += symbol;
    }

    getterCalculationLine(){
        return this.calculationLine;
    }

    lastSymbol(){
        return this.calculationLine.charAt(this.calculationLine.length -1)
    }

    deleteLastSymbol(){
        this.calculationLine = this.calculationLine.slice(0, -1)
    }
}
const calculation = new Calculation()
calculation.setterCalculationLine('Hi')
calculation.setLastSymbolCalculationLine('!?')
calculation.deleteLastSymbol();
console.log(`Переменная: ${calculation.getterCalculationLine()}\nПоследний символ: ${calculation.lastSymbol()}`)


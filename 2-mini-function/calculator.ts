/**
 * Let's make a calculator 🧮
 */

type Command = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';
function calculate(
  command: Command,
  firstNum: number,
  secondNum: number
): number {
  switch (command) {
    case 'add':
      return firstNum + secondNum;
    case 'substract':
      return firstNum - secondNum;
    case 'multiply':
      return firstNum * secondNum;
    case 'divide':
      return firstNum / secondNum;
    case 'remainder':
      return firstNum % secondNum;
    default:
      throw Error('unknown command');
  }
}
// * 아래는 함수를 호출하여 올바른 결과 값을 불러오는지 체크
console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 3, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1

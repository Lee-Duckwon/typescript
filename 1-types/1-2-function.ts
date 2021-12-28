{
  // JavaScript 💩

  function jsAdd(num1, num2) {
    return num1 + num2;
    // 어떤 값을 받고 리턴하는 건가?..
    // 만약 문자열이 들어오면 엉뚱한 동작이 될 수도..
  }

  // ? TypeScript ✨
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  // JavaScript 💩
  function jsFetchNum(id: string): Promise<number> {
    // ...
    //  ...
    //   ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // ? TypeScript ✨
  function fetchNum(id: string): Promise<number> {
    // * Promise를 리턴하는데 무언지 모르겠지만 number를 리턴하겠군
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // JavaScript ✨ => TypeScript
  // * Optional parameter
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName); // 없었다면 undefined
  }
  printName('Steve', 'Jobs');
  //
  printName('Ellie'); // ok
  printName('Anna', undefined); // ok

  // * Default parameter
  function printMessage(message: string = 'default message') {
    console.log(message);
  }
  printMessage();

  // Rest parameter
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  }
  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 0));
}

function hello(name?: string) {
  // optional 팔수
  return `hello ${name || 'world'}`;
}

const result = hello();
const result2 = hello('Sam');
const result3 = hello(/* 숫자 금지 */);

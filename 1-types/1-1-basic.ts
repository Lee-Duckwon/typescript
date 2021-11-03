{
  // * number
  const num: number = 5;
  // 마이너스, 소수점 다 가능

  // * string
  const str: string = 'Do';

  // * boolean
  const boal: boolean = true;

  // * undefined
  // 아직 결정 x
  let name: undefined; // x  단독적으로 쓰지는 않는다
  let age: number | undefined;
  age = 5;
  age = undefined;

  // * null
  // 비었다
  let person: null; // 0
  let person2: string | null;

  // 주로 데이터 타입 or undefined
  // 있거나 없거나를 나타낼 때 Null
  function find(): number | undefined {
    return 1;
  }
  // 함수의 반환 number or undefined

  // * unknown
  // 좋지 않음
  let notSure: unknown = 0;
  notSure = 'Do';
  notSure = true;

  // * any
  // 좋지 않음
  let anything: any = 0;
  anything = 'Hello';

  // * void
  // void 생략하는 곳도 있음
  function print(): void {
    console.log('hello');
    return; // 생략
  }
  let unusable: void = undefined; // 💩

  // * never
  // 어떤 에러를 던질 때, -> 리턴이 없는 경우를 명시하기 위해
  function throwError(message: string): never {
    // message -> server (log), or

    throw new Error(message);
    // 에러메시지 출력하는 경우 or

    while (true) {}
    // 계속 돌아가는 경우

    // never가 아닌 경우에는 err가 뜸
  }
  let neverEnding: never; // 💩

  // * objet
  //
  let obj: object; // 💩
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: 'ellie' });
  acceptSomeObject({ animal: 'dog' });
  // 경고 발생 x
  // 모든 오브젝트 타입 가능
  // 구체적이지 못해서 똥
}

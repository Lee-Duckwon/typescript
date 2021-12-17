{
  // Type Inference

  //? 1. 추론
  let text = 'hello';
  // 뻔한 타입 명시 안 해도 에러 x
  // but, text = 1 -> 에러

  function print(msg) {
    // 닷닷닷
    // 인자는 암묵적으로 any를 갖고 있기 때문에 타입을 정해줄래?
    // 어떤 값이든 받을 수 있어서 안 좋아 (any는 쓰지 않는 것이 좋다)
    // * 인자를 msg = 'hello'로 정해주면 스트링. 닷닷닷 사라짐
    console.log(msg);
  }
  print('he');

  //? 2. 함수 리턴값 추론
  function addFunc(x: number, y: number) {
    return x + y;
    // -> 리턴 값은 숫자겠군?! 자동으로 추론
    // -> 원래는 function add(x: number, y: number): number{}
  }
  const result = addFunc(7, 1);
  // * result는 자동으로 const result: number 가 된다

  //  이러한 모든 것이 타입 추론이다.
  //  그러나 좋지 않아 물론 예제에서는 간단하고 단순하니까 좋은 것 같지만 프로젝트에서는 그렇지 않아
  //  다만 원시타입 경우 (let text = 'hello') 같은 경우에는 생략하기도 하지만 명확하게 명시하자 특히 함수 리턴값!
  //* 팀 프로젝트 시에 가독성을 생각해서 일관성 있게 어떠한 경우만 생략 가능한지 미리 정하고 하자
}
// 함수
interface Add {
  (num1: number, num2: number): number;
}
const add: Add = function (x, y) {
  // * 여기서는 왜 타입을 설정 안 해줘도 number라고 뜨는가?? interface에서 num1에 이미 number라고 설정해줬기 때문에
  return x + y;
};

interface IsAdult {
  (age: number): boolean;
}
const isAdult: IsAdult = (age) => {
  return age > 19;
};

// - interface 확장 - // extends
interface Car {
  color: string;
  wheels: number;
}
interface Benz extends Car {
  //Car에 추가로 stop메소드
  stop(): void;
}

const benz: Benz = {
  color: 'red',
  wheels: 5,
  stop() {
    console.log('Audi');
  }
};

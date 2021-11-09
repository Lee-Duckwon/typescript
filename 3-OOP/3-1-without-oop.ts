//* 커피 기계(함수)를 만들면서 학습해 보려고 한다.
//* 우선 절차지향적으로 만들어보자.
//* 그 뒤에 객체지향으로 만들면서 비교하자

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  const BEANS_GRAMM_PER_SHOT: number = 7;
  // * 7을 넣어줬다면 사실 number라고 명시할 필요는 없다
  let coffeeBeans: number = 0;

  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeans < shots * BEANS_GRAMM_PER_SHOT) {
      throw new Error('Not enough coffee beans!');
      // 에러 던져지면 아래 코드는 실행 안 된다. 즉, else 안 해도 된다.
    }
    coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false
    };
  }
  coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT;
  const coffee = makeCoffee(2);
  console.log(coffee);
}

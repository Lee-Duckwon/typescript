//* 커피 기계(함수)를 만들면서 학습해 보려고 한다.
//* 우선 절차 지향적으로 만들어보자.
//* 그 뒤에 객체지향으로 만들면서 비교하자
//* 한 가지 인자를 전달할 수 있다. shot
//* 커피를 한번 내리고 한 번 더 내려서 진하게 만들 수 있다.
//* 얼마나 많은 shot을 포함하는지 전달받는 인자가 있고
//* 커피를 만들어서 리턴한다.
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  //* 한 샷에 얼마나 많은 커피가 필요한지
  const BEANS_GRAMM_PER_SHOT: number = 7;
  //* 7을 넣어줬다면 타입추론을 통해서 사실 number라고 명시할 필요는 없다 - 적어도 상관 x

  let coffeeBeans: number = 0;

  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeans < shots * BEANS_GRAMM_PER_SHOT) {
      //커피콩 충분히 있는지 확인 -> 기계니까
      throw new Error('Not enough coffee beans!');
      // 에러 던져지면 아래 코드는 실행 안 된다. 즉, else 안 해도 된다.
    }
    coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
    // 커피 만든 만큼 커피빈 삭제한다.
    return {
      shots,
      hasMilk: false
    };
  }
  coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT;
  const coffee = makeCoffee(2);
  console.log(coffee);
}

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };
  interface ICoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
  interface CommercialCoffeeMaker {
    // 새로운 interface -> 기능 다양
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMaker3 implements ICoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    static makeMachine(coffeeBeans: number): CoffeeMaker3 {
      return new CoffeeMaker3(coffeeBeans);
    }
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('커피빈은 0보다 커야 합니다.');
      }
      this.coffeeBeans += beans;
    }
    clean() {
      console.log('cleaning the machine...');
    }
    // 1번
    grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`); // 갈아주려면 커피 콩이 충분히 있는지 확인
      if (this.coffeeBeans < shots * CoffeeMaker3.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker3.BEANS_GRAMM_PER_SHOT;
    }
    //2번
    preheat(): void {
      console.log('headting up...');
    }
    //3번
    extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...`);
      return {
        shots,
        hasMilk: false
      };
    }

    //* 추상화는

    makeCoffee(shots: number): CoffeeCup {
      // ! 해당 함수는 interface에 구현되어 있는 함수니까 반드시 class에서도 구현해야 된다.
      // * 변경
      // 1. grindBeans 함수를 만들어서 shots을 넣어서 갈아준다.
      // 2. preheat 함수를 만들어서 데워준다
      // 3. 추출 함수를 만든다
      // 이제 25번줄에 구현해보자.
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  //* class 추가
  class AmateurUser {
    //해당 class는 할 수 있는 기능이 조금 적다.
    constructor(private machine: CoffeeMaker3) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      // 여기서 추가로
      this.machine.fillCoffeeBeans(50);
      //커피콩 추가 가능
      this.machine.clean();
    }
  }
  const maker: CoffeeMaker3 = CoffeeMaker3.makeMachine(50);
  const amateur = new AmateurUser(maker);
  console.log(amateur);

  const pro = new ProBarista(maker);
}

{
  // 다형성을 이용하면 한 가지의 class나 한 가지의 interface를 이용해서
  // 다른 방식으로 구현한 class를 만들 수 있다.
  // 다형성의 장점

  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    // 있을 수도 없을 수도
    hasSugar?: boolean;
    // 있을 수도 없을 수도
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    clean() {
      console.log('cleaning the machine...🧼');
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log('heating up... 🔥');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots... ☕️`);
      return {
        shots,
        hasMilk: false
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
    private steamMilk(): void {
      console.log('Steaming some milk... 🥛');
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    // * 새로 추가 class
    makeCoffee(shots: number): CoffeeCup {
      // 오버라이팅
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        hasSugar: true
        // CoffeeCup에 hasMilk만 있으니까 hasSugar추가
      };
    }
  }

  const machines: CoffeeMaker[] = [
    //* 다형성의 장점 //
    // 해당 배열은 다양한 커피 기계가 있다.
    // 첫 번째 Item으로는 simple한 커피콩...
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, '1'),
    // 시리얼 넘버 보내지 않으면 Error
    new SweetCoffeeMaker(16),
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, '1'),
    new SweetCoffeeMaker(16)
  ];

  //* 다형성 최고의 장점  * //
  // 내부적으로 구현된 다양한 class들이 한 가지 interface를 구현하거나
  // 동일한 부모 class를 상속했을 때 동일한 함수를 어떤 CLASS인지 구분하지 않고 동일한 API를
  // 호출할 수 있다는 것이다
  machines.forEach((machine) => {
    //* machines를 돌면서 각각 머신을 받아오면서 커피를 만들면?
    console.log('-------------------------');
    // 얘는 구분선
    machine.makeCoffee(1);

    //접어서 보았을 때 CoffeeMachine은 CoffeeMaker다. CaffeeLatteMachine도 SweetCoffeeMaker도
    //CoffeeMachine이므로 CoffeeMaker다.
  });
}

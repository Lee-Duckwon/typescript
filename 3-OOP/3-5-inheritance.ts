{
  // animal 클래스에서 makeSound()함수가 있다면 상속 받은 모든 인스턴스가 해당 함수를 사용할 수 있다.
  // 추가 class를 만들려고 하는데 특정 class에서 같은 기능이 많다면 중복 작성보다 상속이 좋을 것이다.
  //
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    //* interface * 구현할 때는 implements
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
      //! 부모 class의 makeCoffee함수
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    // * interface를 구현할 때는  implements,
    // * extends * 다른 class 상속 시
    // * 처음에는 CoffeeMachine이 private이라 상속이 불가능했다. 풀어주면 된다.(public혹은 protected)

    constructor(beans: number, public readonly serialNumber: string) {
      // * 자식 class에서의 constructor를 따로 구현하는 것은
      // * 자식 Class에서 생성자는 반드시 Super를 호출해야 된다.
      // 자식 Class에서 생성자 따로 구현은 부모의 생성자를 호출해야 된다,
      // 생성자는 따로 함수가 아니기 때문에 super()라고 하면 된다.
      // * 부모 class의 생성자에는 coffBeans를 전달해야 한다.
      // 그래서 부모 클래스에서 필요한 데이터를 받아야만 하고 Super를 통해서 전달하는 것이다.
      super(beans);
    }
    private steamMilk(): void {
      console.log('Steaming some milk... 🥛');
    }

    makeCoffee(shots: number): CoffeeCup {
      // * 자식 클래스에서 부모 클래스에 있는 함수를 덮어씌우기 -오버라이트

      const coffee = super.makeCoffee(shots);
      // * super * 이용해서 부모에 있는 함수를 호출하여 기본적인 grind나 heat하는 것을 넣어서
      // * steamMilk 함수 위에 만들어 추가로 사용
      // * 상속을 잘 이용하여 자식 class에 특화되면서 부모 class의 장점을 물려받은 코드 작성 가능
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true
      };
    }
  }

  const machine = new CoffeeMachine(23);
  const latteMachine = new CaffeLatteMachine(23, 'latte는 말이야..');
  //* latteeMachine은 CaffeMachine을 상속했기 때문에 CaffeMachine 메소드 사용 가능
  const coffee = latteMachine.makeCoffee(1);
  console.log(coffee);
  console.log(latteMachine.serialNumber);
}

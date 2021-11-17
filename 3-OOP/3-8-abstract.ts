{
  //상속을 이용할 때 어떤 특정 기능만 자식에서 달라진다면
  //abstract 이용
  // 흐름 : CoffeeMaker라는 interface 존재
  // CoffeeMachine에 최종 부모 클래스 존재
  // 그리고 그것들을 상속하는 2가지 클래스(CaffeLatteMachine, SweetCoffeeMaker)존재
  // 그리고 CoffeeMachine에 있는 많은 함수들 중에 makeCoffee 메소드는 여러 가지 함수를 실행하는데.
  // makeCoffee에서 super가 있는데 만약 자식 클래스에서 super를 호출하지 않는 실수를 한다면?
  // 그냥 원하는 대로 메소드 내부를 만드면?
  // 이런 것들을 안전하게 하기 위해서 abstract 클래스를 만든다

  // 1. CoffeeMahcine 앞에 abstract 키워드를 붙인다.
  // 2. CoffeeMachine은 자체로는 Object를 만들 수 없다.(new CoffeeMachine 하면 빨간 줄이 그어지는 것을 볼 수 있다)abstract 클래스의 인스턴스는 만들 수가 없다.
  // 3. abstract 클래스 자체는 만들어지는 것을 목적으로 하지 않는다.
  // 4. 부모 클래스로써 abstract 클래스로써 필요한 것들을 정의해 놓고 자식 클래스마다 달라질 수 있는 행동이 있다면 그 행동 함수 앞에 abstract 키워드를 붙인다.
  // 5. abstract 을 붙이면 자식 클래스마다 다르게 구현해야 되기 때문에 즉, 접근을 해야 되기 때문에 private 쓸 수 없고 protected를 abstract 앞에 써준다.
  // 6. 추상적인 메소드이기 때문에 내부 기능을 쓸 수 없다. 그냥 이름 껍데기만 적어준다.
  // 7. abstract를 붙인 함수는 추상적인 함수기 때문에 구현하는 클래스에서 따로 구현해 줘야 한다.
  // 8. 자식 클래스에서 protected 함수(인자: 타입): 타입 를 그냥 동일하게 적어주고 내부를 구현한다.
  // 9. super 부르지 않아도 되고 추상메소드만 구현하면 되는 것이다.
  // 10. CoffeeMachine은 추상 클래스이기 때문에 항상 구현한 클래스만 만들 수 있다.

  // abstract 클래스로 만들어진 클래스는 이 자체는 Object를 생성할 수 없는 추상적 클래스가 된다.
  // 공통적인 기능이 있다면 기능을 다 구현할 수 있고 구현하는 클래스마다 달라져야 하는 내용이 있다면 그 부분만 abstract 메소드로 정의할 수 있다.
  // interface에서 함수 규격을 정의한 것처럼 abstract 메소드에서는 함수 이름이 무엇인지, 어떤 인자를 받아서 어떤 것을 리턴하는지 정의할 수 있다.
  // 공통적으로 쓰이는 기능은 내부적으로만 쓰인느 것은 private 외부에서 호출할 수 있는 것은 public 가능
  // 구현하는 클래스마다 달라져야 하는 abstract 함수만 구현하는 곳에서 코드를 작성하면 된다.
  // 만약 abstract 클래스를 상속하면서 구현하지 않으면 에러가 뜬다.

  // '야 이거 꼭 구현해! 다르게!'
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
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

    protected abstract extract(shots: number): CoffeeCup;

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

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true
      };
    }
  }

  const machines: CoffeeMaker[] = [
    new CaffeLatteMachine(16, '1'),
    new SweetCoffeeMaker(16),
    new CaffeLatteMachine(16, '1'),
    new SweetCoffeeMaker(16)
  ];
  machines.forEach((machine) => {
    console.log('-------------------------');
    machine.makeCoffee(1);
  });
}

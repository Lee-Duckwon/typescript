{
  // public, private, protected

  // 앞서 작성한 것의 문제점은 무엇일까?
  // 바로 제한사항이 없다는 것이다 외부에서 마이너스 값이 들어오면?
  // 외부에서 보이면 안 되는 설정하면 안 되는 것을 encapsulation 이용하여 가려보자
  //* public 작성 안 하면 public
  //* private 외부에서 볼 수 없고 접근할 수 없어
  //* protected 상속을 할 때 외부에서 접근할 수 없지만 상속받은 자식 클래스는 접근 가능
  // 3가지를 사용하자

  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    //* private
    //static BEANS_GRAMM_PER_SHOT: number = 7;
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;
    //protected coffeeBeans는 외부에서 접근 불가능하지만 상속받은 자식은 가능
    // 두 가지 외부에서 변경할 수 없도록 가린다.
    // 내부 상태를 private 하게 바꾼 것이다.

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      // 보통 이렇게 생성 함수에 static을 붙이는 것은 누군가가 생성자를 이용해서 생성하는 것을
      // 금지하기 때문에 constructor를 private하게 만들어서 항상 static함수를 이용하게끔 한다.
      // 즉, makeMachine을 사용해서 생성하게끔 만드는 것이다.
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      //얼마나 많은 커피빈을 추가할 것인지 인자로 받는다.
      //이제는 함수를 통해서 받는다.
      // fillCoffeeBeans를 통해서 내부의 beans를 변경한다
      // 원래는 외부에서 바로바로 값을 변경하는 안 좋은 코드였다.
      // 함수를 이용하기 때문에 전달받는 인자를 검사하기 때문에 안정성 높은 코드가 된다.
      // 해당 함수에는 누가 봐도 public이니까 굳이 작성 X
      if (beans < 0) {
        //0보다 작으면 안 되니까
        throw new Error('커피빈은 0보다 커야 합니다.');
      }
      this.coffeeBeans += beans;
      // 정상적인 경우 추가해 준다.
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;

      return {
        shots,
        hasMilk: false
      };
    }
  }
  //public일 때 CoffeeMaker.BEANS_GRAMM_PER_SHOT 하면 바로 뜬다. (캡쳐 필요)
  //private로 하면 안 보인다.

  const maker = CoffeeMaker.makeMachine(30);

  maker.fillCoffeeBeans(50);
  //maker.coffeeBeans = 30 이런 것이 더 이상 불가능하다.
}

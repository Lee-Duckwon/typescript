{
  // instance level
  // vs
  // class level
  // (static)
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    // * static //
    static BEANS_GRAMM_PER_SHOT: number = 7;
    // 클래스에 정의된 아이
    // 클래스에서 한번 정의되어짐
    // 오브젝트 만들 때마다 중복적 생성
    // --> static이라는 키워드를 붙이면 instance level로 바뀐다.
    // 클래스 레벨에서 함께 공유 될 수 있는 거라면 static을 이용 가능 메모리 낭비 방지
    // 붙이지 않으면 instance level
    //class 레벨은 클래스와 연결되어져있어서 오브젝트마다 만들어지거나 생성되어지지 않는다.
    // * 또한 static이 붙으면서 this를 쓰지않는다. class 자체에 연결되어 있는 것이기 때문에
    // 대신 클래스 이름을 지정한다 여기서는 CoffeeMaker가 될 것이다.
    // -> CoffeeMaker.BEANS_GRAMM_PER_SHOT
    // 즉,  const maker = new CoffeeMaker(50); 하고 maker를 콘솔 찍으면
    // 더이상 BEANS_GRAMM_PER_SHOT은 없고 { coffeeBeans: 50 }만 나온다.
    // 다시말해서 오브젝트마다 만들어져야 하는 것 === new CoffeeMaker를 새로운 변수에 했을 때
    // 새롭게 계속 할당되어져야하는 상황이라면 Instance level로 둔다.
    // static은 맴버 변수뿐만 아니라, 함수에서 도적용된다.
    // 물론 그 함수를 사용하려면 const newMaker = CoffeeMaker.특정함수 이렇게 사용해야할 것이다.

    coffeeBeans: number = 0;
    constructor(beans: number) {
      // constructor는 class를 가지고 오브젝트 인스턴스를 만들 때 항상 호출되는 함수
      this.coffeeBeans = beans;
      // new CoffeeMaker(50) 하면 50 들어간다.

      // this로 가리키지 않으면  만약 beans가 아니라 coffeeBeans라고 했을 때
      // 들어오는 인자를 this.coffeeBeans라고 못 읽게 됨
      //* 즉, 같은 이름을 해도 this 붙은 것과 안 붙은 것은 굉장히 다른 차이
    }
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        // static이기 때문에 이름을 넣는다. this 대신
        // 클래스 안에 있는 것이 아니라 클래스 자체에 있기 때문에 클래스 이름을 지정
        // * class 안에 있는 변수에 접근하려면 this닷 필수
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;

      return {
        shots,
        hasMilk: false
      };
    }
  }
  //class는 청사진을 만드는 기계
  const maker = new CoffeeMaker(50);
  //하면 50개가 들어간 상태로 사용 가능
  //* new 새로운 인스턴스를 만들 때 사용
  console.log(maker);

  // static 없애면 만들어진 오브젝트 안에서 호출 가능
}

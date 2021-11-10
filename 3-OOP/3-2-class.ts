{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    static BEANS_GRAMM_PER_SHOT: number = 7;
    //클래스에 정의된 아이
    // 클래스에서 한번 정의되어짐
    // 오브젝트 만들 때마다 중복적 생성
    // --> static이라는 키워드를 분ㅌ이면 instance level로 바뀐다.
    // 클래스 레벨에서 함께 공유 될 수 있는 거라면 static을 이용 가능

    //맴버 변수뿐만 아니라, 함수에서 적용된다.

    coffeeBeans: number = 0;
    constructor(beans: number) {
      // class를 가지고 오브젝트 인스턴스를 만들 때 항상 호출되는 함수
      this.coffeeBeans = beans;

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

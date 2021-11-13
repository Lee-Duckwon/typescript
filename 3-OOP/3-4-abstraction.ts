{
  // 외부에서 class를 바라보았을 때 너무 복잡하다면
  // 필요한 인터페이스만 노출하면서 사용하기 쉽게 만들 수 있다.
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  //* 나랑 의사소통하려면 이런 이런 규약을 갖고 있다는 계약서 같은 아이
  interface ICoffeeMaker {
    // interface에서는 변수명 맨 앞에 I를 붙이는 경우도 있고 class에 Impl을 끝에 붙이는 경우도 있다

    makeCoffee(shots: number): CoffeeCup;
  }
  // -----   //
  class CoffeeMaker2 implements ICoffeeMaker {
    // interface 구현했으니까 이 class는 interface 규격을 따라가는 class다.
    // 저 Interface를 구현하는 아이다.
    // CoffeeMaker2는 interface를 구현하는 아이다.
    //그래서 인터페이스 구현하는 class에서는 interface에서 규약 된 모든 함수를 구현해야 한다.
    // 안 하면 class에서 에러가 뜬다.
    // interface를 이용하면 추상화를 극대화해서 사용할 수 있다.
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }
    static makeMachine(coffeeBeans: number): CoffeeMaker2 {
      return new CoffeeMaker2(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('커피빈은 0보다 커야 합니다.');
      }
      this.coffeeBeans += beans;
    }
    // 1번
    grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`); // 갈아주려면 커피 콩이 충분히 있는지 확인
      if (this.coffeeBeans < shots * CoffeeMaker2.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker2.BEANS_GRAMM_PER_SHOT;
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
  //const maker = CoffeeMaker2.makeMachine(50);
  // 캡쳐필요 -> maker. 쳤을 때 추천으로 막 뜬다.
  // 어떤 것이 먼저 해야 하나? 사용자가 헷갈리 수도 있다. 이럴 때 추상화가 빛을 발한다.
  // 어떻게 추상화? -> 정보 은닉을 통해서 ?
  // 나는 사용자가 커피를 만들 때 makerCoffee만 호출하게 하고 싶어. 깔끔하게
  // 그러면 다른 함수들에게 너희는 나오면 안 돼"라면서 다른 함수들 앞에 private을 붙여준다.
  // maker.하면 내가 커피콩 추가, 커피만드는 2개의 함수만 존재하게 된다 추상화 -> 방법을 간단하게 만드는 것

  // maker.makeCoffee(10);

  const maker: CoffeeMaker2 = CoffeeMaker2.makeMachine(50);
  // maker는 타입은 CoffeeMaker2ㄹ가 될 수 있다
  maker.fillCoffeeBeans(30);
  maker.makeCoffee(10);

  const maker2: ICoffeeMaker = CoffeeMaker2.makeMachine(50);
  // CoffeeMaker2는 ICoffeeMaker의 Interface를 구현하는 아이기 때문에
  // CoffeeMaker2는 ICoffeeMaker와 동일하다?.....? 하지만 ICoffeeMaker 안에는
  // makerCoffee라는 함수밖에 없기 때문에 커피콩을 채우는 API fillCoffeeBeans는
  // ICofeeMaker interface에 존재하지 않아서 빨간 줄이 뜬다. (캡쳐 필요)
  //! maker2.fillCoffeeBeans(30);
  maker2.makeCoffee(10);
  //interface 이용하면 내가 얼만큼의 행동을 약속할 것이지 허용할 것인지를 결정할 수 있다.
}

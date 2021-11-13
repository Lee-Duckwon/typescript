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
// Getter와 Setter에 대해서 알아보기 위해 아래 객체를 하나 더 만들었다.
// Getter Setter는 일반 변수처럼 사용이 가능하지만, 어떤 계산을 해야 할 때 유용하게 사용 할 수 있다.
{
  class User {
    firstName: string;
    lastName: string;
    fullName: string;
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = `${firstName} ${lastName}`;
    }
    private internalAge = 4;
    // 특정 변수(internalAge)를 프라이빗하게 두고 게터와 세터를 이용하여 변경한다.

    get age(): number {
      return this.internalAge;
    }
    // 외부에서 바로 User.internalAge = 10이런식으로 변경 할 수 없게 하고
    // User.age = 10; 이런식으로 변경하게 유도하는 것이다.
    // 지금 작성한 것은 굉장히 단순해서 필요성이 약해보이지만
    // getter setter를 이용하면 다양한 연산을 할 수 있다.
    // 또한, setter 안에서 유효성검사를 해서 올바른 number가 들어오는지 체크할 수 있다.
    set age(num: number) {
      this.internalAge = num;
    }
  } // ? 클래스 끝
  const user = new User('Steve', 'Jobs');
  console.log(user);
  // 여기까지 작성하면 아래처럼 잘 뜬다.
  // User { firstName: 'Steve', lastName: 'Jobs', fullName: 'Steve Jobs' }

  // 그런데 여기서 firstName을 바꾸고 싶다.
  user.firstName = 'Choi';
  console.log(user);
  // console.log(user); 하면?
  //* 똑같이 스티브 잡스가 뜬다.
  // 이것은 한 번 할당되면 계속 지정되기 때문이다.
  // 이럴 때 Getter가 유용하다

  //* fullName: string을 ->
  //*  get fullName(): string {
  //*    return `${firstName} ${lastName}`;
  //*  }
  //로 작성해준다. 그리고 접근할 때는 똑같이 접근한다(함수형태로 접근하지 않는다)

  //!여기서 외부에서 변경 불가능하게 하려면 private을 준다
  /* // * 아래 두개는 같은 코드로 볼 수 있다. 하지만 후자가 훨씬 간결하다.
  class User {
    private firstName: string;
    private lastName: string;
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    constructor(private firstName: string, private lastName: string) {
    }
  }*/
}

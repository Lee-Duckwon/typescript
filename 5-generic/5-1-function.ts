{
  //* 함수 제네릭 !!
  // 아이템이 Null인지 아닌지 체크하는 함수를 만들어보자
  function checkNotNullBad(arg: number | null): number {
    // 숫자나 null을 인자로 받고 null이 아닌 경우에는 해당 숫자를 리턴한다.
    if (arg === null) {
      throw new Error('not valid number');
    } else {
      return arg;
    }
  }
  const result = checkNotNullBad(0);
  console.log(result); // -> 123
  checkNotNullBad(null); // -> not valid number
  // 위와 같이 함수를 만들어보았다.
  //* 하지만 이런 함수의 경우 유용할 수 있다. 타입을 알 수 없는 라이브러리에서 예를 들어, 쿼리 샐릭터가 요소가 리턴될 수도, null이 리턴 될 수도 있는데
  // 해당 함수는 숫자만 확인할 수 있는데 그렇다면 타입별로 다 만들어줘야 한다..? 너무 안좋은 짓이다..

  // * 1. 아무 타입 다 가능하면 any를 써볼까?
  function checkNotNullAnyBad(arg: any | null): any {
    if (arg === null) {
      throw new Error('not valid number');
    } else {
      return arg;
    }
    // const result = checkNotNullAnyBad(000)
    // 타입이 보장이 되지 않는다. 만약 숫자를 전달해서 숫자가 null이 아니라면 any가 리턴 되기 때문에 result는 any가 된다
    // 그렇다면 result는 타입이 정해져있지 않는다. 그리고 any는 광범위이기 때문에 좋지 않다.
  }
  // * 2. 이럴 때 제네릭을 이용한다.
  // 어떤 타입이든 받을 수 있고 코딩을 할 때 이것을 쓸 때, 타입이 결정되기 때문에 타입을 보장받을 수 있다.
  function checkNotNull<GENERIC>(arg: GENERIC | null): GENERIC {
    // 인자는 제네릭이다! 이름은 그냥 지은 것 -> 무엇인지 모르지만 GENERIC이라는 타입이 있으며 그것을 받고 리턴한다.
    // * 보통 길게쓰지않고 'T' 라고 작성한다.
    if (arg === null) {
      throw new Error('not valid number');
    } else {
      return arg;
    }
  }
  const number = checkNotNull(123); // * 이렇게 쓰지마자 GENERIC은 123 으로 바뀐다.
  console.log(number); // -> 123
  const boal = checkNotNull(true); // 이렇게 하면 true 타입이기 때문에 받을 때 , // * const boal: boolean 으로 작성해준다.
}

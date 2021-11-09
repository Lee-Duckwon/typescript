{
  // 타입을 확인할 때 강요하는 경우가 있다.
  // 이런 타입 어설션은 좋은 코딩은 아니다.
  // * Type Assertions
  // 많이 이용하고 있다면 피할 수 있는 방법을 고민하자

  // 불가피하게 써야하는 상황 -> 자바스크립트에서 내부적으로 항상 문자열을 리턴하는 함수가 있다면
  function jsStrFunc(): any {
    return 'string';
  }
  const result = jsStrFunc();
  // result의 길이를 알고 싶어.
  // 그러나 타입스크립트는 result가 현재 any 타입이라서 문자열과 관련된 api 즉, length를 쓸 수 없어
  //* result라는 변수는 분명히 String타입이라는 것을 알고 있어

  result as string; // -> "result 라는 변수는 분명히 string타입이라는 것을 알고있어서 문자열처럼 사용할게 " 그로인해 관련된 api 사용가능 // 완전 장담할게 라는 뜻
  // 타입 캐스팅
  //* <string>result.length === result as string
  // (result as string).length
  // 그러나 위와 같이 장담을 했는데도 return 값이 숫자라면?
  // 작성하는 도중에는 숫자가 적혀도 빨간줄 에러가 뜨지 않는다.
  // 콘솔을 찍으면? -> undefined // 어플리케이션이 죽거나 하지는 않지만 // 실시간 예상치 못한 문제가 발생할 수 있음
  // ? 내가 정말 정말 정말 100% 장담할 수 있을 때만 사용하자!!!

  //   -----------------------------    //

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers();
  // 이상태로 numbers.push(1) 하면 에러뜬다.
  // undefined일수도 있기 때문에 (=== ? number)
  //* 하지만 확신한다 배열일 것을
  //* 그렇다면 numbers!.push(1) 혹은 function findNumbers()!: number[] | undefined
  // but 너무 장담해버리면 어플 죽을 수도 있다.
}

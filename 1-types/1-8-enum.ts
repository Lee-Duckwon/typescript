{
  // * enum 상수 묶음 정의
  // 자바스크립트는 그런 타입이 없다.

  // 고정값
  const MAX_NUMBER = 10;
  const MAX_STUDENTS_PER_CLASS = 20;
  //각각 독립적인 상수를 정의할 수 있지만
  const MON = 0;
  const TUE = 1;
  // 자바스크립트는 이런 것들을 묶을 수 있는 타입이 존재하지 않는다.
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  DAYS_ENUM.MONDAY;
  // 하나 선택 가능
  // 여러가지 상수 값들을 한 곳에 모아서 타입이 보장되고 값이 변화되지 않아서 타입이 안정한 ENUM

  // * enum에서는 앞만 대문자
  // * enum에 값을 정하지 않으면 자동으로 0부터 ~
  enum Days {
    Monday, //0
    Tuesday, //1
    Wednesday, //2
    Thursday,
    Friday,
    Satarday,
    Sunday
  }
  // * 1부터 시작하고 싶으면
  // Monday = 1, 이렇게 정해주면 된다
  // * 문자열도 할당 가능 대신 수동적으로 하나하나 다 할당해야함
  console.log(Days.Tuesday);
  const day = Days.Monday;
  //?  타입스크립트에서 enum은 안 쓰는 것이 좋다.
  //?	day는 const day: Days 이렇게 할 수도 있는데
  //? enum으로 타입이 지정된 변수에 다른 어떤 숫자도 할당할 수 있다는 것이 문제다
  //? day: Days = Days.Friday; 를 해도, day = 10; 을 해도 컴파일 에러가 발생하지 않는다
  //? 즉, enum을 쓰면 타입이 정확하게 보장되지 않는다.
  //? 상수들을 묶을 수 있는 방법이 enum밖에 없다면 쓸수밖에없지만 타입스크립트에서는 enum보다는

  //! --- union타입을 활용한다. ---//
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';
  //* enum을 썼을 때는 보장되지 않으나
  let dayOfweek: DaysOfWeek = 'Monday'; // * 로 줬을 때
  dayOfweek = 'Tuesday'; //* 미리 지정한 애들만 줄 수 있다.
}

import { ENUM } from 'sequelize/types';

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
}

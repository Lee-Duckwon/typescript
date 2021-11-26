{
  //* condition 타입
  //* 어떤 타입이 '이러한' 타입이라면 '이것'을 써야지 이런식으로 조건적으로 결정할 수 있는 타입이다.

  type Check<T> = T extends string ? boolean : number;
  // Check타입이라는 것은 자유롭게 타입을 받고 만약 주어진 타입이 string을 상속한면
  // boolean타입으로 결정을 하고 아니면 number 타입으로 결정을 한다.
  type Type = Check<string>;
  // Type이라는 타입은 Check타입을 이용해서 string을 전달.
  // -> 그러면 Check에는 string 타입이 전달되어서 boolean이 된다.

  // 이처럼, 특정 조건이 맞으면 '이렇게'한다 라고 할 수 있다.

  type TypeName<T> = T extends string
    ? // TypeName이라는 타입은 전달 되는 타입이 String을 상속하면 string을
      'string'
    : T extends number // 숫자를 상속한다면 숫자를 쓴다.
    ? 'number'
    : T extends boolean
    ? 'boolean'
    : T extends undefined
    ? 'undefined'
    : T extends Function
    ? 'function'
    : 'object';

  type T0 = TypeName<string>;
  // 만약 위와같이 전달한다면 T0은 문자열타입
  ('string');

  type T1 = TypeName<'a'>;
  // 만약 위와같이 전달한다면 T1도 문자열타입
  ('string');

  type T2 = TypeName<() => void>;
  // 만약 위와같이 전달한다면 인자를 아무것도 받지않고 아무것도 리턴하지 않는 함수니까 function
  ('function');
}

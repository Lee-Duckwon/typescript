// * either :  a or b
/*interface Either {
  left: () => number;
  right: () => number;
}
*/
interface Either<L, R> {
  // 타입을 위처럼 미리 정하지 않는다. 같은 타입일 수도 다른 타입일 수도 있기 때문에
  // 유연한 클래스를 만들 수 있다.
  // 제네릭은 보통 대문자 하나만 쓴다.
  left: () => L;
  right: () => R;
}

class SimpleEither<L, R> implements Either<L, R> {
  constructor(private leftValue: L, private rightValue: R) {}
  left(): L {
    return this.leftValue;
  }

  right(): R {
    return this.rightValue;
  }
}
const either: Either<number, number> = new SimpleEither(4, 5);
either.left(); // 4
either.right(); //5
const best = new SimpleEither({ name: 'ellie' }, 'hello'); // * object도 가능하다.
//const best = new SimpleEither(4, 'hello'); 를 넣어도 되고..

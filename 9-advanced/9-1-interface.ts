{
  type PositionType = {
    //* type 정의 :
    // 어떤 데이터를 담을 때 어떠한 데이터를 담을 수 있을지 타입을 결정하는 것
    // 만약 아래와 같은 코드가 있다면

    /*
    interface Position {
      x: number;
      y: number;
    }
    const pos: Position = {x: 0, y: 0};
    printPosition(pos);
    */

    //  position은 어떠한 데이터를 담고있는 것을 묘사하고있다.
    // 이런 경우에는 interface보다는 type이 정확하다.
    // position을 구현하는 어떠한 클래스가 있나? 라고 생각하게 된다.
    // 어떠한 것을 구현할 목적이 아니라 데이터를 담을 목적이라면 interface < type
    x: number;
    y: number;
  };
  interface PositionInterface {
    //* interface 정의 :
    // 어떤 것의 규격사항으로 의사소통할 때 오브젝트와 오브젝트 간의 의사소통을 할 때
    // 정해진 interface를 토대로해서 서로 상호작용을 할 수 있게 해주는 것
    // API 계약서와 같다.
    // interface는 동일 규격사항을 따라간다.
    //* 이런 경유 타입을 쓰지 않는 것이 좋다.
    // 어떤 특정한 규격을 정하거나 이런 규격을 통해 어떤 것이 구현된다면 interface를 쓰는 것이 더 좋다. > type보다
    //
    x: number;
    y: number;
  }
  interface PositionInterface {
    z: number;
  }

  // 둘 다 object ★/
  const obj1: PositionType = {
    x: 1,
    y: 1
  };
  const obj2: PositionInterface = {
    x: 1,
    y: 1,
    z: 1
  };

  // class ★
  class Pos1 implements PositionType {
    x: number;
    y: number;
  }
  class Pos2 implements PositionInterface {
    x: number;
    y: number;
    z: number;
  }

  // Extends 학장
  interface ZPositionInterface extends PositionInterface {
    z: number;
  }
  type ZPositionType = PositionType & { z: number };

  // 😆 only interfaces can be merged.
  interface PositionInterface {
    z: number;
  }

  // type PositionType {
  // }

  // 😆 Type aliases can use computed properties
  type Person = {
    name: string;
    age: number;
  };
  type Name = Person['name']; // string

  type NumberType = number;
  type Direction = 'left' | 'right';
}

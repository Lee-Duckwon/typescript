{
  // * Type alias는 말 그대로 새로운 타입을 정의하는 것이다.

  type Text = string;
  const name: Text = 'ellie'; //문자열만 가능

  type Num = number;
  type Student = {
    name: string;
    age: number;
  };

  // 오브젝트 타입에도 지정할 수 있다.
  const student: Student = {
    name: 'Duck',
    age: 9
  };

  //  * String Literal Types
  type Name = 'name';
  let duckName: Name;
  duckName = 'name';
  // 다른 문자 넣을 수 없다.

  type JSON = 'json';
  const json: JSON = 'json';

  type love = true;
  // const isLove: love = false;  ->  Error
}

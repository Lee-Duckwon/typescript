{
  // Type aliase 는 말 그대로 새로운 타입을 정의

  type Text = string;
  const name: Text = 'ellie';
  //문자열만
  type Num = number;
  type Student = {
    name: string;
    age: number;
  };
  const student: Student = {
    name: 'Duck',
    age: 9
  };

  //  * String Literal Types
  type Name = 'name';
  let duckName: Name;
  duckName = 'name';
  type JSON = 'json';
  const json: JSON = 'json';
}

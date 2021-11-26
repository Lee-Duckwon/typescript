{
  //* index타입 //
  const obj = {
    name: 'Tania'
  };
  // Tania에 접근하려면 obj.name이나 obj['name']으로 접근하면 된다.
  // 이것처럼 타입도 인덱스를 기반으로해서 타입을 정할 수 있다.
  // 만약 아래와 같은 타입이 있을 때

  type Animal = {
    name: string;
    age: number;
    gender: 'male' | 'female';
  };
  type Name = Animal['name'];
  //* Name은 Animal에있는 name이라는 키의 값의 타입을 사용할 것이다. 즉, string과 같다.
  const text: Name = 'SOLID'; //문자열만 가능

  type Gender = Animal['gender']; // ?? 그럼 타입은 뭘까 바로 'male | 'female'

  type keys = keyof Animal; // Animal에 있는 키를 타입으로 'name' | 'age' | 'gender'가 된다.
  const key: keys = 'age'; //?? 다른 문자열은 안 돼 !!

  type Person = {
    name: string;
    gender: Animal['gender'];
  };
  const person: Person = {
    name: 'Tania',
    gender: 'female' // male혹은 female만 가능
  };
}

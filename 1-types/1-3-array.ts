{
  // * Array
  const emotions: string[] = ['😍', '😭'];
  const emotions2: number[] = [3, 5];
  const emotions3: Array<string> = ['😍', '😭'];
  function printArray(emotions: readonly string[]) {
    // readonly -> 변경 불가 . 불변성 보장
    // emtions.push 등 X
  }

  // * Tuple
  // 하나의 타입만 가능
  // 사용 권장 x -> index 접근은 안 좋은 코드 습관임
  // Tuple 대신에 클래스 형식 등으로 명시해서 접근하자
  // type alias, interface, class로 대체하자
  let couple: [string, number];
  couple = ['love', 77];
  couple[0];
  couple[1];
  const [love, number] = couple;
  // 이렇게 하면 좀 더 명확하다. 그래도 여전히 불편함
  // Tuple에서 받는 모습이 useState와 비슷하다.
  // 동적으로 return하는데 동적으로 다른 타입 데이터를 묶어서 사용자가 이름을 정해서 사용할 경우만 유용
  // 다른 경우는 interface나 type alias, class를 사용할 수 있는 경우에는 Tuple을 사용하지 말자
}

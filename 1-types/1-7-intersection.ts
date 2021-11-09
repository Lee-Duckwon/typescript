{
  // union은 발생할 수 있는 아이들 모두
  // intersection은 모든 것을 다 합한
  // union은 or
  // intersection은 and

  // 다양한 타입들을 하나로 묶어서 선언할 수 있다.
  type Student = {
    name: string;
    age: number;
  };

  type Worker = {
    employeeId: number;
    work: () => void;
  };

  function internWork(person: Student & Worker) {
    console.log(person.name, person.employeeId, person.age, person.work());
  }

  internWork({
    name: 'Deeo',
    age: 15,
    employeeId: 555,
    work: () => {
      console.log('hi');
    }
  });
}

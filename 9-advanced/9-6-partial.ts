{
  //partial이라는 타입은 기존 타입중에서 부분적인 것만 허용하고 싶을 때 사용한다.
  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    // ToDo의 partial타입
    // ToDo 엉뚱한 key와 value를 전달할 수 없다.
    // ToDo 타입에 있는 것들 중에서 부분적인 아이들만 받을 수 있다.

    //  새로운 Todo를 리턴한다
    return {
      ...todo,
      ...fieldsToUpdate
      //* 들어오는 객체를 스프레드로 복사 및 덮어씌우기
    };
  }
  const todo: ToDo = {
    title: 'SOLID',
    description: 'MyNickname',
    label: 'study',
    priority: 'high'
  };
  const updatedItem = updateTodo(todo, { priority: 'low' });
  console.log(updatedItem);
  // ToDo 데이터 유지하면서 priority만 변경된다.
}

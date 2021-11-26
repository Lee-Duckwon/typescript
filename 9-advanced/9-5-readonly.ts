{
  //* 읽을 수만 있는 타입
  type ToDo = {
    title: string;
    description: string;
  };
  function display(todo: ToDo) {
    // *전달된 ToDo 아이템을 받아와서 보여주기만 하는 함수
    // *만약 todo.title = 'Ring' 이런식으로 개발자가 수정을 해버린다면?
    // *가변성에 의한 수정가능 타입을 전달하는 것은 좋지 못하다고 한다.
    // *이럴때 readonly를 쓴다.
    // ? 우리가 흔히쓰는 타입은 유틸리티 타입이라고 해서 어지간한 타입들은 만들어져있다
    // ? 그래서 우리는 ToDo를  ->  Readonly<ToDo>로 바꿔준다.
    // ? todo.title = 'Ring'하면 에러가 뜨고 command로 들어가면
    // ? 사용 가능한 모든 유틸리티 클래스를 볼 수 있다.
    // ? 옵셔널 타입도 있고 옵셔널의 반대로 마이너스가 붙은 것(절대로 있어야하는 타입)도 볼 수 있다.
  }
}

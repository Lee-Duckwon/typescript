{
  type Video = {
    title: string;
    author: string;
  };
  // * title과 author가 있어도 되고 없어도 되는 타입을 만들고 싶다면?
  // 아래와 같이 추가를 한다면..
  type VideoOptional = {
    title?: string;
    author?: string;
  };
  // 만약 이 상태에서 Video오 뭔가를 추가해야 한다면 VideoOptional에도 추가해야된다.
  // 이럴때 간편하게 재사용성을 높이는 방법이 map타입이다.
  type Optional<T> = {
    //받아오는 그 어떠한 타입을 이용해서 재사용(map)을 한다
    // 1. index 괄호를 이용? for...in 오브젝트에있는 키를 하나씩 돌기 때문에
    [P in keyof T]?: T[P];
    // P라는 것은 T타입에 모든 key들 중 하나다. T가 가지고있는 key들 중에 들어있는 하나의 P라는 어떠한 key는 프로퍼티는
    // T오브젝트 안에있는 Key값을 이용해서 value의 타입을 정의
    // 추가로 옵셔널을 준다면 '있어도 되고 없어도 되는' 이 된다
    // 2. key를 하나씩 돈다.

    // 정리 -> Type Object 정의 안에서 이렇게 배열과 같은 것을 이용하면 key를 돌 수 있다.
    // T 타입에있는 key를 순차적으로 돌고 옵셔널을 넣었으니 옵셔널이 된다.

    //만약 Readonly를 배열 앞에 적으면 나중에 값을 입력하고 직접적으로 바꾸려고 할 때 불가능하다.
  };
  //써보려면
  type OptionalVideo = Optional<Video>;
  //우리가 정의한 Optional을 이용할 건데, Optional에 전달된 Video는
  // 1. Video의 key들을 빙글빙글 돌면서 Title은 옵셔널로 만들고 Title의 value의 타입은 string이다!
  // 즉 [P in keyof T]? -> Title은 옵셔널
  //   : T[P]; -> string 타입
  // 다음 key인 author의 key와 그걸 옵셔널로 만들고 author의 타입은 string..
  // 이걸 이용하려면
  const videoOp: OptionalVideo = {
    //여기에는 아무것도 없어도 된다. 다옵셔널이니까
    // 만약 OptionalVideo에 없던 다른 종류의 타입을 넣으면 에러가 뜬다.
    // map타입을 이용하면 '재사용성'이 높아진다.
  };

  //! ----------------------------------------------------- //
  //! 복습

  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };

  //이것을 보고 Nullable은 어떤 타입일까?
  // 1. 기존에 주어진 T타입 key를 빙글빙글 돌면서 기존의 value의 '타입'을 쓰거나 null이 가능하도록 만드는 타입이다.

  const obj2: Nullable<Video> = {
    title: null,
    author: null
    // string이 아닌 null이라고 할지라도 에러가 안 뜬다.
  };

  //! ----------------------------------------------------- //
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };
  type Proxify<T> = {
    //* Proxify라는 타입은 전달 되는 어떤 object를 돌면서 type을 proxy라는 타입으로 한단계 감싼다
    // map 타입을 이용하면 기존의 타입에서 조금 다른 형태로 변환하는 것이 가능하다..
    [P in keyof T]: Proxy<T[P]>;
  };
}

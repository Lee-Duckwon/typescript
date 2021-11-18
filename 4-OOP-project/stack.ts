// stack을 Array를 쓰지 않고 구현해보자
// *단일 연결 리스트로 Stack 구현하기
// 배열을 이용해서 Stack을 구현하면 push pop 메소드를 사용하여 굉장히 쉽게 할 수 있다. 그런데 이런 것을 이용하지 않고 구현하는 것이다.
// 연결 List -> 연결되어있는 목록 -> 첫 번째에 있는 숫자 1을 노드라고 하고 해당 노드는 다음 숫자 2를 가리키고 2는 3을 가리킨다..
// 단일 연결 리스트 -> Head(1)이 2를 잘 가리키고 있으면 모두 잘 연결되어 있으며 한 방향으로 쭉쭉 이어져있다.
// 이중 연결 리스트 -> 추가로 반대로 3이 2를 가리키고 2가 1을 또 가리키고 있는 것이다.
// 구현하려고 하는 stack에는 단일 연결 리스트만 있으면 된다.
// 만약 1을 넣으면 연결 리스트에는 Head 포인터가 (1)을 가리킨다.
// 2를 추가로 넣게 되면 2는 1을 가리키고 Head는 2가 된다.
// POP 메소드를 하면 Head가 가리키는 노드(현재 2)를 찾아서 그 노드가 가리키고있는 이전의 노드를 Head가 가리키도록 변경 시키면 된다.
// 그렇다면 2는 자연스럽게 무시가 되어지고. 즉, 다시 POP을 하게 되면 Head가 가리키고있는 1번 이면서 1번의 이전 노드는 없으므로 없는 null을 Head가 가리키도록 만든다.
// Head는 null을 가리키기 때문에 stack은 비어져있다. 숫자들은 있긴 있다. 그러나 아무도 참조하지 않으므로 이 아이들은 자연스럽게 무시가 된다.
// 단일 연결 리스트로 Stack을 구현하는 것이다.

//
interface Stack {
  //stack사용하는 누군가가 전혀 몰라도 되고 그냥 interface만 쓰면 된다.
  //얼마나 다양한 클래스가 있는지 상관하지 않고 Interface를 통해 의사소통

  readonly size: number; // 몇개의 문자열이 있는지 알아야 pop을 호출한다.
  //값을 결정할 수 없는 readonly로 준다.
  push(value: string): void;
  // 문자열을 넣고
  pop(): string;
  // 문자열을 빼고
}

type StackNode = {
  // 항상 노드를 가리키도록 해야 한다.(노드로 감싼다) 노드->데이터 담고있는 타입이다
  readonly vlaue: string;
  // readonly -> 불변성 유지
  readonly next?: StackNode;
  // * 다른 노드를 선택하거나 다 비어져있어서 없거나 // 신문법
};

class StackImpl implements Stack {
  private _size: number = 0; //readOnly로 해야 외부에서 사이즈 정보를 변경할 수 없어야 한다.
  //그러나 그냥 readOnly를  붙이며 내부에서도 변경 불가하기 때문에 private을 주고
  // 동일한 이름이므로 언더바
  get size() {
    // private + 게터를 이용한다.
    // 세터가 없으면 외부에서는 읽을 수만 있다?
    return this._size;
  }
  private head?: StackNode;
  //* StackNode를 가리킬수도 안 가리킬수도 있다.

  push(value: string) {
    this._size++;
    const node: StackNode = {
      value,
      next: this.head
    };
    this.head = node;
  }
  pop(): string {
    this._size--;
  }
}
// 단일 연결 리스트에는 Head라는 것이 있어서 Head에 연결 되어 있는 것을 하나씩 찾아나가는 방식

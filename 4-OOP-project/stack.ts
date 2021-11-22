// stack을 Array를 쓰지 않고 구현해보자
// *단일 연결 리스트* 로 Stack 구현하기
// 배열을 이용해서 Stack을 구현하면 push pop 메소드를 사용하여 굉장히 쉽게 할 수 있다. 그런데 이런 것을 이용하지 않고 구현하는 것이다.
// 연결 List -> 연결되어있는 목록 -> 첫 번째에 있는 숫자 1을 노드라고 하고 해당 노드는 다음 숫자 2를 가리키고 2는 3을 가리킨다..
// *단일 연결 리스트 -> Head(1)이 2를 잘 가리키고 있으면 모두 잘 연결되어 있으며 한 방향으로 쭉쭉 이어져있다.
// *이중 연결 리스트 -> 추가로 반대로 3이 2를 가리키고 2가 1을 또 가리키고 있는 것이다.
// 구현하려고 하는 stack에는 단일 연결 리스트만 있으면 된다.
// 만약 처음에 1을 넣으면 연결 리스트에는 아무것도 가리키지 않았던 Head는 (1)을 가리킨다.
// 2를 추가로 넣게 되면 2는 1을 가리키고 Head는 2가 된다.
// POP 메소드를 하면 Head가 가리키는 노드(현재 2)를 찾아서 그 노드가 가리키고있는 이전의 노드를 Head가 가리키도록 변경 시키면 된다.
// 그렇다면 2는 자연스럽게 무시가 되어지고. 즉, 다시 POP을 하게 되면 Head가 가리키고있는 1번 이면서 1번의 이전 노드는 없으므로 없는 null을 Head가 가리키도록 만든다.
// Head는 null을 가리키기 때문에 stack은 비어져있다. 숫자들은 있긴 있다. 그러나 아무도 참조하지 않으므로 이 아이들은 자연스럽게 무시가 된다.

interface Stack {
  //* stack사용하는 누군가가 전혀 몰라도 되고 그냥 interface만 쓰면 된다.
  // 얼마나 다양한 클래스가 있는지 상관하지 않고 Interface를 통해 의사소통

  readonly size: number; // 몇개의 문자열이 있는지 알아야 pop을 호출한다.
  //값을 결정할 수 없는 readonly로 준다.
  push(value: string): void;
  // 문자열을 넣고
  pop(): string;
  // 문자열을 빼고
}

type StackNode = {
  // 항상 노드를 가리키도록 해야 한다.(노드로 감싼다) 노드->데이터 담고있는 타입이다
  readonly value: string;
  // ! readonly -> 불변성 유지 // 값이 들어왔을 때 변경되지 않도록
  readonly next?: StackNode; // -> StackNode | undefined;
  // * 다른 노드를 선택 //  선택하거나 비어져있어서 없거나 //+ 신문법 옵셔널
};

class StackImpl implements Stack {
  private _size: number = 0; //readOnly로 해야 외부에서 사이즈 정보를 변경할 수 없어야 한다.
  // *그러나 그냥 readOnly를  붙이면 내부에서도 변경 불가하기 때문에 private을 주고
  // 동일한 이름이므로 언더바
  get size() {
    // private + 게터를 이용한다.
    // 세터가 없으면 외부에서는 읽을 수만 있다
    return this._size;
  }
  private head?: StackNode;
  //* StackNode를 가리킬수도 안 가리킬수도 있다. 즉, Stack은 head를 가질 수도 있고 안 가질 수도 있다.

  push(value: string) {
    const node: StackNode = {
      // push니까 노드 생성
      // ?head는 새로운 노드를 가리키고
      // ?새로운 노드는 이전의 노드를 가리킨다.
      value,
      next: this.head
    };
    this.head = node;
    this._size++;
  }

  //pop을 할때는 비어져있는지 안비어져있는지 확인해야함
  pop(): string {
    if (this.head == null) {
      throw new Error('Stack is empty!');
      // 사용자에게 비어져있는데 왜 pop 메소드를 사용해? 메시지
      // *undefined가 아닌 null로 한 이유는?
      // *엄격한 타입체크 시 null !== undefined 라서
      // *equl sign 2개를 사용해서 확인하면 null == undefined // true
      // *즉, undefined와 null 2개를 모두 거를 수 있는 코드 'A == null'
    }

    //* head가 가리키는 아이를 pop해야 하기 때문에 가리키는 노드의 value를 리턴한다
    //* head는 head가 가리키는 아이가 가리키고있던 아이를 가리키게 하면 된다.
    const node = this.head;
    // 1. 제거하고자하는 노드는 현재 head

    this.head = node.next;
    // 2. 이제 head를 변경 -> node라는 변수에 객체를 할당했고 next는 이전 것이 되니까...
    this._size--;
    // 3. 사이즈 변경
    return node.value;
    // 4. 값 리턴
  }
}
// 단일 연결 리스트에는 Head라는 것이 있어서 Head에 연결 되어 있는 것을 하나씩 찾아나가는 방식

// TEST 코드

const stack = new StackImpl();
stack.push('SOLID 1');
stack.push('TANIA 2');
stack.push('STEVE 3');
while (stack.size !== 0) {
  console.log(stack.pop());
  /*STEVE 3
    TANIA 2
    SOLID 1 
  */
}

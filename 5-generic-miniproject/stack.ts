{
  // 이전에 구현한 stack 기능을 하는 class를 활용해서 generic으로 바꿔보자.
  // 이전에는 String만 가능했다. 어떤 타입이든 받을 수 있는 stack으로 바꾸자.
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode<T> = {
    readonly value: T;
    // ! readonly next?: StackNode; 이렇게 했었는데 에러
    readonly next?: StackNode<T>; // < - 이렇게 적어줘야 된다.  next라는 것은 T타입의 StackNode를 가리킨다..
  };

  class StackImpl<T> implements Stack<T> {
    constructor(private capacity: number) {}
    private _size: number = 0;
    get size() {
      return this._size;
    }
    private head?: StackNode<T>;

    push(value: T) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full!');
      }
      const node = {
        // 여기서는 StackNode<T>를 지워줘도 된다.
        value,
        next: this.head
      };
      this.head = node;
      this._size++;
    }

    pop(): T {
      if (this.head == null) {
        throw new Error('Stack is empty!');
      }
      const node = this.head;

      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl(10);
  stack.push('SOLID 1');
  stack.push('TANIA 2');
  stack.push('STEVE 3');
  // ? 인스턴스 생성시 위와 같이 하면 타입이 unknown이기 때문에 unknown이 팝 된다. 해결은 아래와 같이 작성한다.

  const stack2 = new StackImpl<string>(10); // ? string을 이용할 것이다!
  stack2.push('SOLID 4');
  stack2.push('TANIA 5');
  stack2.push('STEVE 6');

  const stack3 = new StackImpl<number>(10); // ? number를 이용할 것이니 push할 때 숫자를 넣어준다.
  stack3.push(123);
  stack3.push(456);

  while (stack.size !== 0) {
    console.log(stack.pop());
  }
  while (stack2.size !== 0) {
    console.log(stack.pop());
  }
  while (stack3.size !== 0) {
    console.log(stack.pop());
  }
}
// 만약 담당하는 기능 컴포넌트 등이 재사용 될 필요성이 있는지 재사용 가능성이 있다면 제네릭을 이용해서 다양한 타입을 받도록 할 수 있다.

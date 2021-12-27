export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attach(component: Component, position?: InsertPosition): void;
  registerEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T; // 외부에서 볼 수 없으면서 상속하는 자식 class에서는 접근 가능하며 읽기만 가능하다.

  constructor(htmlString: string) {
    //BaseComponent를 사용하는 애들이 어떤걸 사용할지
    // htmlString을 인자로 받아서 거기에 맞게 element를 만들어 전달한다.
    const template = document.createElement('template');
    template.innerHTML = htmlString; // htmlString은 앞서 적은 문자열 태그들
    this.element = template.content.firstElementChild! as T; // T타입으로 캐스팅을 한다 -> 무조건 값이 있을 것이며 T타입이다!
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    // BaseComponent를 만드는 애들은 모두 attachTo 사용 가능
    parent.insertAdjacentElement(position, this.element);
  }
  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error('Parent mismatch! Plz confirm..');
    }
    parent.removeChild(this.element);
  }
  attach(component: Component, position?: InsertPosition) {
    component.attachTo(this.element, position);
  }
  registerEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
  ): void {
    this.element.addEventListener(type, listener);
  }
  //* BaseComponet는 캡슐화 한다.
  //* 1. HTML Element를 만드는 것을 캡슐화한다-> 외부에서는 어떻게 만드는지 신경쓰지 않고 그냥 string타입으로 전달하면 element를 만든다.
  //* 2. attachTo api가 있기 때문에 parent에 붙일 수 있다.
  //* 3. 그리고 api가 있다면 BaseComponent를 여기저기 전달하는 것보다는 interface를 쓰는 것이 좋다.
  //* 외부에서 사용해야 하니까 export 해주고 Component 인터페이스 안에는 attachTo가 있으며 position은 전달해도 되고 안 해도 된다.
  //* 아무것도 리턴하지 않는 void다.
  //* 사용하는 곳에서는 컴포넌트 타입만 사용하면 된다. 인터페이스를 규격해 두면 사용하는 곳에서는
  //* 4. BaseComponent는 Component 인터페이스의 규격을 따라가는 class다.
  //* 5. 외부에서 상속하기 위해서 BaseComponent를 export한다.
}

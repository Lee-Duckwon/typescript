import { BaseComponent, Component } from './../component.js';

export interface Composable {
  // 여러가지 모아서 조립하고 묶을 수 있는
  addChild(child: Component): void;
}

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(`<li class="page-item">
              <section class="page-item__body"></section>
              <div class="page-item__controls">
                <button class="close">&times;</button>
              </div>
            </li>`);
    //
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    child.attachTo(container);
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  // 외부에서 PageComponent 만들어서 필요한 곳에 추가하는 기능
  //private element: HTMLUListElement;
  // element는 dom요소중 하나
  constructor() {
    // ul 엘리먼트 바로 생성
    /*this.element = document.createElement('ul');
    this.element.setAttribute('class', 'page'); // class 이름 page로 지정
    this.element.textContent = 'This is PageComponent'; // 말그대로 textContent */

    super('<ul class="page"></ul>');
  }
  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    // 들어오는 섹션이 뭔지 잘 모르지만 무조건 페이지 아이템을 만들어서 전달받은 섹션을 추가해서 받은 다음에 페이지 아이템을 페이지에 넣는다
  }
  /*
  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    //attachTo라는 외부에서 사용할 수 있는 API존재
    // 호출하면서 parent에 추가하고 싶은 요소를 넣어주면 함수가 알아서 해당 페이지에 추가한다

    // parent는 어떤 것이든 받고
    // 어떤 곳에 ? -> position
    parent.insertAdjacentElement(position, this.element);
  } */
}

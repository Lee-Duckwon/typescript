import { BaseComponent, Component } from './../component.js';

export interface Composable {
  // 여러가지 모아서 조립하고 묶을 수 있는
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  // setOnCloseListener api가 있어야함!
}
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  constructor() {
    super(`<li class="page-item">
              <section class="page-item__body"></section>
              <div class="page-item__controls">
                <button class="close">&times;</button>
              </div>
            </li>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    //? button 클릭이 되면 해당 페이지 아이템 컴포넌트 삭제
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}
//* --- //

type SectionContainerConstructor = {
  //아무 것도 전달 받지 않은 생성자
  new (): SectionContainer;
  // 생성자는 아무것도 받지않지만 호출되면 SectionContainer라는 규격을 따라가는 어떤 class라도 ok
};
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  // 외부에서 PageComponent 만들어서 필요한 곳에 추가하는 기능
  //private element: HTMLUListElement;
  // element는 dom요소중 하나
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    // SectionContainerConstructor를 외부로부터 받아서
    //받아진 아이템을 이용해서 내부에서 한 가지클래스를 만드는 것이 아니라 외부에서 전달 된 pageItemConstructor를 이용해서 만들 수 있다.

    // ul 엘리먼트 바로 생성
    /*this.element = document.createElement('ul');
    this.element.setAttribute('class', 'page'); // class 이름 page로 지정
    this.element.textContent = 'This is PageComponent'; // 말그대로 textContent */

    super('<ul class="page"></ul>');
  }
  addChild(section: Component) {
    const item = new PageItemComponent(); // item 생성
    // Page를 계속 새로 만드는데 재사용 가능하려면?
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
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
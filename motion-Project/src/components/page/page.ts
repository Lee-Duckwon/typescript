import { BaseComponent, Component } from './../component.js';

export interface Composable {
  // 여러가지 모아서 조립하고 묶을 수 있는
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave'; //드래그는 4가지의 상태
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void; // 타입이 안전하지만 타입이 보존되는 제네릭

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  // setOnCloseListener api가 있어야함!
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
}

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>; // 다른 컴포넌트에서 동일한 listener를 쓰고 싶다면 타입만 바꿔서 재사용 가능

  constructor() {
    //draggable="true" -> 드레그가 허용 됨 (드래그 스타트)
    super(`<li draggable="true" class="page-item">
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

    this.element.addEventListener('dragstart', (event: DragEvent) => {
      this.onDragStart(event);
    });
    this.element.addEventListener('dragend', (event: DragEvent) => {
      this.onDragEnd(event);
    });
    this.element.addEventListener('dragenter', (event: DragEvent) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener('dragleave', (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }
  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start');
    //ClientX, Y좌표 확인 가능
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop');
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
    //ClientX, Y좌표 확인 가능
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
  }
  notifyDragObservers(state: DragState) {
    // 유지보수때문에 함수로 관리
    this.dragStateListener && this.dragStateListener(this, state);
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
  setOnDragStateListner(listener: OnDragStateListener<PageItemComponent>) {
    // 나 드래그 되고 있어 !
    // 나, 드래그 상태
    this.dragStateListener = listener;
  }
  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }
  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
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
  private children = new Set<SectionContainer>();
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
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
    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.onDragOver(event);
    });
    this.element.addEventListener('drop', (event: DragEvent) => {
      this.onDrop(event);
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    // 드랍존 정의할 때 preventDefault해줘야 한다.
    // DragOver 와 Drop을 핸들링할때 안 해주면 touchEvent나 포인터 이벤트에서 안 좋은 결과를 발생할 수도 있어
    // 이런 것을 보면 지금 구현하는 드래그 앤 드랍은 안 좋은 api
    console.log('onDragOver');
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log('onDrop');
    // 위치 변경
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect;

      this.dragTarget.removeFrom(this.element);
      //this.element == 페이지
      this.dropTarget.attach(
        this.dragTarget,
        dropY < srcElement.y ? 'beforebegin' : 'afterend'
      );
    }
  }

  addChild(section: Component) {
    const item = new PageItemComponent(); // item 생성
    // Page를 계속 새로 만드는데 재사용 가능하려면?
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    // 들어오는 섹션이 뭔지 잘 모르지만 무조건 페이지 아이템을 만들어서 전달받은 섹션을 추가해서 받은 다음에 페이지 아이템을 페이지에 넣는다

    item.setOnDragStateListner((target: SectionContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;
          this.updateSections('mute');
          break;
        case 'stop':
          this.dragTarget = undefined;
          this.updateSections('unmute');
          break;
        case 'enter':
          this.dropTarget = target;
          break;
        case 'leave':
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`유효하지 않은 상태${state}`);
      }
    });
  }
  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
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

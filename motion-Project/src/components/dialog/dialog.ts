import { Composable } from '../page/page.js';
import { BaseComponent, Component } from './../component.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly body: string;
}

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListener?: OnCloseListener; // 옵셔널 타입
  submitListener?: OnSubmitListener; // 옵셔널 타입

  constructor() {
    super(`<dialog class="dialog">
          <div class="dialog__container">
            <button class="close">&times;</button>
            <div id="dialog__body"></div>
            <button class="dialog__submit">ADD</button>
          </div>
        </dialog>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLElement;
    // closeBtn.addEventListener  버튼 다른 곳에서 사용한다면 onclcik보다 addEventListener를 이용하라
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(
      '.dialog__submit'
    )! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListenr(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListenr(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  addChild(child: Component) {
    const body = this.element.querySelector('#dialog__body')! as HTMLElement;
    // dialog__body 요소를 가진 애들을 가져와서 추가해준다.
    // 전달받은 child에 attachTo
    child.attachTo(body);
  }
}

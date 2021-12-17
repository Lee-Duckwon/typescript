import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import {
  Composable,
  PageComponent,
  PageItemComponent
} from './components/page/page.js';
import { VideoComponent } from './components/page/item/video.js';
import { Component } from './components/component.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import {
  InputDialog,
  MediaData,
  TextData
} from './components/dialog/dialog.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  // 정확한 유격을 받는 것이 아니라 이중 하나만 되고 반드시 Component 인터페이스를 규현해야 한다. &
  // * T라는 것은 MediaData 이거나 TextData가 될 것이다. 그리고 꼭!(&) Component 인터페이스를 구현해야한다!
  new (): T;
};
class App {
  //
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    // 페이지 우리가 어디에 붙을거나면 -> appRoot에 너 자신을 추가해줘
    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );
    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }
  private bindElementToDialog<T extends (MediaData | TextData) & Component>( // 굳이 커플링 하고 싶지 않다면 MediaData | TextData를 구현하고 있고 & Component형태의 아이만을 받는다... 이런 규격사항을 만족하면 받아주는 것
    // dialog 연결해주고 동적으로 요소를 페이지에 추가해주는 것을 함
    // Element와 dialog를 연결해주는 역할
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListenr(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

// 어플리케이션 시작 되면 document 클래스를 가진 요소를 가져와서 전달 _header와 footer 사이에 전달할 요소_
new App(document.querySelector('.document')! as HTMLElement, document.body); // * 무조건 null 아니야 ! -> !

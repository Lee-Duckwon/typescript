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
import { InputDialog } from './components/dialog/dialog.js';
class App {
  //
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    // 페이지 우리가 어디에 붙을거나면 -> appRoot에 너 자신을 추가해줘

    const image = new ImageComponent(
      'Image Title',
      'https://picsum.photos/600/300'
    );
    this.page.addChild(image); // 이미지 컴포넌트 추가해줘 !

    const note = new NoteComponent('Note Title', 'Note Body');
    this.page.addChild(note);

    const todo = new TodoComponent('Todo Title', 'Todo Item');
    this.page.addChild(todo);

    const video = new VideoComponent(
      '이루마 피아노곡',
      'https://youtu.be/5vO5HuphDnM'
    );
    this.page.addChild(video);
    const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog();

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setOnSubmitListenr(() => {
        //섹션을 만들어서 페이지에 추가한다.
        dialog.removeFrom(document.body);
      });
    });
  }
}

// 어플리케이션 시작 되면 document 클래스를 가진 요소를 가져와서 전달 _header와 footer 사이에 전달할 요소_
new App(document.querySelector('.document')! as HTMLElement); // * 무조건 null 아니야 ! -> !

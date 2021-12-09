import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { PageComponent } from './components/page/page.js';
import { VideoComponent } from './components/page/item/video.js';
class App {
  //
  private readonly page: PageComponent;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);
    // 페이지 우리가 어디에 붙을거나면 -> appRoot에 너 자신을 추가해줘

    const image = new ImageComponent(
      'Image Title',
      'https://picsum.photos/600/300'
    );
    image.attachTo(appRoot, 'beforeend');

    const note = new NoteComponent('Note Title', 'Note Body');
    note.attachTo(appRoot, 'beforeend');

    const todo = new TodoComponent('Todo Title', 'Todo Item');
    todo.attachTo(appRoot, 'beforeend');

    const video = new VideoComponent(
      '이루마 피아노곡',
      'https://youtu.be/5vO5HuphDnM'
    );
    video.attachTo(appRoot, 'beforeend');
  }
}

// 어플리케이션 시작 되면 document 클래스를 가진 요소를 가져와서 전달 _header와 footer 사이에 전달할 요소_
new App(document.querySelector('.document')! as HTMLElement); // * 무조건 null 아니야 ! -> !

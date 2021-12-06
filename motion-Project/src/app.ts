import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';
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
  }
}

// 어플리케이션 시작 되면 document 클래스를 가진 요소를 가져와서 전달 _header와 footer 사이에 전달할 요소_
new App(document.querySelector('.document')! as HTMLElement); // * 무조건 null 아니야 ! -> !

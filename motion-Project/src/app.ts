import { PageComponent } from './components/page.js';
class App {
  //
  private readonly page: PageComponent;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);
    // 페이지야 우리가 어디에 붙을거나면 -> appRoot에 너 자신을 추가해줘
  }
}

// 어플리케이션 시작 되면
new App(document.querySelector('.document')! as HTMLElement); // * 무조건 null 아니야 ! -> !

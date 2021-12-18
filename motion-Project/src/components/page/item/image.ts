import { BaseComponent } from './../../component.js';
export class ImageComponent extends BaseComponent<HTMLElement> {
  //private element: HTMLElement;
  constructor(title: string, url: string) {
    // string 타입으로 태그 작성
    super(`<section class="image">
            <div class="image__holder"><img class="image__thumbnail"></div>
            <h2 class="page-image__title"></h2>
          </section>`);

    const imageElement = this.element.querySelector(
      '.image__thumbnail'
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      '.image__title'
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}

import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    console.log(url);
    // 사용자는 Video의 url만 전달해주면 된다.
    super(`<section class="video">
                <div class="video__player"><iframe class="video__iframe"></iframe></div>
                <h3 class="video__title"></h3>
            </section>`);
    // super에 우리가 만들고자 하는 html 태그 전달하면 된다.
    const iframe = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    // 우리가 가지고 오려는 것은 video__iframe이라는 클래스 이름을 가진 것이다
    // 확실히 이 값이 존재하며 IframeElement이기 때문에 !를 사용해서 HTMLIFrameElement 캐스팅한다.
    iframe.src = url; // 들어오는 값 url은 비디오 Id

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
    //?우리는 어떤 Url을 보내든지 정확히 id만을 추출해야한다.

    iframe.src = this.convertToEmbeddedURL(url); // 임베디드 용으로 변경
  }
  private convertToEmbeddedURL(url: string): string {
    //* string 타입의 url을 받고 string 타입의 임베디드용 url을 리턴한다.
    //* 정규표현식을 사용한다.

    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    //정규표현식
    const match = url.match(regExp); // 매치되는 것이 있다면 배열 리턴

    const videoId = match ? match[1] || match[2] : undefined; // 두 그룹을 받아옴 -> 매치되는 것이 있다면 match[1] 없다면 match[2] // 그리고 match된느 것이
    // ㅎ ㅏ나도 없다면 undefined
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}

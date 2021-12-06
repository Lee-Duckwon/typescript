export class PageComponent {
  // 외부에서 PageComponent 만들어서 필요한 곳에 추가하는 기능
  private element: HTMLUListElement;
  // element는 dom요소중 하나
  constructor() {
    // ul 엘리먼트 바로 생성
    this.element = document.createElement('ul');
    this.element.setAttribute('class', 'page'); // class 이름 page로 지정
    this.element.textContent = 'This is PageComponent'; // 말그대로 textContent
  }
  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    //attachTo라는 외부에서 사용할 수 있는 API존재
    // 호출하면서 parent에 추가하고 싶은 요소를 넣어주면 함수가 알아서 해당 페이지에 추가한다

    // parent는 어떤 것이든 받고
    // 어떤 곳에 ? -> position
    parent.insertAdjacentElement(position, this.element);
  }
}

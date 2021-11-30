{
  // record 타입은 map과 비슷하게 하나와 어떤 하나를 연결하고 싶을 때, 하나를 key로 나머지는
  // 다른 타입으로 묶고 싶을 때 유용하게 사용할 수 있다.
  type PageInfo = {
    title: string;
  };
  type Page = 'home' | 'about' | 'contact';

  const nav: Record<Page, PageInfo> = {
    //* 함께 묶을 수 있는 것이 record타입 한 Page당 PageInfo를 묶어준다 (자료구조 )
    //* 해당 오브젝트는 Page를 key PageInfo를 value로 삼으면 된다.
    home: { title: 'Home' },
    //* home은 PageInfo라는 오브젝트 타입은 title이 있어야 하고, string value를 갖는다.
    about: { title: 'About' },
    contact: { title: 'Contact' }
  };
}

type Product = 'cat' | 'dog';
type NewProduct = Capitalize<Product>; //  -> 'Cat | 'Dog'
// * Capitalize는 유틸리티 타입 -> 대문자로 Cat과 대문자로 Dog로 사용할 수 있다. 물론 활용도는 매우 낮지만 재미있다.
// * 다양한 유틸리티 타입이 있다는 것을 인지하고 있자!

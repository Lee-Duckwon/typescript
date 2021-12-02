console.log(this); //* -> window

const simpleFunc = () => {
  console.log(this);
};
//* simpleFunc(); === window.simpleFunc();

class Counter {
  count = 0;
  increase = () => {
    console.log(this);
  };
}
const counter = new Counter();
counter.increase(); //* -> this라는 것은 더이상 window가 아닌 counter를 가리킨다.

const caller = counter.increase; // let이나 const같은 키워드에 할당했기 때문에
caller(); // -> undefined 가 뜬다.

class Solid {}
const solid = new Solid();
solid.run = counter.increase;
solid.run(); // -> increase함수 호출될 것이고 solid 자체가 호출 된다. 왜냐하면 run이라는 함수는 solid가 불렀기 때문이다.
// 자바스크립트는 this라는 정보를 다른 곳에 할당하는 순간 잃어버릴 수 있어서 관계를 꽁꽁 묶어주려면 바인딩을 통해 묶어준다.

const caller2 = counter.increase.bind(counter); // -> 할당할 때 counter에 increase라는 함수는 바인딩을 할건데 바로 counter라는 오브젝트와 바인딩을 할 것이다.

// * 그리고 대부분 에로우펑션을 이용했는데, 이렇게 하면 바인딩이 되는 효과를 볼 수 있다. 선언될 당시의 문맥 당시의 스코프에 this 컨텍스를 유지한다.
//즉, 자바스크립트에서 this는 부르는 사람의 문맥에 따라서 바뀔 수 있으므로 바인딩을 써준다. 혹은 class 내부에 바인딩 함수를 에로우펑션으로 이용하자

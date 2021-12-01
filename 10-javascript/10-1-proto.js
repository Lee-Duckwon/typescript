const x = {};
const y = {};
console.log(x);
console.log(y);
//* 이렇게 콘솔 찍으면 __proto__ : Object가 뜬다. 자바스크립트에서 오브젝트는 모두 이 친구(프로토)를 상속한다.
// 상속을 하기 때문에 toString이라든지 메소드 등을 사용할 수 있는 것이다.
// 여기서 x.__proto__ === y.__proto__ 는 true다.

const array = [];
console.log(array);
//* 이렇게 콘솔 찍으면 __proto__ : array 가 뜬다. 그렇기 때문에 pop, push, sort 등 메소드를 사용할 수 있는 것이다.
// 그리고 자세히 보면 object가 보일텐데 상속 개념 때문이다.
//  array -> Array -> Object

function CoffeeMachine(beans) {
  this.beans = beans;
  // 만들어지는 인스턴스마다 포함되는 인스턴스 멤버 레벨이다.

  // this.makeCoffee = (shots) => {
  //   console.log('making....');
  // };
}
CoffeeMahcine.prototype.makeCoffee = (shots) => {
  console.log('making....');
};
const machineOne = new CoffeeMachine(10);
const machineTwo = new CoffeeMachine(20);
console.log(machineOne);
console.log(machineTwo);

function LatteMachine(milk) {
  this.milk = milk;
}
LatteMachine.prototype = Object.create(CoffeeMachine.prototype);

const latteMachine = new LatteMachine(123);
console.log(latteMachine);
latteMachine.makeCoffee();

{
  //추상적인 아이디어를 코드로
  interface Employee {
    //직원
    pay(): void;
    //
  }
  class FullTimeEmployee implements Employee {
    pay() {
      console.log(`Full time`);
    }
    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay() {
      console.log(`Part time`);
    }
    workPartTime() {}
  }

  //! (아래) 세부적인 타입을(Employee) 인자로 받아서 정말 추상적인 타입으로 다시 리턴하는 함수는 좋지 않다!
  function payBad(employee: Employee): Employee {
    // 자동으로 월급을 지불할 수 있는 함수를 만든다. Employee를 받고 월급 지불하고 다시 리턴한다
    employee.pay();
    return employee;
  }

  function payGood<E extends Employee>(employee: E): E {
    // employee.pay(); 접근 불가능?!
    // * 제네릭은 어떤 타입이든 다 들어올 수 있어서 작성하는 순간에 타입 정보가 없기 때문에 사용 불가능하다
    // 이럴때 조건을 달 수 있다.
    // extends
    return employee;
  }

  const tania = new FullTimeEmployee();
  tania.workFullTime();
  // tania는 풀타임으로 일할 수 있다

  const solid = new PartTimeEmployee();
  solid.workPartTime();
  // solid는 풀타임으로 일할 수 있다

  const taniaAfterPay = payGood(tania);
  // * taniaAfterPay.workFullTime 접근 불가능!!
  //이 상태에서 받아온 것은 그냥 'Employee'이기 때문에 Full인지 Part인지 모른다.
  // 세부 정보를 잃게 된다
  // 그럴 때 캐스팅 as를 쓴다.
  // const tainaAfterPay = pay(tania) as FullTimeEmployee;
  // 하지만 as는 좋지 않다. 이럴 때 제네릭을 쓴다.
  const solidAfterPay = payGood(solid);
  //
  console.log(solidAfterPay);
}

{
  // * Union Type은 or이라고 생각하면 쉽다.

  type Direction = 'left' | 'right' | 'up' | 'down';
  function move(direction: Direction) {
    console.log(direction);
  }
  move('down');
  // 발생 가능한 케이스 중에서 하나만을 타입으로 정할 수 있다.
  // union 타입은 Typescript에서 자주 사용한다.
  // 만약 로그인하는 함수가 있다고 가정.
  // 로그인 함수에는 success, fail 2가지만 존재한다.
  type Success = {
    response: {
      body: string;
    };
  };
  type Fail = {
    reason: string;
  };
  // 위와 같이 정해주고 함수에 대입해서 사용한다.
  type SignupState = Success | Fail;

  function signup1(): SignupState {
    return {
      response: {
        body: 'signup !'
      }
    };
  }
  // 위와 같이 할 수 있지만 아래처럼 깔끔하게 작성한다.
  function printSignup(state: SignupState) {
    if ('response' in state) {
      console.log(state.response.body);
    } else {
      console.log(state.reason);
    }
  }
}

type Job = 'police' | 'developer' | 'teacher';

interface User {
  name: string;
  job: Job;
}

const user: User = {
  name: 'Sam',
  job: 'developer'
};

interface Car {
  name: 'car';
  color: string;
  start(): void;
}
interface Mobile {
  name: 'mobile';
  color: string;
  call(): void;
}

function getFigt(gift: Car | Mobile) {
  console.log(gift.color);
  if (gift.name === 'car') {
    gift.start();
  } else {
    gift.call();
  }
}

{
  type SuccessState = {
    result: 'success';
  };

  type NetworkErrorState = {
    result: 'fail';
    reason: 'offline' | 'down' | 'timeout';
    // 왜 에러났는지 유니온으로 정의
  };

  type ResultState = SuccessState | NetworkErrorState;
  class NetworkClient {
    tryConnect(): ResultState {
      // state를 리턴하는 것을 만들어준다 예상가능하게 프로그래밍 할 수 있는 것
    }
  }
  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      console.log('catched!');
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try {
        this.userService.login();
      } catch (error) {}
    }
  }
}

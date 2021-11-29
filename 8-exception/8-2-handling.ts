{
  class TimeoutError extends Error {}
  class OfflineError extends Error {}

  class NetworkClient {
    tryConnect(): void {
      throw new OfflineError('no etwork!');
    }
  }
  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      /*
    try {
    } catch (error) {
      console.log('catched!');
    }*/
      //* error가 발생했을 때 고급스럽게 처리할 수 있는 것이 아니라면 catch를 하지 않는 것이 더 낫다. 어정쩡하게 잡기보다는 처리할 수 있는 곳에서 try한느 것이 좋다 즉, App에서 하자.
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try {
        this.userService.login();
      } catch (error) {
        // show dialog to user
        //* try catch에 전달되는 Error는 any타입이다!!
        // 그래서
        if (error instanceof /* OfflienError의 인스턴스라면*/ OfflineError) {
          return; ///이런 if문을 주는 것이 불가능
        }
      }
    }
  }
}

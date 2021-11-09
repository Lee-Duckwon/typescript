{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;
  // * union타입
  const printLoginState = (ele: ResourceLoadState) => {
    switch (ele.state) {
      case 'loading':
        console.log('👀 loading...');
        break;
      case 'success':
        console.log(`😃 ${ele.response.body}`);
        break;
      case 'fail':
        console.log(`😱 ${ele.reason}`);
        break;
      default:
        throw Error(`unknown state ${ele}`);
    }
  };
  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}

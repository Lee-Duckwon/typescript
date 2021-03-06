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
  // * unionνμ
  const printLoginState = (ele: ResourceLoadState) => {
    switch (ele.state) {
      case 'loading':
        console.log(`π ${ele.state}`);
        break;
      case 'success':
        console.log(`π ${ele.response.body}`);
        break;
      case 'fail':
        console.log(`π± ${ele.reason}`);
        break;
      default:
        throw Error(`unknown state ${ele}`);
    }
  };
  printLoginState({ state: 'loading' }); // π loading
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // π loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // π± no network
}

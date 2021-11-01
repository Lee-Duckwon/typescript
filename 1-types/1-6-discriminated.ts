{
  type Success = {
    result: 'success';
    response: {
      body: string;
    };
  };
  type Fail = {
    result: 'fail';
    reason: string;
  };
  // 위와 같이 정해주고 함수에 대입해서 사용한다.
  function signup(): Success | Fail {
    return {
      result: 'success',
      response: {
        body: 'signup !'
      }
    };
  }
  // 위와 같이 할 수 있지만 아래처럼 깔끔하게 작성한다.
  type SignupState = Success | Fail;
  function printSignup3(state: SignupState) {
    // state.result // 성공일수도 실패일수도있지만 result라는 것을 공통적으로 갖고있어서 가능하다.

    if (state.result === 'success') {
      // * 조금 더 직관적으로 코드를 작성할 수 있다.
      console.log(state.response.body);
    } else {
      console.log(state.reason);
    }
  }
}

//EXCEPTION = 예상치 못한 에러 // 핸들링이 안 되면 사용자에게 알려야 한다.
//이러한 EXCEPTION을 잘 처리해야 한다. 안정성과 유지보수성을 높여야 한다.
//* Error State -> 우리가 예상할 수 있는 어플리케이션 내부에 일어나는 에러 케이스
//* EXCEPTION -> 전혀 예상치 못한 에러
// Java에서는 EXCEPTION이라는 오브젝트가 있으며
// 자바스크립트에는 Error라는 클래스가 있다.
const array = new Array(10000000000000000000);
// 만약 위와 같이 한다면 에러가 발생한다.
// RangeError가 발생하는 것을 볼 수 있다.

// 내가만든 메소드에 API에 맞게 작성 안 한다면 Error를 바로 내보낼 수도 있다 그러나 실시간으로 에러가 나오도록
// 두지는 않고 컴파일 단계에서 에러가 발생해서 컴파일 때 수정하는 것이 좋다고 한다.
// 아래에는 이전에 만들었던 함수다.
// default 부분 위에 invalid를 추가했는데 원래 case 'she'가 없었을 때는 invalid에 에러가 떴다.
// 그러나 케이스를 추가하면
// 타입스크립트 컴파일러가 모든 케이스가 다 되고 마지막 move에 들어가는건 never만 있으므로
// 컴파일 에러가 발생하지 않는다.
{
  const position = {
    x: 0,
    y: 0
  };

  type Moving = 'up' | 'down' | 'left' | 'right' | 'she';

  function movingGame(move: Moving) {
    switch (move) {
      case 'up':
        position.y++;
        break;
      case 'down':
        position.y--;
        break;
      case 'left':
        position.x--;
        break;
      case 'right':
        position.x++;
        break;
      case 'she':
        position.x++;
        break;
      default:
        const invalid: never = move;
        throw Error('unknown direction');
    }
  }
}

// * Error(EXCEPTION) Handling:  < try -> catch -> finally > (심각하면 어플 다이)
// 조금 우아하게 처리할 수 있다면 try, catch
// 예시로 아래와 같은 함수를 만들어본다.
// 파일이 들어오면 읽고 없다면 에러를 뽑는 함수다.
function readFile(fileName: string): string {
  if (fileName === 'Not exist!!') {
    throw new Error(`file not exist! ${fileName}`);
  } else {
    return 'file contents';
  }
}

//파일을 열었으니 이제 닫는 함수를 만든다.
function closeFile(fileName: string) {
  //
}

const fileName = 'file';
try {
  console.log(readFile(fileName));
} catch (e) {
  console.log(`catched!!`);
} finally {
  closeFile(fileName);
  console.log('finally');
  // catch가 호출 되든 안 되든 항상 작동
}

console.log(`!!`);

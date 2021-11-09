/**
 * 게임 함수 만들기 🕹
 */
const position = {
  x: 0,
  y: 0
};

type Moving = 'up' | 'down' | 'left' | 'right';

function moveGame(move: Moving) {
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
    default:
      throw Error('unknown direction');
  }
}
console.log(position); // { x: 0, y: 0}
moveGame('up');
console.log(position); // { x: 0, y: 1}
moveGame('down');
console.log(position); // { x: 0, y: 0}
moveGame('left');
console.log(position); // { x: -1, y: 0}
moveGame('right');
console.log(position); // { x: 0, y: 0}

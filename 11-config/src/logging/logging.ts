//* tsc 파일명 -w -> 자바스크립트 파일 생성 및 자동 업데이트

//* tsc --init -> tsconfig파일이 생성되며 컨파일러 옵션들이 들어있다.
// tsc --init 후에 tsc -w 를 입력하면 자동으로 해당 폴더에있는 파일들 자바스크립트로 생성 및 자동 업데이트
// 자동 업데이트 컴파일링

// tsc -> 컴파일시키기

//but, 타입스크립트 자바스크립트 파일이 함께 있어서 혼란스럽다.
// 보통 생성된 자바스크립트 파일들을 다른 곳에 넣는다.
//? 컴파일된 파일들 넣을 곳을 config에 outDir에 작성해주면 생성된다. <"outDir": "./build">로 작성해서 build라는 폴더생성 후에 그 안에 컴파일 된 자바스크립트 파일 생성
// 만약 src라는 폴더에 ts파일들이 들어있다면 위에서 아래로 하나씩 생긴다
//* 만약 특정 폴더가 여러개 있으면서 그 안에 ts파일이 있다면 폴더명을 그대로 가져와 추가 생성 후에 해당 폴더 안에 자바스크립트 파일이 생성된다.

//? 다른 사람이 src 밖에서 ts파일 생성을 불가능하게 하려면 config에 "rootDir"를 설정한다. 기본적으로 최상위에 설정되어 있어서 app.ts 작성이 가능
// "./src"라고 작성해주면 된다.
// config 파일에 compilerOptions 아래에 새로 추가한다. (객체 내부에 x)
// 1. "exclude": ["./src/dev.ts"] 제외할 것을 배열형태로 작성한다. 현재디렉토리/src/dev.ts를 제외할 것이다. -> dev.js 생성 안 됨
// 2. dev.ts만 컴파일하고 싶다면? "include": ["./src/dev.ts"]를 작성해준다.

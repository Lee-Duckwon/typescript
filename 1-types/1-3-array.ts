{
  // * Array
  const emotions: string[] = ['๐', '๐ญ'];
  const emotions2: number[] = [3, 5];
  const emotions3: Array<string> = ['๐', '๐ญ'];
  function printArray(emotions: readonly string[]) {
    // readonly -> ๋ณ๊ฒฝ ๋ถ๊ฐ . ๋ถ๋ณ์ฑ ๋ณด์ฅ
    // emtions.push ๋ฑ X
  }

  // * Tuple
  // ํ๋์ ํ์๋ง ๊ฐ๋ฅ
  // ์ฌ์ฉ ๊ถ์ฅ x -> index ์ ๊ทผ์ ์ ์ข์ ์ฝ๋ ์ต๊ด์
  // Tuple ๋์ ์ ํด๋์ค ํ์ ๋ฑ์ผ๋ก ๋ช์ํด์ ์ ๊ทผํ์
  // type alias, interface, class๋ก ๋์ฒดํ์
  let couple: [string, number];
  couple = ['love', 77];
  couple[0];
  couple[1];
  const [love, number] = couple;
  // ์ด๋ ๊ฒ ํ๋ฉด ์ข ๋ ๋ชํํ๋ค. ๊ทธ๋๋ ์ฌ์ ํ ๋ถํธํจ
  // Tuple์์ ๋ฐ๋ ๋ชจ์ต์ด useState์ ๋น์ทํ๋ค.
  // ๋์ ์ผ๋ก returnํ๋๋ฐ ๋์ ์ผ๋ก ๋ค๋ฅธ ํ์ ๋ฐ์ดํฐ๋ฅผ ๋ฌถ์ด์ ์ฌ์ฉ์๊ฐ ์ด๋ฆ์ ์ ํด์ ์ฌ์ฉํ  ๊ฒฝ์ฐ๋ง ์ ์ฉ
  // ๋ค๋ฅธ ๊ฒฝ์ฐ๋ interface๋ type alias, class๋ฅผ ์ฌ์ฉํ  ์ ์๋ ๊ฒฝ์ฐ์๋ Tuple์ ์ฌ์ฉํ์ง ๋ง์
}

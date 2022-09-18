/* 키 객체 생성 */
const key = {
  keyDown: {},
  keyValue: {
    37: "left",
    39: "right",
    38: "up",
    40: "down",
    88: "attack",
  },
};

/* bullet object 생성 */
const bulletComProp = {
  launch: false,
  arr: [],
};

const gameBackground = {
  /* 패럴럭스를 적용할 엘리먼트 설정 gameBox라는 이름으로.. */
  gameBox: document.querySelector(".game"),
};

/* 자주 사용하는 것은 공통 처리 */
const gameProp = {
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
};

const renderGame = () => {
  /* 키를 눌렀을 때만 동작하는 게 아니라 */
  /* 무한으로 호출되다가 사용자가 키를 누르면 */
  /* 키에 맞는 동작을 하므로 딜레이가 없음 */
  hero.keyMotion();
  setGameBackground();

  bulletComProp.arr.forEach((arr, i) => {
    arr.moveBullet();
  });
  /* 재귀로 초당 60프레임을 돌며 renderGame함수가 무한 반복 */
  window.requestAnimationFrame(renderGame);
};

/* hero가 이동한 만큼 background-image도 이동 */
const setGameBackground = () => {
  /* -1을 곱해주면서 배경이 hero의 방향 반대로 이동하고 hero가 달려가는 느낌을 줌 */
  /* hero.movex : 히어로가 이동한 값 */
  /* hero의 위치에서 gameProp.screenWidth / 3만큼을 통째로 이동시켰음 */
  /* Math.min()을 넣어줌으로써 0 ~ gameProp.screenWidth / 3 까지는 배경이 안움직임 */
  let parallaxValue = Math.min(0, (hero.movex - gameProp.screenWidth / 3) * -1);

  gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
};

/* window에 event 추가, 관리 */
const windowEvent = () => {
  window.addEventListener("keydown", (e) => {
    key.keyDown[key.keyValue[e.which]] = true;
  });

  window.addEventListener("keyup", (e) => {
    key.keyDown[key.keyValue[e.which]] = false;
  });

  window.addEventListener("resize", (e) => {
    gameProp.screenWidth = window.innerWidth;
    gameProp.screenHeight = window.innerHeight;
  });
};

/* 페이지가 로드될때 이미지 로드를 미리 해놓기 위해.. 안해놓으면 끊김 */
const loadImg = () => {
  const preLoadImgSrc = [
    "../../../lib/images/ninja_attack.png",
    "../../../lib/images/ninja_run.png",
  ];
  /* 이미지 배열의 길이만큼 반복되는 반복문을 만듬 */
  preLoadImgSrc.forEach((arr) => {
    const img = new Image();
    img.src = arr;
  });
};

let hero;

/* program 시작에 필요한 function 또는 method 호출 */
const init = () => {
  /* class.js에서 생성한 Hero 클래스의 instance 생성 */
  hero = new Hero(".hero");
  /* 이미지가 미리 로드되어 깜빡임 없이 처리 가능 */
  loadImg();
  windowEvent();
  renderGame();
};

/* 모든 요소가 로드 된 후 윈도우를 실행하여야 함 */
window.onload = () => {
  init();
};

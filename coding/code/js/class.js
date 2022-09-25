/* hero 클래스 만들기 */
class Hero {
  constructor(el) {
    this.el = document.querySelector(el);
    this.movex = 0;
    this.speed = 11;
    this.direction = "right";
  }
  /* keyMotion 메소드, 키를 누를 때 hero의 motion 변경 */
  keyMotion() {
    if (key.keyDown["left"]) {
      this.direction = "left";
      this.el.classList.add("run");
      this.el.classList.add("flip");

      this.movex = this.movex < 0 ? 0 : this.movex - this.speed;
    } else if (key.keyDown["right"]) {
      this.direction = "right";
      this.el.classList.add("run");
      this.el.classList.remove("flip");

      this.movex = this.movex + this.speed;
    }

    if (key.keyDown["attack"]) {
      if (!bulletComProp.launch) {
        this.el.classList.add("attack");
        // 공격 키를 누를때마다 bullet object에 instance 추가
        bulletComProp.arr.push(new Bullet());

        bulletComProp.launch = true;
      }
    }

    if (!key.keyDown["left"] && !key.keyDown["right"]) {
      this.el.classList.remove("run");
    }

    if (!key.keyDown["attack"]) {
      this.el.classList.remove("attack");
      bulletComProp.launch = false;
    }
    /* hero Element의 hero box(Parent Element)에 */
    this.el.parentNode.style.transform = `translateX(${this.movex}px)`;
  }
  position() {
    /* position Object를 리턴 */
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().bottom,
    };
  }
  size() {
    return {
      // getBoundingClientRect() 를 사용해도 되지만 offset width와 height를 사용해봄
      width: this.el.offsetWidth,
      height: this.el.offsetHeight,
    };
  }
}

/* 수리검 클래스 */
class Bullet {
  constructor() {
    // 수리검은 game element에 추가됨 (this.parentNode가 game element임)
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");
    this.el.className = "hero_bullet";
    this.x = 0;
    this.y = 0;
    this.speed = 20;
    this.distance = 0;
    this.bulletDirection = "right";
    this.init();
  }
  init() {
    this.bulletDirection = hero.direction === "left" ? "left" : "right";
    this.x =
      this.bulletDirection === "right"
        ? hero.movex + hero.size().width / 2
        : hero.movex - hero.size().width / 2;
    // 수리검은 transform으로 위치를 잡기 때문에 빼줘야함
    this.y = hero.position().bottom - hero.size().height / 2;
    this.distance = this.x;
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.parentNode.appendChild(this.el);
  }
  moveBullet() {
    let setRotate = "";

    if (this.bulletDirection === "left") {
      this.distance -= this.speed;
      setRotate = "rotate(180deg)";
    } else {
      this.distance += this.speed;
    }

    this.el.style.transform = `translate(${this.distance}px, ${this.y}px) ${setRotate}`;
    this.crashBullet();
  }
  position() {
    /* position Object를 리턴 */
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().bottom,
    };
  }
  /* 충돌 처리 */
  crashBullet() {
    /* bullet이 monster 내에 있을때 bullet 삭제 */
    if (
      this.position().left > monster.position().left &&
      this.position().right < monster.position().right
    ) {
      /* 2022-09-18 crash bullet effect 수정 */
      this.crashBulletEffect();
      /* 끝 */
      for (let i = 0; i < bulletComProp.arr.length; i++) {
        /* 지금 충돌한 bullet을 찾았다면 그것을 arr배열에서 삭제 */
        if (bulletComProp.arr[i] === this) {
          bulletComProp.arr.splice(i, 1);
          this.el.remove();
          console.log(bulletComProp.arr);
        }
      }
    }

    /* bullet이 화면을 벗어났을 경우 없애기 */
    if (
      this.position().left > gameProp.screenWidth ||
      this.position().right < 0
    ) {
      for (let i = 0; i < bulletComProp.arr.length; i++) {
        /* 지금 충돌한 bullet을 찾았다면 그것을 arr배열에서 삭제 */
        if (bulletComProp.arr[i] === this) {
          bulletComProp.arr.splice(i, 1);
          this.el.remove();
          console.log(bulletComProp.arr);
        }
      }
    }
  }
  /* 2022-09-18 crashBulletEffect 처리 */
  crashBulletEffect() {
    this.elCrashBox = document.querySelector(".hero_bullet_crash_box");
    this.elCrashEffect = document.createElement("div");
    this.elCrashEffect.className = "hero_bullet_crash";

    this.elCrashBox.appendChild(this.elCrashEffect);
  }
}

class Monster {
  constructor() {
    /* div.game을 부모 엘리먼트로 설정 */
    this.parentNode = document.querySelector(".game");
    /* div.monster_box 엘리먼트 생성 */
    this.el = document.createElement("div");
    this.el.className = "monster_box";
    /* 자식 div.monster 엘리먼트 생성 */
    this.elChildren = document.createElement("div");
    this.elChildren.className = "monster";
    /* monster 체력 관리 */
    this.hpNode = document.createElement("div");
    this.hpNode.className = "hp";
    this.hpValue = 1000;

    this.init();
  }
  init() {
    /* el 엘리먼트에 elChildren 엘리먼트를 자식으로 추가 */
    this.el.appendChild(this.elChildren);
    /* parentNode 엘리먼트에 el 엘리먼트를 자식으로 추가 */
    this.parentNode.appendChild(this.el);
  }
  position() {
    /* position Object를 리턴 */
    return {
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHeight - this.el.getBoundingClientRect().bottom,
    };
  }
}

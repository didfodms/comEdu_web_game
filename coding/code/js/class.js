/* npc 클래스 만들기 */
class Npc {
  constructor() {
    this.parentNode = document.querySelector(".game");
    this.el = document.createElement("div");
    this.el.className = "npc_box";
    this.npcCrash = false;
    this.talkOn = false;
    this.modal = document.querySelector(".quest_modal");

    this.init();
  }
  init() {
    let npcTalk = "";
    npcTalk += '<div class="talk_box">';
    npcTalk +=
      "<p>큰일이야..<br>사람들이 좀비로 변하고 있어..<br><span>대화 Enter</span></p>";
    npcTalk += "</div>";
    npcTalk += '<div class="npc"></div>';

    this.el.innerHTML = npcTalk;
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
  crash() {
    if (
      hero.position().right >= this.position().left &&
      hero.position().left <= this.position().right
    ) {
      this.npcCrash = true;
    } else {
      this.npcCrash = false;
    }
  }
  talk() {
    if (!this.talkOn && this.npcCrash) {
      this.talkOn = true;
      this.quest();
      this.modal.classList.add("active");
    } else if (this.talkOn) {
      this.talkOn = false;
      this.modal.classList.remove("active");
    }
  }
  quest() {
    let text = "";
    text += '<figure class="npc_img">';
    text += '<img src="../../lib/images/npc.png" alt="" />';
    text += "</figure>";
    text +=
      "<p>마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터를사냥해 주민을 구하고 <span>레벨을 5이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄게!!</p>";
    const modalInner = document.querySelector(
      ".quest_modal .inner_box .quest_talk"
    );
    modalInner.innerHTML = text;
  }
}

/* stage 클래스 만들기 */
class Stage {
  constructor() {
    this.level = 0;
    this.isStart = false;
    //this.stageStart();
  }
  /*   stageStart() {
    setTimeout(() => {
      this.isStart = true;
      this.stageGuide(`START LEVEL${this.level + 1}`);
      this.callMonster();
    }, 2000);
  } */
  stageGuide(text) {
    this.parentNode = document.querySelector(".game_app");
    this.textBox = document.createElement("div");
    this.textBox.className = "stage_box";
    this.textNode = document.createTextNode(text);
    this.textBox.appendChild(this.textNode);
    this.parentNode.appendChild(this.textBox);

    setTimeout(() => this.textBox.remove(), 1500);
  }
  callMonster() {
    for (let i = 0; i <= 10; i++) {
      if (i === 10) {
        allMonsterComProp.arr[i] = new Monster(
          stageInfo.monster[this.level].bossMon,
          hero.movex + gameProp.screenWidth + 600 * i
        );
      } else {
        allMonsterComProp.arr[i] = new Monster(
          stageInfo.monster[this.level].defaultMon,
          hero.movex + gameProp.screenWidth + 700 * i
        );
      }
    }
  }
  clearCheck() {
    stageInfo.callPosition.forEach((arr) => {
      // 히어로 이동 값이 스테이지의 마지막 몬스터 첫 소환위치를 넘고 + 몬스터를 다 사냥했을 경우
      if (hero.movex >= arr && allMonsterComProp.arr.length === 0) {
        this.stageGuide("곧 몬스터가 몰려옵니다!");
        stageInfo.callPosition.shift();

        setTimeout(() => {
          this.callMonster();
          this.level++;
        }, 1000);
      }
    });
    /*     if (allMonsterComProp.arr.length === 0 && this.isStart) {
      this.isStart = false;
      this.level++;
      if (this.level < stageInfo.monster.length) {
        this.stageGuide("CLEAR!!");
        this.stageStart();
        hero.heroUpgrade();
      } else {
        this.stageGuide("ALL CLEAR!!");
      }
    } */
  }
}

/* hero 클래스 만들기 */
class Hero {
  constructor(el) {
    this.el = document.querySelector(el);
    this.movex = 0;
    this.speed = 11;
    this.direction = "right";
    this.attackDamage = 10000;
    /* 히어로 체력 백분율로 */
    this.hpProgress = 0;
    this.hpValue = 100000;
    this.defaultHpValue = this.hpValue;
    this.realDamage = 0;
    /* 슬라이드 동작 */
    this.slideSpeed = 14;
    this.slideTime = 0;
    this.slideMaxTime = 30;
    this.slideDown = false;
    /* 레벨업 관련 */
    this.level = 1;
    this.exp = 0;
    this.maxExp = 3000;
    this.expProgress = 0;
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

    if (key.keyDown["slide"]) {
      if (!this.slideDown) {
        this.el.classList.add("slide");
        if (this.direction === "right") {
          this.movex = this.movex + this.slideSpeed;
        } else {
          this.movex = this.movex - this.slideSpeed;
        }

        if (this.slideTime > this.slideMaxTime) {
          this.el.classList.remove("slide");
          this.slideDown = true;
        }
        this.slideTime += 1;
      }
    }

    if (!key.keyDown["left"] && !key.keyDown["right"]) {
      this.el.classList.remove("run");
    }

    if (!key.keyDown["attack"]) {
      this.el.classList.remove("attack");
      bulletComProp.launch = false;
    }

    // slide 키 떼면 지움
    if (!key.keyDown["slide"]) {
      this.el.classList.remove("slide");
      this.slideDown = false;
      this.slideTime = 0;
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
  /* 체력 마이너스 */
  minusHp(monsterDamage) {
    this.hpValue = Math.max(0, this.hpValue - monsterDamage);

    /* hero의 체력이 깎일 때 충돌 모션 */
    this.crash();
    /* hero 체력이 0일때 죽음 */
    if (this.hpValue === 0) {
      this.dead();
    }
    this.renderHp();
  }
  plusHp(hp) {
    this.hpValue = hp;
    this.renderHp();
  }
  /* 체력 게이지바 render */
  renderHp() {
    this.hpProgress = (this.hpValue / this.defaultHpValue) * 100;
    const heroHpBox = document.querySelector(".state_box .hp span");
    heroHpBox.style.width = this.hpProgress + "%";
  }
  crash() {
    this.el.classList.add("crash");
    setTimeout(() => this.el.classList.remove("crash"), 400);
  }
  dead() {
    hero.el.classList.add("dead");
    endGame();
  }
  // hero 공격 데미지 랜덤값
  hitDamage() {
    this.realDamage =
      this.attackDamage - Math.round(Math.random() * this.attackDamage * 0.1);
  }
  heroUpgrade() {
    this.attackDamage += 5000;
  }
  updateExp(exp) {
    this.exp += exp;
    this.expProgress = (this.exp / this.maxExp) * 100;
    document.querySelector(".hero_state .exp span").style.width =
      this.expProgress + "%";
    console.log("current exp : " + this.expProgress);
    if (this.exp >= this.maxExp) {
      this.levelUp();
    }
  }
  levelUp() {
    this.level += 1;
    this.exp = 0;
    this.maxExp = this.maxExp + this.level * 1000;
    document.querySelector(".level_box strong").innerText = this.level;
    const levelGuide = document.querySelector(".hero_box .level_up");
    levelGuide.classList.add("active");

    setTimeout(() => levelGuide.classList.remove("active"), 1000);
    this.updateExp(this.exp);
    this.heroUpgrade();
    this.plusHp(this.defaultHpValue);
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
    for (let j = 0; j < allMonsterComProp.arr.length; j++) {
      if (
        this.position().left > allMonsterComProp.arr[j].position().left &&
        this.position().right < allMonsterComProp.arr[j].position().right
      ) {
        /* 2022-09-18 crash bullet effect 수정 */
        this.crashBulletEffect();
        /* 끝 */

        for (let i = 0; i < bulletComProp.arr.length; i++) {
          /* 지금 충돌한 bullet을 찾았다면 그것을 arr배열에서 삭제 */
          if (bulletComProp.arr[i] === this) {
            hero.hitDamage();
            bulletComProp.arr.splice(i, 1);
            this.el.remove();
            this.damageView(allMonsterComProp.arr[j]);
            /* 충돌했다면 monster의 updateHp */
            allMonsterComProp.arr[j].updateHp(j);
          }
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
        }
      }
    }
  }
  damageView(monster) {
    this.parentNode = document.querySelector(".game_app");
    this.textDamageNode = document.createElement("div");
    this.textDamageNode.className = "text_damage";
    this.textDamage = document.createTextNode(hero.realDamage);
    this.textDamageNode.appendChild(this.textDamage);
    this.parentNode.appendChild(this.textDamageNode);
    let textPosition = Math.random() * -100;
    let damagex = monster.position().left + textPosition;
    let damagey = monster.position().top;

    this.textDamageNode.style.transform = `translate(${damagex}px, ${-damagey}px)`;
    setTimeout(() => this.textDamageNode.remove(), 500);
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
  constructor(property, positionX) {
    /* div.game을 부모 엘리먼트로 설정 */
    this.parentNode = document.querySelector(".game");
    /* div.monster_box 엘리먼트 생성 */
    this.el = document.createElement("div");
    this.el.className = "monster_box " + property.name;
    /* 자식 div.monster 엘리먼트 생성 */
    this.elChildren = document.createElement("div");
    this.elChildren.className = "monster";
    /* monster 체력 관리 */
    this.hpNode = document.createElement("div");
    this.hpNode.className = "hp";
    /* 현재 monster 체력 */
    this.hpValue = property.hpValue;
    /* 전체 monster 체력 */
    this.defaultHpValue = property.hpValue;
    this.hpInner = document.createElement("span");
    /* 깎인 체력 비율 */
    this.progress = 0;
    /* 몬스터 초기 위치 */
    this.positionX = positionX;
    this.moveX = 0;
    this.speed = property.speed;
    /* 몬스터 충돌 데미지 */
    this.crashDamage = property.crashDamage;
    this.score = property.score;
    /* 몬스터 경험치 */
    this.exp = property.exp;

    this.init();
  }
  init() {
    /* hp관련 textnode 추가 */
    this.hpNode.appendChild(this.hpInner);
    /* 몬스터 박스에 hp 추가 */
    this.el.appendChild(this.hpNode);
    /* el 엘리먼트에 elChildren 엘리먼트를 자식으로 추가 */
    this.el.appendChild(this.elChildren);
    /* parentNode 엘리먼트에 el 엘리먼트를 자식으로 추가 */
    this.parentNode.appendChild(this.el);
    /* positionX 몬스터 위치값을 몬스터 element에 대입 */
    this.el.style.left = this.positionX + "px";
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
  updateHp(index) {
    this.hpValue = Math.max(0, this.hpValue - hero.realDamage);
    this.progress = (this.hpValue / this.defaultHpValue) * 100;
    this.el.children[0].children[0].style.width = this.progress + "%";

    if (this.hpValue === 0) {
      this.dead(index);
    }
  }
  dead(index) {
    this.el.classList.add("remove");
    /* 0.2s 뒤에 삭제 (이유 : css에서 transition 0.2s로 설정함) */
    setTimeout(() => this.el.remove(), 200);
    allMonsterComProp.arr.splice(index, 1);
    this.setScore();
    this.setExp();
  }
  moveMonster() {
    /* 몬스터가 화면에서 왼쪽으로 벗어나면 */
    if (
      this.moveX +
        this.positionX +
        this.el.offsetWidth +
        hero.position().left -
        hero.movex <=
      0
    ) {
      this.moveX =
        hero.movex -
        this.positionX +
        gameProp.screenWidth -
        hero.position().left;
    } else {
      this.moveX -= this.speed;
    }

    this.el.style.transform = `translateX(${this.moveX}px)`;
    /* hero와 충돌했는지 체크 */
    this.crash();
  }
  crash() {
    /* hero div와 monster div의 여백 차이 조정
       이 부분 조정해서 여백 조절하기 */
    let rightDiff = 90;
    let leftDiff = 90;
    if (
      hero.position().right - rightDiff > this.position().left &&
      hero.position().left + leftDiff < this.position().right
    ) {
      hero.minusHp(this.crashDamage);
    }
  }
  setScore() {
    stageInfo.totalScore += this.score;
    document.querySelector(".score_box").innerText = stageInfo.totalScore;
  }
  setExp() {
    hero.updateExp(this.exp);
  }
}

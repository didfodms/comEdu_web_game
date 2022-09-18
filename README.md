# comEdu_web_game

컴퓨터교육과 전시회 웹 인터렉티브 게임 개발 레포지토리 입니다.

## 코드 수정 사항 (22.09.18)

---

### 1. bg_top.png를 움직이게 함

- bg_top.png의 1/6만큼 움직여 패럴럭스 효과를 줌

```js
gameBackground.gameSky.style.transform = `translateX(${parallaxValue / 6}px)`;
```

### 2. 캐릭터 모션 속도 조절 (will-change 속성 추가)

- will-change 속성 추가

> will-change?
> css로 변화될 엘리먼트 속성 값을 브라우저에서 미리 준비하여 더욱 부드러운 효과 적용

- 히어로, 배경, 무기, 몬스터 등에 적용

#### 엘리먼트 속도 조절

- 히어로 : 11
- 무기 : 20
- 배경 : 히어로 / 4
- 배경2 : 배경 / 3 (히어로 / 12)
- 배경3 : 배경 / 6 (히어로 / 24)

### 3. 버그 수정

1. 달리는 모션 수정
   x키 (공격키)를 누르면서 달릴 경우, 달리는 모션이 나오지 않는 버그 수정
   -> 달리면서 공격하는 이미지 제작

2. 무기 초기 위치 수정
   왼쪽으로 무기를 던질 경우, 위치가 어색한 문제 수정

   - 수정 전

   ```js
   this.x = hero.movex + hero.size().width / 2;
   ```

   - 수정 후

   ```js
   this.x =
     this.bulletDirection === "right"
       ? hero.movex + hero.size().width / 2
       : hero.movex - hero.size().width / 2;
   ```

3. 최소 화면 크기 설정

   - 화면 최소 넓이 : 1280px

4. 캐릭터 움직임 범위 설정

   - 왼쪽 화면 끝을 넘어가는 버그 수정
   - class.js의 hero class 수정
   - 수정 전

   ```js
   this.movex = this.movex - this.speed;
   ```

   - 수정 후

   ```js
   this.movex = this.movex < 0 ? 0 : this.movex - this.speed;
   ```

5. 악당 monster 추가

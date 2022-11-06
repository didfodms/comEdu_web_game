const levelQuest = {
  //원래 4500
  positionX: 500,
  idleMessage:
    "<p>큰일이야..<br>사람들이 좀비로 변하고 있어..<br><span>대화 Enter</span></p>",
  quest: () => {
    const level = 5;
    const message = {
      // 처음
      start: `마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터를사냥해 주민을 구하고 <span>레벨을 ${level}이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄게!!`,
      // 퀘스트 진행 중
      ing: "이런 아직 레벨을 달성하지 못했구나..",
      // 성공
      suc: "레벨을 달성했구나! 힘을 줄게!",
      // 이미 퀘스트 완료했는데 다시 말 검
      end: "고마워! 행운을 빌어!",
    };

    let messageState = "";

    if (!npcComProp.arr[0].questStart) {
      messageState = message.start;
      npcComProp.arr[0].questStart = true;
    } else if (
      npcComProp.arr[0].questStart &&
      !npcComProp.arr[0].questEnd &&
      hero.level < level
    ) {
      messageState = message.ing;
    } else if (
      npcComProp.arr[0].questStart &&
      !npcComProp.arr[0].questEnd &&
      hero.level >= level
    ) {
      messageState = message.suc;
      npcComProp.arr[0].questEnd = true;
      hero.heroUpgrade(50000);
    } else if (npcComProp.arr[0].questStart && npcComProp.arr[0].questEnd) {
      messageState = message.end;
    }

    let text = "";
    text += '<figure class="npc_img">';
    text += '<img src="../../lib/images/npc_profile.png" alt="" />';
    text += "</figure>";
    text += "<p>";
    text += messageState;
    text += "</p>";
    const modalInner = document.querySelector(
      ".quest_modal .inner_box .quest_talk"
    );
    modalInner.innerHTML = text;
  },
};

const levelQuestTwo = {
  positionX: 8500,
  idleMessage: "<p>곧 좀비왕이 부활하려고해..<span>대화 Enter</span></p>",
  quest: () => {
    const level = 7;
    const message = {
      // 처음
      start: `마을에 몬스터가 출몰해 주민들을 좀비로 만들고 있어.. 몬스터를사냥해 주민을 구하고 <span>레벨을 ${level}이상</span>으로 만들어 힘을 증명한다면 좀비왕을 물리칠 수 있도록 내 힘을 빌려줄게!!`,
      // 퀘스트 진행 중
      ing: "이런 아직 레벨을 달성하지 못했구나..",
      // 성공
      suc: "레벨을 달성했구나! 힘을 줄게!",
      // 이미 퀘스트 완료했는데 다시 말 검
      end: "고마워! 행운을 빌어!",
    };

    let messageState = "";

    if (!npcComProp.arr[1].questStart) {
      messageState = message.start;
      npcComProp.arr[1].questStart = true;
    } else if (
      npcComProp.arr[1].questStart &&
      !npcComProp.arr[1].questEnd &&
      hero.level < level
    ) {
      messageState = message.ing;
    } else if (
      npcComProp.arr[1].questStart &&
      !npcComProp.arr[1].questEnd &&
      hero.level >= level
    ) {
      messageState = message.suc;
      npcComProp.arr[1].questEnd = true;
      hero.heroUpgrade(70000);
    } else if (npcComProp.arr[1].questStart && npcComProp.arr[1].questEnd) {
      messageState = message.end;
    }

    let text = "";
    text += '<figure class="npc_img">';
    text += '<img src="../../lib/images/npc_profile.png" alt="" />';
    text += "</figure>";
    text += "<p>";
    text += messageState;
    text += "</p>";
    const modalInner = document.querySelector(
      ".quest_modal .inner_box .quest_talk"
    );
    modalInner.innerHTML = text;
  },
};

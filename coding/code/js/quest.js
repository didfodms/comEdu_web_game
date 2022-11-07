const questionComProp = {
  submittedIndex: [],
  arr: [
    {
      question: "제주대학교 컴퓨터교육과가 신설된 년도는?",
      option: ["1990년", "1993년", "1995년", "2000년"],
      answer: "1995년",
    },
    {
      question: "다음중 미국 IT 기업이 아닌 것은?",
      option: ["애플", "아마존", "구글", "노키아"],
      answer: "노키아",
    },
    {
      question: "최초의 컴퓨터는 언제 발명되었을까?",
      option: ["1890년", "1924년", "1943년", "1955년"],
      answer: "1943년",
    },
    {
      question: "최초의 컴퓨터 이름은?",
      option: ["매킨토시", "애니악", "IBM 650", "ABC"],
      answer: "ABC",
    },
    {
      question:
        "컴퓨터에 단기 실행 프로그램과 데이터를 저장하는 데 사용되는 정보 저장소는?",
      option: ["GPU", "CPU", "RAM", "SSD"],
      answer: "RAM",
    },
    {
      question: "USB 포트를 발명한 회사의 이름은?",
      option: ["인텔", "삼성", "애플", "알파벳"],
      answer: "인텔",
    },
    {
      question: "제주대학교가 창립된 년도는?",
      option: ["1943년", "1952년", "1955년", "1968년"],
      answer: "1952년",
    },
    {
      question: "다음 중 제주대학교 컴퓨터교육과의 전공필수 과목이 아닌것은?",
      option: ["컴퓨팅영어", "SW개발기초", "멀티미디어", "미디어의이해"],
      answer: "미디어의이해",
    },
    {
      question: "다음 중 카카오 주식회사의 창업자는?",
      option: ["안철수", "김범수", "김철수", "최수연"],
      answer: "김범수",
    },
    {
      question: "전국의 개설되어있는 컴퓨터교육과 개수는?",
      option: ["6개", "7개", "8개", "10개"],
      answer: "8개",
    },
    {
      question: "다음 중 제주대학교 컴퓨터교육과 교수님이 아닌 사람은?",
      option: ["파이썬", "C", "JAVA", "LUNA"],
      answer: "LUNA",
    },
    {
      question: "다음 중 블록체인 기술과 연관이 없는 것은?",
      option: ["암호화폐", "NFT", "PSP", "금융 시스템"],
      answer: "PSP",
    },
    {
      question: "다음 중 C언어의 5가지 기본 정수형이 아닌 것은?",
      option: ["char", "short", "long", "middle"],
      answer: "middle",
    },
    {
      question: "다음 중 C언어에서 사용되는 상수가 아닌 것은?",
      option: ["정수 상수", "부동형 상수", "유동형 상수", "문자 상수"],
      answer: "유동형 상수",
    },
    {
      question: "인스타그램의 첫 출시 년도는?",
      option: ["2008년", "2009년", "2010년", "2011년"],
      answer: "2010년",
    },
    {
      question: "다음 중 제주도에 있는 동네 이름이 아닌 것은?",
      option: ["아라동", "이도이동", "한남동", "구남동"],
      answer: "한남동",
    },
    {
      question: "최초의 컬러 디스플레이를 이용한 컴퓨터 시스템은?",
      option: ["애플 1", "IBM 1", "삼성 SENS", "애니악"],
      answer: "애플 1",
    },
    {
      question: "최초의 CPU를 개발한 회사는?",
      option: ["인텔", "애플", "AMD", "삼성"],
      answer: "인텔",
    },
    {
      question: "다음 중 파운드리 제조 기업이 아닌 것은?",
      option: ["TSMC", "삼성전자", "SMIC", "애플"],
      answer: "애플",
    },
  ],
};

const levelQuest1 = {
  //원래 4500
  positionX: 500,
  idleMessage:
    "<p>큰일이야..<br>사람들이 좀비로 변하고 있어..<br><span>대화 Enter</span></p>",
  quest: () => {
    const index = questionComProp.submittedIndex[0];
    const question = questionComProp.arr[index];
    const message = {
      // 처음
      start: `[문제 1]<br />${question.question}<br />
      <input type="radio" name="q1" /> ${question.option[0]}<br>
      <input type="radio" name="q1" /> ${question.option[1]}<br>
      <input type="radio" name="q1" /> ${question.option[2]}<br>
      <input type="radio" name="q1" /> ${question.option[3]}<br>`,
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
    } else if (npcComProp.arr[0].questStart && !npcComProp.arr[0].questEnd) {
      messageState = message.ing;
    } else if (npcComProp.arr[0].questStart && !npcComProp.arr[0].questEnd) {
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

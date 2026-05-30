import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, RotateCcw, Share2 } from "lucide-react";
import "./App.css";

const heroImageSrc = "/images/hero/title-main.png";
const heroBgImageSrc = "/images/hero/top-bg.png";

const characters = {
  A: {
    id: "A",
    name: "유하",
    reactionName: "병약미소년 유하",
    reactionImages: {
      plus2: "/images/reactions/yuha-plus2.png",
      plus1: "/images/reactions/yuha-plus1.png",
      zero: "/images/reactions/yuha-zero.png",
    },
    type: "지켜주고 싶은 병약 미소년",
    quote: "괜찮아요. 저 때문에 멈추지 마세요.",
    frontCardSrc: "/images/cards/yuha-front.png",
    backCardSrc: "/images/cards/yuha-back.png",
  },
  B: {
    id: "B",
    name: "이로",
    reactionName: "츤데레 수집광 이로",
    reactionImages: {
      plus2: "/images/reactions/iro-plus2.png",
      plus1: "/images/reactions/iro-plus1.png",
      zero: "/images/reactions/iro-zero.png",
    },
    type: "이상한 걸 주워오는 츤데레",
    quote: "주운 거 아니야. 필요한 거라서 챙긴 것 뿐이야.",
    frontCardSrc: "/images/cards/iro-front.png",
    backCardSrc: "/images/cards/iro-back.png",
  },
  C: {
    id: "C",
    name: "태오",
    reactionName: "투머치토커 생존전문가 태오",
    reactionImages: {
      plus2: "/images/reactions/taeo-plus2.png",
      plus1: "/images/reactions/taeo-plus1.png",
      zero: "/images/reactions/taeo-zero.png",
    },
    type: "말 많고 잘 삐지는 생존전문가",
    quote: "지금 삐진 거 아니라 생존 전략 설명중이라고요.",
    frontCardSrc: "/images/cards/taeo-front.png",
    backCardSrc: "/images/cards/taeo-back.png",
  },
  D: {
    id: "D",
    name: "서윤",
    reactionName: "치명적인 악역 서윤",
    reactionImages: {
      plus2: "/images/reactions/seoyoon-plus2.png",
      plus1: "/images/reactions/seoyoon-plus1.png",
      zero: "/images/reactions/seoyoon-zero.png",
    },
    type: "정치질 잘하는 비겁한 악역",
    quote: "착한 사람부터 죽는 세상이에요. 아직도 모르겠어요?",
    frontCardSrc: "/images/cards/seoyun-front.png",
    backCardSrc: "/images/cards/seoyun-back.png",
  },
};

const characterOrder = ["A", "D", "B", "C"];

const questions = [
  {
    id: 1,
    title: "좀비 사태 첫날",
    question:
      "좀비 사태 첫날, 당신은 편의점 안에 숨어 있습니다. 밖에서는 구조 요청 소리가 들립니다. 어떻게 할까요?",
    bgImage: "/images/question-bg-01.png",
    answers: [
      {
        text: "문을 열기 전에 주변 상황부터 확인한다",
        scoresByCharacter: { A: 1, B: 2, C: 2, D: 1 },
        reactions: {
          A: "무섭지만… 그래도 확인은 해봐야 하지 않을까요? 당신이 확인해줘요!",
          B: "성급하게 열면 우리도 끝이야. 비켜. 내가 확인할테니까.",
          C: "좋아요. 당신은 지금처럼만 해요. 판단은 느려도 안 되고, 가벼워도 안 돼요. 주변 상황부터 확인합시다. 내가 먼저 확인할게요.",
          D: "알아서 먼저 확인해주니 고맙네요. 그래도 위험한 선택을 굳이?",
        },
      },
      {
        text: "바로 문을 열고 사람을 들인다",
        scoresByCharacter: { A: 2, B: 0, C: -1, D: -2 },
        reactions: {
          A: "당신은 정말 망설이지 않는군요. 멋져요...",
          B: "바보야? 흠흠.. 그래도… 사람은 살렸네. 네가.",
          C: "저 사람, 딱 봐도 뭔가 수상해요. 그런데도 들여보내자고? 저 사람이 당신 타입이라서 그런 건 아니죠? 거동도 수상하고 좀비한테 물린 것 같은데? ",
          D: "그렇게 사람을 들이다가 우리까지 죽으면요? 당장 문 잠가요.",
        },
      },
      {
        text: "모른 척하고 조용히 숨는다",
        scoresByCharacter: { A: -1, B: 0, C: 1, D: 2 },
        reactions: {
          A: "살아남는 게 먼저인 건… 맞아요..그치만..",
          B: "조용히 있는 게 나을 때도 있어. 저 사람 참 안됐네.",
          C: "냉정하지만 틀린 판단은 아니에요. 저 사람이 좀비에 감염되었을수도 있고, 아니면 외부에서 온 약탈자일수도 있죠. 항상 조심해야해요.",
          D: "좋은 선택이에요. 빨리 문 잠가요. 지금 이 세상에선 죄책감보다 내 생명이 먼저니까.",
        },
      },
    ],
  },
  {
    id: 2,
    title: "식량 창고 발견",
    question:
      "당신과 그가 식량 창고를 발견했습니다. 하지만 양이 많지 않습니다. 어떻게 나눌까요?",
      bgImage: "/images/question-bg-02.png",
    answers: [
      {
        text: "둘이 먹을 만큼만 챙긴다",
        scoresByCharacter: { A: 1, B: 2, C: 2, D: 0 },
        reactions: {
          A: "이 정도면 충분해요.. 당신도 꼭 먹어야 해요..!",
          B: "적당히 챙기는 게 제일 좋아. 몸이 가벼워야 이동도 쉬우니까. 혹시라도 네가 다치면 내가 널 업어야하잖아.",
          C: "좋아요. 감정이 아니라 계산으로 움직여야 해요. 식량은 어떻게든 내가 또 구할 수 있으니까. 적당히가 제일 좋아요. 당신이 원하면 다람쥐라도 잡아서 구워줄게요.",
          D: "그 정도로 만족해요? 생각보다 욕심이 없네요.",
        },
      },
      {
        text: "최대한 많이 챙긴다",
        scoresByCharacter: { A: -1, B: 1, C: 1, D: 2 },
        reactions: {
          A: "욕심이 너무 많은 거 아니에요..? 다 가져갈수는 있어요..?",
          B: "욕심이긴 한데. 필요할 때 없으면 생각날 것 같긴 해.",
          C: "많이 챙기는 건 맞지만, 들고 뛸 수 있는 양이어야 해요. 저번에 김씨아저씨도 욕심부리다가 늦어져서 잘못됬잖아요. 조심해야해요. ",
          D: "좋아요. 살아남는 사람은 늘 조금 더 챙기는 사람이에요.",
        },
      },
      {
        text: "다른 생존자 몫도 남겨두기 위해 식량을 약간만 챙긴다",
        scoresByCharacter: { A: 2, B: 0, C: -1, D: -2 },
        reactions: {
          A: "당신은 이런 세상에서도 변하지 않는 좋은사람 같아요..",
          B: "남겨둔다고 누가 고마워할 것 같아?",
          C: "선의는 좋지만, 식량 부족은 바로 생존율 하락이에요. 빨리 가방에 담아요. 시간 없어요.",
          D: "이걸 다 남겨둔다고요? 누가 고마워할 것 같아요?",
        },
      },
    ],
  },
  {
    id: 3,
    title: "밤이 깊어졌다",
    question:
      "밤이 깊어졌습니다. 좀비 소리가 가까워지고 있습니다. 어디서 쉴까요?",
      bgImage: "/images/question-bg-03.png",
    answers: [
      {
        text: "시야가 확보되는 2층 매장에 숨자고 한다",
        scoresByCharacter: { A: 0, B: 1, C: 2, D: 1 },
        reactions: {
          A: "괜찮아요.. 조금만 쉬면 다시 걸을 수 있어요..",
          B: "위에서 보면 뭐가 오는지 알 수 있겠네. 흠흠. 꽤 영리하네.",
          C: "정답. 시야 확보, 퇴로 확인, 소음 관리까지 가능해요. 나랑 다니더니 많이 늘었네요? 병아리씨. (쓰담쓰담)",
          D: "위에서 내려다보는 건 늘 유리하죠.",
        },
      },
      {
        text: "몸을 숨기기 쉬운 창고 안에 들어가자고 한다",
        scoresByCharacter: { A: 2, B: 1, C: 0, D: 1 },
        reactions: {
          A: "정말 고마워요.. 사실… 조금 어지러웠어요..",
          B: "나쁘지 않아. 걸리적 거리지 말고 비켜. 여긴 내가 망 볼게.",
          C: "창고는 막히면 끝이에요. 그래도 잠깐이면, 그것도 나랑 함께면 괜찮긴 하겠죠.",
          D: "좁은 곳은 위험하지만, 숨기엔 좋네요.",
        },
      },
      {
        text: "쉬지 않고 이동을 계속한다",
        scoresByCharacter: { A: -2, B: 0, C: -1, D: 1 },
        reactions: {
          A: "저 다리가 떨려요..콜록콜록..욱..(피를 토한다)",
          B: "계속 간다고? 네가 먼저 쓰러지면 내가 업고 가야 해?",
          C: "밤에 이동하는 건 최악이에요. 진짜 최.악.",
          D: "멈추지 않는 사람은 적어도 잠든 사람보단 오래 생존하죠.",
        },
      },
    ],
  },
  {
    id: 4,
    title: "위험한 물건 선택",
    question:
      "그가 위험한 물건 세 가지를 들고 옵니다. 오래된 무전기, 피 묻은 열쇠, 정체 모를 약. 하나만 챙길 수 있다면?",
      bgImage: "/images/question-bg-04.png",
    answers: [
      {
        text: "무전기를 고른다",
        scoresByCharacter: { A: 0, B: 1, C: 2, D: 0 },
        reactions: {
          A: "누군가 살아 있다면… 연결될 수도 있겠네요.",
          B: "위험할 때 소리만 안 나면, 쓸 만하겠네.",
          C: "무전기죠. 정보가 곧 생존이에요. 조작법은 걱정마요. 내가 특수부대 출신이라 잘 알아요. 병아리씨는 내 곁에 붙어만 있으면 걱정없어요.(웃음)",
          D: "연결된 사람이 구조대일지 약탈자일지 모르죠.",
        },
      },
      {
        text: "열쇠를 고른다",
        scoresByCharacter: { A: 0, B: 2, C: 1, D: 2 },
        reactions: {
          A: "그 열쇠가 어디 문을 여는 걸까요?",
          B: "열쇠. 이런 건 언젠가 꼭 쓰여.",
          C: "열쇠도 나쁘지 않아요. 잠긴 공간은 곧 자원일 가능성이 높으니까. 또 그 공간에 중요한 걸 보관할 수도 있잖아요. 잘 챙겨요. 필요할 때 사용합시다.",
          D: "닫힌 문 뒤엔 늘 누군가 숨겨둔 게 있죠.",
        },
      },
      {
        text: "약을 고른다",
        scoresByCharacter: { A: 2, B: 0, C: -1, D: -1 },
        reactions: {
          A: "약… 혹시 나 때문에 고른거에요? 고마워요.. 당신은 정말..",
          B: "정체도 모르는 약을 왜 챙겨?",
          C: "무슨 약인줄은 알아요? 성분 모르는 약은 위험해요. 함부로 먹으면 안 됩니다. 어릴 때 안배웠어요? 아무거나 먹지 말라고?",
          D: "정체 모를 약이라… 누군가에게 실험해볼 수도 있겠네요.",
        },
      },
    ],
  },
  {
    id: 5,
    title: "수상한 생존자 무리",
    question:
      "다른 생존자 무리가 합류를 제안합니다. 하지만 분위기가 어딘가 수상합니다. 어떻게 할까요?",
      bgImage: "/images/question-bg-05.png",
    answers: [
      {
        text: "일단 거리를 두고 관찰하자고 한다",
        scoresByCharacter: { A: 1, B: 2, C: 2, D: 1 },
        reactions: {
          A: "사람이 제일 무서울 때도 있네요...",
          B: "그래. 웃는 얼굴이라고 다 믿으면 안 돼. 신뢰할 수 있는 사람만 믿어. (작게 속삭인다)나같은..",
          C: "일단은 관찰 먼저. 합류는 그 다음이 맞아요. 아주 정상적인 판단이에요. 역시 내 옆에서 많이 배웠네요. 이 병아리. 이제 졸업시켜도 되겠네. 풋.",
          D: "괜찮은 판단이에요. 사람은 가까이서 보면 더 잘 들키거든요.",
        },
      },
      {
        text: "함께 움직이자고 한다",
        scoresByCharacter: { A: 2, B: 0, C: -1, D: -2 },
        reactions: {
          A: "그래도 사람이 많은게 더 나을 수도 있지 않을까요? 혹시 위험해져도 당신이 날 지켜줄거니까..",
          B: "네가 믿고 싶다면 말리진 않겠는데, 난 계속 지켜볼 거야.",
          C: "정보도 없이 합류요? 그건 전략이 아니라 도박이에요. 저 사람들이 누구고 어떤 사람인줄 알고요? 식량을 약탈해가면요? 우리를 공격하면요?",
          D: "의심도 안하네요. 위험하다는 생각은 안해봤어요?",
        },
      },
      {
        text: "몰래 그들의 물자를 훔치고 떠나자고 한다",
        scoresByCharacter: { A: -2, B: 0, C: -1, D: 2 },
        reactions: {
          A: "그건… 너무 위험하고 슬픈 선택이에요..(째릿)",
          B: "그런 짓까지 할 필요는 없잖아.",
          C: "물자 절도는 리스크가 너무 커요. 나중에 추적당하고 보복할수도 있고요. 그건 너무 바보같은 생각이에요. 아직 멀었네요.",
          D: "훔치고 떠난다라… 이제야 조금 배워가네요. 당신이 훔쳐와요. 내가 망볼테니.",
        },
      },
    ],
  },
  {
    id: 6,
    title: "그가 다쳤다",
    question:
      "이동 중 그가 다쳤습니다. 좀비 떼가 가까워지고 있습니다. 어떻게 할까요?",
      bgImage: "/images/question-bg-06.png",
    answers: [
      {
        text: "그를 부축하고 함께 도망친다",
        scoresByCharacter: { A: 2, B: 2, C: 0, D: 1 },
        reactions: {
          A: "저 때문에… 당신까지 위험해지면 안 되는데...고마워요..그래도 함께라서 좋네요..",
          B: "나 두고 가도 되는 데. 뭐 이렇게 까지. 흠흠. ..너 좀 따뜻하네.",
          C: "날 생각하는 마음은 알겠는데 속도가 너무 느려져요. 이러다 둘 다 죽음. 날 버리고 가요. 난 이구역의 생존킹이에요. 알아서 숨어있다가 따라갈게요",
          D: "날 버리지 않는군요. 손해 보는 선택인데. 흥미롭네요.",
        },
      },
      {
        text: "근처 건물로 숨어 응급처치한다",
        scoresByCharacter: { A: 2, B: 1, C: 2, D: 0 },
        reactions: {
          A: "고마워요. 당신 손이 이상하게 따뜻해요..(당신의 손을 볼에 가져다 댄다)",
          B: "네가 봐주면 덧나는 건 아니겠지? ㅋㅋ농담이야.",
          C: "응급처치 먼저. 출혈량 확인하고, 이동은 그 다음이에요.이야. 이제 완전 숙지했네요. 혼자 다녀도 되겠어요. 그래도 아직은 병아리라서 내가 지켜줘야하니까. 후후.",
          D: "치료해주는 건 고맙지만, 여기 계속 머물면 둘 다 죽어요.",
        },
      },
      {
        text: "잠시 떨어져 미끼를 던지고 돌아온다",
        scoresByCharacter: { A: -1, B: 1, C: 1, D: 2 },
        reactions: {
          A: "잠깐 떨어지는 거죠? 정말… 돌아오는 거죠?",
          B: "미끼? 너 생각보다 머리 쓰네. 조금 놀랐어.",
          C: "좋아요. 소리 유도 후 이동. 위험하지만 가능한 전략이에요. 많이 똑똑해졌네요.",
          D: "좋아요. 누군가를 속일 줄 아는 사람은 오래 생존하죠.",
        },
      },
    ],
  },
  {
    id: 7,
    title: "두 갈래 길",
    question: "안전지대로 가는 길이 두 갈래입니다. 어느 길로 갈까요?",
    bgImage: "/images/question-bg-07.png",
    answers: [
      {
        text: "멀지만 조용한 산길로 가자고 한다",
        scoresByCharacter: { A: 1, B: 1, C: 2, D: 0 },
        reactions: {
          A: "좋아요.. 더 빠른 길로 갈 수도 있는데.. 나 때문에..? 고마워요..(얼굴을 붉힌다)",
          B: "멀어도 조용한 게 나아. 근데 산에 올라서 징징거리면 안봐준다ㅋㅋ",
          C: "정답. 빠른 길은 보통 죽는 길이에요. 물론 나같은 사람이랑 함께가면 어떻게든 헤쳐나갈 수는 있지만 안전한 길이 최고죠. 용맹한 병아리네요.",
          D: "조용한 길은 좋지만, 멀다라.. 빨리 탈출하고 싶지는 않아요?",
        },
      },
      {
        text: "빠르지만 좀비가 많은 도심으로 간다",
        scoresByCharacter: { A: -1, B: 0, C: -2, D: 1 },
        reactions: {
          A: "빠른 길이 좋긴 하지만.. 무서워요...",
          B: "도심은 물자는 많겠지만, 죽을 확률도 높아.",
          C: "도심이요? 좀비 밀도, 소음, 퇴로 부족. 최악의 조합이에요. 씁. 뭘 배운건지.",
          D: "위험한 곳이지만 뭔가 이용할 거리는 많겠네요. 당신이 앞장서요.",
        },
      },
      {
        text: "다른 생존자들이 간 길을 따라간다",
        scoresByCharacter: { A: 0, B: 0, C: -1, D: 2 },
        reactions: {
          A: "사람들이 간 길이면 조금 안심되긴 해요..",
          B: "남들이 간 길이라고 안전한 건 아니야.",
          C: "다른 생존자들이 맞는 판단을 했다는 보장이 없어요. 이미 그 사람들 시체로 뒤덮여 있을 수도 있고..",
          D: "남들이 간 길이면 뭔가 힌트가 있겠죠. 다른 사람들을 만나면 도움이 될 수도 있고?",
        },
      },
    ],
  },
  {
    id: 8,
    title: "폐병원의 밤",
    question:
      "폐병원에서 하룻밤을 보내게 됐습니다. 그가 조용히 묻습니다. “무서워요?”",
      bgImage: "/images/question-bg-08.png",
    answers: [
      {
        text: "무섭지만 너랑 있으면 괜찮아.",
        scoresByCharacter: { A: 2, B: 2, C: 0, D: -1 },
        reactions: {
          A: "그 말… 조금 반칙이에요..(코피 주륵..)",
          B: "갑자기 그런 말 하지 마. 속 안좋게.(뒤돌아 함박웃음)",
          C: "감정 공유는 좋지만, 지금은 교대 수면 계획이 먼저예요. 좀비 아포칼립스에서도 수면은 중요합니다. 그게 장수의 기본ㅇ1ㄴ177r,,",
          D: "사람을 너무 쉽게 믿네요. 그런 마음은 약점이 돼요.",
        },
      },
      {
        text: "무섭지 않아. 일단 살아남는 게 먼저야.",
        scoresByCharacter: { A: 0, B: 1, C: 2, D: 1 },
        reactions: {
          A: "강한 사람이네요.. 저도 그렇게 되고 싶어요...",
          B: "그래. 무서워할 시간에 생존을 해야지. 일단 문이나 막자.",
          C: "맞아요. 공포보다 우선순위는 생존이에요. 당신이 이렇게 강한 사람인지 몰랐어요. 조금 설레네요. 용맹한 병아리씨.",
          D: "그 말 마음에 들어요. 나도 같은 생각이에요.",
        },
      },
      {
        text: "솔직히 너도 조금 수상해.",
        scoresByCharacter: { A: -1, B: 0, C: 1, D: 2 },
        reactions: {
          A: "그렇게 생각했군요.. 조금… 상처네요...",
          B: "의심하는 건 나쁘지 않아. 나도 가끔은 나를 못 믿겠으니까.",
          C: "그 정도 경계심은 필요해요. 저라도 저를 의심했을 겁니다. 근데 좀 서운하기도 하네요? ㅋㅋ",
          D: "저를 수상하다고 생각하면서도 곁에 있는군요. 왤까..? 재미있네요.",
        },
      },
    ],
  },
  {
    id: 9,
    title: "구조 방송",
    question:
      "구조 방송이 들립니다. 하지만 방송 위치는 감염지 중심부입니다. 어떻게 할까요?",
      bgImage: "/images/question-bg-09.png",
    answers: [
      {
        text: "위험해도 당장 확인하러 가자고 한다",
        scoresByCharacter: { A: 2, B: 0, C: -1, D: -2 },
        reactions: {
          A: "누군가 진짜 기다리고 있을지도 몰라요..!! 빨리 여기서 탈출해서 당신과 안전한 곳에 있고 싶어요..",
          B: "방송 하나 믿고 뛰어드는 건 바보짓이야.",
          C: "감염지 중심부에서 방송은 너무 뻔하지 않나. 직접 들어가면 안 됩니다. 아무리 나와 함께여도 너무 무모한 생각이네요.",
          D: "어리석은 선택이네요. 다른 사람 시키면 되는 걸. 우리가 직접?",
        },
      },
      {
        text: "함정일 수 있으니 우회하자고 한다",
        scoresByCharacter: { A: 0, B: 2, C: 2, D: 1 },
        reactions: {
          A: "그 말도 맞아요.. 그렇게 쉬울리가 없겠죠...",
          B: "머리 좀 굴리네. 좋아. 우회하자.(당신의 머리를 흐뜨러뜨린다.)",
          C: "정답. 신호 위치만 기록하고 정보를 모으면서 우회하는 게 맞아요. 이제 가르칠게 없네요. 똑똑한 병아리씨.",
          D: "나쁘지 않아요. 의심은 오래 생존하는 사람들의 습관같은거죠.",
        },
      },
      {
        text: "다른 사람을 먼저 보내 상황을 확인하자고 한다",
        scoresByCharacter: { A: -2, B: 0, C: -1, D: 2 },
        reactions: {
          A: "다른 사람을 먼저 보낸다는 건… 그 사람은요..? 설마 그게 저는 아니죠?...",
          B: "그 사람들도 살아남으려고 하는 건데. 너무하네.",
          C: "타인을 변수로 쓰는 건 예측 불가능성이 너무 커요. 그 사람이 우릴 배신할 수도 있는거고. 공부 더 해야겠네요.",
          D: "다른 사람을 먼저 보낸다… 드디어 현실적으로 생각하네요. 내가 사람을 잘 본건가?",
        },
      },
    ],
  },
  {
    id: 10,
    title: "마지막 탈출 차량",
    question:
      "마지막 순간, 탈출 차량에는 두 사람만 탈 수 있습니다. 그런데 뒤에서 누군가 도와달라고 외칩니다. 어떻게 할까요?",
      bgImage: "/images/question-bg-10.png",
    answers: [
      {
        text: "그를 설득해 한 명 더 구할 방법을 찾는다",
        scoresByCharacter: { A: 2, B: 1, C: 0, D: -2 },
        reactions: {
          A: "당신은 끝까지 사람을 포기하지 않는 멋진 사람이네요...그래서 좋아져요..",
          B: "네가 원하면 그렇게 하자. 대신 내 뒤로 숨어.",
          C: "하… 진짜 말 안 듣네요. 생존에서 가장 중요한건 내 자신이에요. ...그래도 생존킹인 내가 있으니 방법은 있어요.",
          D: "끝까지 그런 우매한 선택을 하는군요. 그래서 당신은 위험해요.",
        },
      },
      {
        text: "둘만 타고 떠난다",
        scoresByCharacter: { A: -1, B: 1, C: 1, D: 2 },
        reactions: {
          A: "이게 맞는 선택일까요… 너무 잔인해요...",
          B: "그래. 우선은 우리 둘부터 살아야 해.",
          C: "냉정하지만 가능한 선택이에요. 병아리씨 알고보니 차가운 심장을 가진 사람이었네요. 그래도 좋은 판단이에요!",
          D: "좋아요. 이제야 현명한 선택을 하네요. 당신이랑 나..왠지 우리 잘 어울릴 것 같아요.",
        },
      },
      {
        text: "그에게 선택을 맡긴다",
        scoresByCharacter: { A: 1, B: 2, C: 1, D: 2 },
        reactions: {
          A: "제게 맡긴다고요? 그럼… 저는 당신을 살리고 싶어요..",
          B: "나한테 맡기면 후회 안 해? 그래도 믿어주니 고맙네. 피식.",
          C: "제 판단을 믿는다면, 당신은 우선 차량 상태부터 확인하고 있어요. 내가 방법을 찾아볼게요. 병아리씨는 역시 인성과 센스까지 다 겸비한 사람이네요. 나만 믿어요.",
          D: "선택을 저한테 맡긴다고요? 후회할 수도 있어요.ㅋㅋ(빨랑튀어!)",
        },
      },
    ],
  },
];

const endings = {
  A: {
    success: {
      title: "창백한 소년은 끝내 당신의 손을 놓지 않았다",
      body:
        "당신은 유하를 약한 사람으로만 대하지 않았습니다. 무리하지 않게 기다려주었고, 위험한 순간에도 그를 혼자 두지 않았습니다.\n\n유하는 그런 당신 곁에서 조금씩 달라졌습니다. 떨리던 손은 당신의 손을 붙잡을 만큼 단단해졌고, 희미하던 목소리는 마지막 순간 당신을 부를 만큼 선명해졌습니다.\n\n“이번엔 제가 당신을 지킬게요.”",
    },
    fail: {
      title: "가장 약해 보였던 그는 가장 조용히 사라졌다",
      body:
        "당신은 살아남기 위해 계속 움직였습니다. 틀린 선택은 아니었습니다. 하지만 유하에게는 조금 빠르고, 조금 차가운 선택이었습니다.\n\n마지막 밤, 유하는 좀비에게 공격당하고 맙니다.\n유하는 당신의 손을 놓았습니다.\n“당신은 살아남아야 해요.”",
    },
  },
  B: {
    success: {
      title: "말 한 마디가 천냥 빚을 갚는다고 했지만, 이로는 행동으로 보여줬다.",
      body:
        "이로는 끝까지 다정한 말을 하지는 않았습니다. 대신 당신이 추워할 때 담요를 던졌고, 배고플 때 초콜릿을 던졌고, 위험할 때 말없이 당신을 밀쳤습니다.\n\n마지막 탈출 순간, 그는 낡은 열쇠 하나를 꺼내 차량 문을 열었습니다.\n\n“말했잖아. 언젠가 쓸모 있을 거라고.”",
    },

    fail: {
      title: "이로는 다른 생존자에게 츤츤거리며 당신을 떠났다.",
      body:
        "이로는 늘 말없이 당신을 챙겼습니다. 하지만 당신은 그 마음을 알아주지 않았습니다. \n\n혼란 속에서 그는 당신을 먼저 밀어냈고 새로운 사랑을 찾았습니다. \n“내가 준거 다 내놔.”\n당신의 가방 안에는 이로가 준 손전등, 초콜릿, 붕대, 그리고 탈출을 위한 자동차 키가 있었는데\n결국 그는 가방을 빼앗았고 다른 여자와 눈 맞아 달아났습니다.",
    },
  },
  C: {
    success: {
      title: "그의 잔소리는 결국 생존 매뉴얼이 되었다",
      body:
        "태오는 정말 말이 많았습니다. 위험도, 동선, 식량, 수면 시간까지 그는 모든 것을 계산하고 또 설명했습니다.\n\n처음엔 피곤했습니다. 하지만 당신은 그의 말 속에 숨은 진심을 알아챘습니다.\n\n“이 루트면 살 수 있어요. 그리고… 당신이 같이 가면 더 좋고요.”\n\n그와 함께하길 선택하고 많은 것들이 변했다. 그와 함께 당신은 빠르게 생존자 마을을 구축했고, 좀비 아포칼립스에서 사랑을 나누며 희망을 꽃피웠다.",
    },
    fail: {
      title: "마지막까지 그는 틀린 선택이라고 말했다",
      body:
        "태오는 계속 말했습니다. 그 길은 위험하다고, 그 선택은 변수가 너무 많다고, 지금은 감정보다 생존을 우선해야 한다고.\n\n하지만 당신은 자주 그의 말을 흘려들었습니다.\n\n“거봐요. 거기는 좀비소굴이라고 했잖아요.”\n그 말만을 남긴 채. 그는 축지법으로 총총 사라졌다.\n좀비들의 포효소리가 울려퍼졌다."
    },
  },

  D: {
    success: {
      title: "비겁한 그는 처음으로 누군가를 선택했다",
      body:
        "서윤은 착한사람이 아니었습니다. 필요하면 웃으며 거짓말했고, 위험하면 가장 안전한 자리를 먼저 빼앗았습니다.\n\n하지만 당신 또한 만만한 여자는 아니었습니다.\n그를 순진하게 믿지도, 완전히 밀어내지도 않았습니다.\n마지막 탈출 순간, 그는 처음으로 함께하는 선택을 했습니다. 당신의 손을 잡은 것입니다.\n\n“당신같이 쥐약같은 여자 처음이네요. 함께 하고싶습니다. ”",
    },

    fail: {
      title: "그는 웃으며 당신을 두고 갔다",
      body:
        "서윤은 처음부터 위험한 사람이었습니다. 당신도 알고 있었습니다. 하지만 그의 웃음과 말투는 이상하게 사람을 방심하게 만들었습니다.\n\n마지막 탈출 차량 앞에서 그는 평소처럼 부드럽게 웃었습니다.\n\n“미안해요. 저는 원래 이런 사람이에요.”",
    },
  },
};

const SUCCESS_THRESHOLD = 8;

function getResultImageSrc(characterId, resultType) {
  return `/images/results/${characterId}-${resultType}.png`;
}

function getSavedResultImageSrc(characterId, resultType) {
  return `/images/saved-results/${characterId}-${resultType}-saved.png`;
}

function getReactionMood(score) {
  if (score >= 2) return "plus2";
  if (score === 1) return "plus1";
  return "zero";
}

function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="progressTrack">
      <div className="progressFill" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("intro");
  const [selectedCharacterId, setSelectedCharacterId] = useState("A");
  const [flippedCharacterId, setFlippedCharacterId] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [affection, setAffection] = useState(0);
  const [lastReaction, setLastReaction] = useState(null);
  const [answerHistory, setAnswerHistory] = useState([]);


  const selectedCharacter = selectedCharacterId ? characters[selectedCharacterId] : null;
  const currentQuestion = questions[questionIndex];

  const result = useMemo(() => {
    if (!selectedCharacterId) return null;
    const type = affection >= SUCCESS_THRESHOLD ? "success" : "fail";
    return {
      type,
      ...endings[selectedCharacterId][type],
    };
  }, [affection, selectedCharacterId]);

  const reset = () => {
    setStep("intro");
    setSelectedCharacterId("A");
    setFlippedCharacterId(null);
    setQuestionIndex(0);
    setAffection(0);
    setLastReaction(null);
    setAnswerHistory([]);
  };

  const startGame = () => {
    if (!selectedCharacterId) return;
    setStep("question");
  };

  const selectAnswer = (answer, answerIndex) => {
    const score = answer.scoresByCharacter[selectedCharacterId];
    const reaction = answer.reactions[selectedCharacterId];
  
    const mood = getReactionMood(score);
    const reactionImage = selectedCharacter.reactionImages[mood];
  
    setAffection((prev) => prev + score);
  
    setLastReaction({
      text: reaction,
      score,
      image: reactionImage,
      mood,
    });
  
    setAnswerHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        answerText: answer.text,
        answerIndex,
        score,
        reaction,
        reactionImage,
        mood,
      },
    ]);
  
    setStep("reaction");
  };

  const goNext = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= questions.length) {
      setStep("result");
      return;
    }
    setQuestionIndex(nextIndex);
    setLastReaction(null);
    setStep("question");
  };

  const goBackFromQuestion = () => {
    if (questionIndex === 0) {
      setStep("intro");
      setAffection(0);
      setLastReaction(null);
      setAnswerHistory([]);
      return;
    }

    const previousAnswer = answerHistory[answerHistory.length - 1];
    setAffection((prev) => prev - (previousAnswer?.score ?? 0));
    setAnswerHistory((prev) => prev.slice(0, -1));
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
    setLastReaction(null);
    setStep("question");
  };

  const copyShareText = () => {
    if (!selectedCharacter || !result) return;
  
    const imageUrl = getSavedResultImageSrc(selectedCharacter.id, result.type);
  
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `zombie-love-${selectedCharacter.id}-${result.type}-saved.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="appRoot">
      <div className="phoneFrame">
      {step !== "intro" && (
        <header className="floatingHeader">
          <div className="appTitle">좀비 아포칼립스 연애 시뮬레이션</div>
        </header>
      )}
        <main className={step === "intro" ? "main introMain" : "main"}>
          {step === "intro" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <section className="heroSection">
                <div className="heroTopImageWrap">
                  <img
                    src={heroBgImageSrc}
                    alt=""
                    className="heroTopImage"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>

                <img
                  src={heroImageSrc}
                  alt="나와 좀비 아포칼립스에서 함께 생존할 남자는?"
                  className="mainTitleImage"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </section>

              <section className="characterSection">
                <div className="sectionLabel">공략 캐릭터 선택</div>

                <div className="cardSlider">
                  {characterOrder.map((id, index) => {
                    const character = characters[id];
                    const isActive = selectedCharacterId === character.id;
                    const isFlipped = flippedCharacterId === character.id;
                    const selectedIndex = characterOrder.indexOf(selectedCharacterId);
                    const offset = index - selectedIndex;

                    return (
                      <div
                        key={character.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          if (!isActive) {
                            setSelectedCharacterId(character.id);
                            setFlippedCharacterId(null);
                            return;
                          }
                        
                          setFlippedCharacterId(isFlipped ? null : character.id);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                        
                            if (!isActive) {
                              setSelectedCharacterId(character.id);
                              setFlippedCharacterId(null);
                              return;
                            }
                        
                            setFlippedCharacterId(isFlipped ? null : character.id);
                          }
                        }}
                        className={`slideCard ${isActive ? "isSelected" : ""}`}
                        style={{
                          transform: `translateX(${offset * 72}%) scale(${
                            offset === 0 ? 1 : 0.82
                          })`,
                          opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.68,
                          zIndex: 10 - Math.abs(offset),
                          pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
                        }}
                      >
                        <motion.div
                          className="flipCardInner"
                          animate={{ rotateY: isFlipped ? 180 : 0 }}
                          transition={{ duration: 0.55, ease: "easeInOut" }}
                        >
                          <div className="flipFace flipFront">
                            <img
                              src={character.frontCardSrc}
                              alt={`${character.name} 카드 앞면`}
                            />
                          </div>

                          <div className="flipFace flipBack">
                            <img
                              src={character.backCardSrc}
                              alt={`${character.name} 카드 뒷면`}
                            />
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="cardNavButton cardNavPrev"
                    aria-label="이전 캐릭터 보기"
                    onClick={() => {
                      const currentIndex = selectedCharacterId
                        ? characterOrder.indexOf(selectedCharacterId)
                        : 0;
                      const prevIndex =
                        (currentIndex - 1 + characterOrder.length) %
                        characterOrder.length;
                        setSelectedCharacterId(characterOrder[prevIndex]);
                        setFlippedCharacterId(null);
                    }}
                  >
                    <ChevronLeft size={26} strokeWidth={3} />
                  </button>

                  <button
                  type="button"
                  className="cardNavButton cardNavNext"
                  aria-label="다음 캐릭터 보기"
                  onClick={() => {
                    const currentIndex = selectedCharacterId
                      ? characterOrder.indexOf(selectedCharacterId)
                      : 0;
                    const nextIndex = (currentIndex + 1) % characterOrder.length;
                    setSelectedCharacterId(characterOrder[nextIndex]);
                    setFlippedCharacterId(null);
                  }}
                >
                  <ChevronRight size={26} strokeWidth={3} />
                </button>
                </div>
              </section>
            </motion.div>
          )}

          {step === "question" && selectedCharacter && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <section className="questionTop">
                <div className="questionMeta">
                  <button type="button" onClick={goBackFromQuestion}>
                    <ChevronLeft size={16} />
                    뒤로
                  </button>
                  <span>{selectedCharacter.name} 루트</span>
                  <span>
                    Q{questionIndex + 1}/{questions.length}
                  </span>
                </div>
                <ProgressBar current={questionIndex + 1} total={questions.length} />
                
              </section>

              {currentQuestion.bgImage && (
                <div className="question-visual">
                  <img src={currentQuestion.bgImage} alt="" />
                </div>
              )}

              <section className="questionCard">
                <div className="questionTitle">{currentQuestion.title}</div>
                <h2>{currentQuestion.question}</h2>
              </section>

              <section className="answerList">
                {currentQuestion.answers.map((answer, index) => (
                  <button
                    key={answer.text}
                    type="button"
                    className="answerButton"
                    onClick={() => selectAnswer(answer, index)}
                  >
                    <span>{index + 1}</span>
                    <strong>{answer.text}</strong>
                  </button>
                ))}
              </section>
            </motion.div>
          )}

          {step === "reaction" && selectedCharacter && lastReaction && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <section className="reactionCard">
                {lastReaction.image && (
                  <div className="reactionPortraitWrap">
                    <img
                      src={lastReaction.image}
                      alt={`${selectedCharacter.name} 반응`}
                      className="reactionPortrait"
                    />
                  </div>
                )}

                <div className="reactionLabel">
                  {selectedCharacter.reactionName || selectedCharacter.name}의 반응
                </div>

                <p>“{lastReaction.text}”</p>

                <div className="reactionScore">
                  호감도 {lastReaction.score >= 0 ? "+" : ""}
                  {lastReaction.score}
                </div>
              </section>
            </motion.div>
          )}

          {step === "result" && selectedCharacter && result && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              

              <div className="resultCaptureArea">
              <section className="resultImageWrap">
                  <img
                    src={getResultImageSrc(selectedCharacter.id, result.type)}
                    alt={`${selectedCharacter.name} 결과 이미지`}
                    className="resultImage"
                  />

                  <div className="floatingResultInfo">
                    <div>
                      <span>캐릭터</span>
                      <strong>{selectedCharacter.name}</strong>
                    </div>
                    <div>
                      <span>호감도</span>
                      <strong>{affection}점</strong>
                    </div>
                  </div>
                </section>
                <section className="resultTextCard">
                  <div className={result.type === "success" ? "resultBadge success" : "resultBadge fail"}>
                    <Heart size={14} />
                    {result.type === "success" ? "공략 성공" : "공략 실패"}
                  </div>

                  <div className="resultRoute">
                    {selectedCharacter.name} 루트 · 최종 호감도 {affection}점
                  </div>

                  <h2>{result.title}</h2>
                  <p>{result.body}</p>
                </section>

            
              </div>
            </motion.div>
          )}
        </main>

        {step === "intro" && (
          <footer className="bottomBar">
            <button type="button" onClick={startGame} disabled={!selectedCharacterId}>
              {selectedCharacterId
                ? `${characters[selectedCharacterId].name}쨩과 살아남기`
                : "공략할 캐릭터를 선택하세요"}
              <ChevronRight size={18} />
            </button>
          </footer>
        )}

        {step === "reaction" && (
          <footer className="bottomBar">
            <button type="button" onClick={goNext}>
              {questionIndex + 1 >= questions.length
                ? "결과 확인하기"
                : "다음 상황으로 이동"}
              <ChevronRight size={18} />
            </button>
          </footer>
        )}

        
         {step === "result" && (
            <footer className="bottomBar resultFooter">
              <button type="button" onClick={copyShareText}>
                <Share2 size={17} />
                결과 이미지 저장
              </button>
              <button type="button" onClick={reset} className="secondaryButton">
                <RotateCcw size={17} />
                다시
              </button>
            </footer>
          )}
      </div>
    </div>
  );
}
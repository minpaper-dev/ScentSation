import palette from '../styles/CustomColor'

export const categories = [
  {
    id: 0,
    icon: '🌷',
    title: '플로럴',
  },
  {
    id: 1,
    icon: '🍊',
    title: '시트러스',
  },
  {
    id: 2,
    icon: '🪵',
    title: '우디',
  },
  {
    id: 3,
    icon: '🧂',
    title: '스파이시',
  },
  {
    id: 4,
    icon: '🍼',
    title: '파우더리',
  },
  {
    id: 5,
    icon: '🦌',
    title: '머스크',
  },
]

export const genderList = [
  { title: '남자', value: 'male' },
  { title: '여자', value: 'feMail' },
]

export const FILTER_CATEGORY = [
  '전체',
  '플로럴',
  '시트러스',
  '우디',
  '스파이시',
  '파우더리',
  '머스크',
]

export const REVIEW_DATA_COLOR = {
  male: palette.Blue100,
  female: palette.Pink100,
  neutral: palette.Gray100,
  spring: palette.Yellow100,
  summer: palette.Green100,
  autumn: palette.Red200,
  winter: palette.Blue200,
  cologne: palette.Brown300,
  toilette: palette.Brown400,
  perfume: palette.Brown500,
}

export const REVIEW_DATA_TEXT = {
  male: '남성에게 더 잘어울려요',
  female: '여성에게 더 잘어울려요',
  neutral: '성별과 상관 없어요',
  spring: '봄에 뿌리기 좋아요',
  summer: '여름에 뿌리기 좋아요',
  autumn: '가을에 뿌리기 좋아요',
  winter: '겨울에 뿌리기 좋아요',
  cologne: '향이 1~2시간 지속돼요',
  toilette: '향이 3~4시간 지속돼요',
  perfume: '향이 5~6시간 지속돼요',
}
export const NO_HEADER = ['/signup', '/login']

export const REVIEW_FORM = {
  gender: [
    {
      value: 'male',
      content: '남자',
    },
    {
      value: 'female',
      content: '여자',
    },
    {
      value: 'neutral',
      content: '중성',
    },
  ],
  season: [
    {
      value: 'spring',
      content: '봄',
    },
    {
      value: 'summer',
      content: '여름',
    },
    {
      value: 'autumn',
      content: '가을',
    },
    {
      value: 'winter',
      content: '겨울',
    },
  ],
  vitality: [
    {
      value: 'cologne',
      content: '1~2 시간',
    },
    {
      value: 'toilette',
      content: '3~4 시간',
    },
    {
      value: 'perfume',
      content: '5~6 시간',
    },
  ],
}

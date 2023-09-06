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

export const REVIEW_DATA_COLOR: { [key: string]: string } = {
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

export const REVIEW_DATA_TEXT: { [key: string]: string } = {
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

export const REVIEW = {
  gender: {
    male: 0,
    female: 0,
    neutral: 0,
  },
  season: {
    spring: 0,
    summer: 0,
    autumn: 0,
    winter: 0,
  },
  vitality: {
    cologne: 0,
    toilette: 0,
    perfume: 0,
  },
}

export const REVIEW_TAG: { [key: string]: string } = {
  female: '여성',
  male: '남성',
  neutral: '중성',
  spring: '봄',
  summer: '여름',
  autumn: '가을',
  winter: '겨울',
  cologne: '1~2시간',
  toilette: '3~4시간',
  perfume: '5~6시간',
  default: '',
}

export const SORT_LIST = [
  {
    value: 'jack',
    label: '최근 등록 순',
  },
  {
    value: 'lucy',
    label: '리뷰 많은 순',
  },
  {
    value: 'Yiminghe',
    label: '가격 낮은 순',
  },
  {
    value: 'disabled',
    label: '가격 높은 순',
  },
  {
    value: 'disabled',
    label: '이름 순',
  },
]

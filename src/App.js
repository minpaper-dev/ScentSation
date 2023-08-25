import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Main from './pages/Main'
import { styled } from 'styled-components'
import app from './Firebase'
import { RecoilRoot, useRecoilState } from 'recoil'

import { ScrollToTop } from './components/ScrollToTop'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import MyPage from './pages/MyPage'
import Search from './pages/Search'
import Filter from './pages/Filter'
import Product from './pages/Product'
import Write from './pages/Write'

import useFirestore from './hooks/useFirestore'
import BottomNavi from './components/BottomNavi'
import UserReview from './pages/UserReview'
import RegisterVote from './pages/RegisterVote'
import Vote from './pages/Vote'
import VoteDetail from './pages/VoteDetail'
import EditProfile from './pages/EditProfile'
import { motion, AnimatePresence } from 'framer-motion'
import ReviewEdit from './pages/ReviewEdit'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { myInfoState } from './recoil/atoms'

function App() {
  const auth = getAuth()
  const queryClient = new QueryClient()
  const { addData, getDataWithId } = useFirestore()

  const data = [
    // {
    //   name: '블루 드 샤넬 오 드 빠르펭',
    //   brand: '샤넬',
    //   size: 50,
    //   price: 135000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/178/178bac20-2989-11eb-953b-bd59e745a95b.png?w=456',
    //   category: ['머스크', '우디'],
    // },
    // {
    //   name: '미스 디올 블루밍 부케 롤러 펄 오 드 뚜왈렛',
    //   brand: '디올',
    //   size: 20,
    //   price: 71000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/ad0/ad012140-0c30-11ee-8d6a-939024f3fb58.png?w=456',
    //   category: ['머스크', '플로럴'],
    // },
    // {
    //   name: '끌로에 오 드 퍼퓸',
    //   brand: '끌로에',
    //   size: 50,
    //   price: 150000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/5fb/5fb4f6a0-08fc-11ee-9c6c-41fb11a103a9.jpeg?w=456',
    //   category: ['플로럴'],
    // },
    // {
    //   name: '어벤투스',
    //   brand: '크리드',
    //   size: 75,
    //   price: 348000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20140623/1403602059901.jpg?w=456',
    //   category: ['프루티', '머스크'],
    // },
    // {
    //   name: '아쿠아 알레고리아 페라 그라니타 오 드 뚜왈렛 ',
    //   brand: '겔랑',
    //   size: 75,
    //   price: 164000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/b85/b85919e0-edea-11ec-8ad7-a3acf1cd4d18.jpeg?w=456',
    //   category: ['프루티', '시트러스'],
    // },
    // {
    //   name: '샹스 오 땅드르 오 드 빠르펭',
    //   brand: '샤넬',
    //   size: 50,
    //   price: 179000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/eec/eec994f0-f933-11ed-9de5-29b7891c15cf.jpeg?w=456',
    //   category: ['프루티', '플로럴'],
    // },
    // {
    //   name: '터치 포 맨 오 드 뚜왈렛',
    //   brand: '버버리',
    //   size: 50,
    //   price: 84000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/cdc/cdc39830-be58-11ec-9fb3-b12de47e278a.png?w=456',
    //   category: ['프레쉬', '머스크'],
    // },
    // {
    //   name: '미스 디올 오 드 퍼퓸',
    //   brand: '디올',
    //   size: 50,
    //   price: 182000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/d1b/d1bc97e0-58b7-11ec-8614-1b72223f29b9.jpeg?w=456',
    //   category: ['플로럴', '머스크'],
    // },
    // {
    //   name: '테싯 오 드 퍼퓸',
    //   brand: '이솝',
    //   size: 50,
    //   price: 150000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/380/380e40c0-9900-11eb-a2c4-eb2881e350fc.png?w=456',
    //   category: ['프레쉬', '시트러스', '그린'],
    // },
    // {
    //   name: '라 튤립 오 드 퍼퓸',
    //   brand: '바이레도',
    //   size: 50,
    //   price: 260000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/product/20200929/1601344105049.png?w=456',
    //   category: ['플로럴'],
    // },
    // {
    //   name: '루나 오 드 뚜왈렛',
    //   brand: '펜할리곤스',
    //   size: 100,
    //   price: 286000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/386/386bf0b0-13e5-11ed-a67e-eb6b6362548f.png?w=456',
    //   category: ['플로럴', '시트러스'],
    // },
    // {
    //   name: '로즈 오브 노 맨즈 랜드 오 드 퍼퓸',
    //   brand: '바이레도',
    //   size: 50,
    //   price: 260000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/ca0/ca00d300-267a-11ec-94d6-b5b818462517.jpeg?w=456',
    //   category: ['머스크', '프루티', '플로럴'],
    // },
    // {
    //   name: '오 로즈 오 드 뚜왈렛',
    //   brand: '딥티크',
    //   size: 50,
    //   price: 165000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/product/bd7/bd7f7500-ea55-11ed-8df0-b549d3493d43.png?w=456',
    //   category: ['프루티', '플로럴'],
    // },
    // {
    //   name: '롬브르 단 로 오 드 퍼퓸',
    //   brand: '딥티크',
    //   size: 75,
    //   price: 269000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/var/app/current/common/upload/20200221/1582272403813.jpg?w=456',
    //   category: ['플로럴'],
    // },
    // {
    //   name: '모던 프린세스 오 드 퍼퓸',
    //   brand: '랑방',
    //   size: 60,
    //   price: 90000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/product/20200527/1590565152325.png?w=456',
    //   category: ['머스크', '프루티', '플로럴'],
    // },
    // {
    //   name: '퓨어 그레이스 누드 로즈 프레그런스 오 드 뚜왈렛',
    //   brand: '필로소피',
    //   size: 60,
    //   price: 69000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20190108/1546909633575.png?w=456',
    //   category: ['플로럴'],
    // },
    // {
    //   name: '퓨어 그레이스 누드 로즈 프레그런스 오 드 뚜왈렛',
    //   brand: '필로소피',
    //   size: 60,
    //   price: 69000,
    //   image:
    //     'https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20190108/1546909633575.png?w=456',
    //   category: ['플로럴'],
    // },
  ]

  const [, setMyInfo] = useRecoilState(myInfoState)

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        localStorage.setItem('uid', JSON.stringify(user.uid))

        const result = await getDataWithId('user', user.uid)

        setMyInfo(result)
      }
    })
  }, [])

  const addData_ = async v => {
    const result = await addData('product', '', v)
    console.log(v)
  }

  const AnimatedPage = ({ element }) => {
    const location = useLocation()

    return (
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
      >
        {element}
      </motion.div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Container className="App">
        <AnimatePresence>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<AnimatedPage element={<Main />} />} />
              <Route
                path="/login"
                element={<AnimatedPage element={<Login />} />}
              />
              <Route
                path="/signup"
                element={<AnimatedPage element={<Signup />} />}
              />
              <Route
                path="/mypage"
                element={<AnimatedPage element={<MyPage />} />}
              />
              <Route
                path="/search"
                element={<AnimatedPage element={<Search />} />}
              />
              <Route
                path="/filter"
                element={<AnimatedPage element={<Filter />} />}
              />
              <Route
                path="/product/:id"
                element={<AnimatedPage element={<Product />} />}
              />
              <Route
                path="/write"
                element={<AnimatedPage element={<Write />} />}
              />
              <Route
                path="/review/:id"
                element={<AnimatedPage element={<UserReview />} />}
              />
              <Route
                path="/vote"
                element={<AnimatedPage element={<Vote />} />}
              />
              <Route
                path="/vote/register"
                element={<AnimatedPage element={<RegisterVote />} />}
              />
              <Route
                path="/vote/:id"
                element={<AnimatedPage element={<VoteDetail />} />}
              />
              <Route
                path="/mypage/edit"
                element={<AnimatedPage element={<EditProfile />} />}
              />
              <Route
                path="/review/edit"
                element={<AnimatedPage element={<ReviewEdit />} />}
              />
            </Routes>
            <BottomNavi />
          </BrowserRouter>
        </AnimatePresence>
      </Container>
    </QueryClientProvider>
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 48rem;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export default App

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
// import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { myInfoState } from './recoil/atoms'
import { MY_UID } from './common/localstorage'
import NotFound from './pages/NotFound'
import Brand from './pages/Brand'
import ProductDetail from './pages/ProductDetail'

function App() {
  const auth = getAuth()
  const queryClient = new QueryClient()
  const { addData, getDataWithId } = useFirestore()

  const data = [
    {
      name: '라이트 에센스 오 드 뚜왈렛',
      brand: '페라리',
      size: 125,
      price: 104000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/product/6f9/6f9b0c80-4b4d-11ec-9b8a-7d5c8332958d.jpeg?w=456',
      category: ['프루티', '시트러스'],
    },
    {
      name: '미스 디올 블루밍 부케 오 드 뚜왈렛',
      brand: '디올',
      size: 50,
      price: 155000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/product/eff/efffa8f0-ea56-11ed-9b83-c97f8f5e832b.png?w=456',
      category: ['플로럴'],
    },
    {
      name: '잉글리쉬 페어 앤 프리지아 코롱',
      brand: '조말론',
      size: 100,
      price: 218000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/product/20200527/1590570757967.PNG?w=456',
      category: ['플로럴', '프루티'],
    },
    {
      name: '잉글리쉬 페어 앤 프리지아 코롱',
      brand: '조말론',
      size: 100,
      price: 218000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/product/20200527/1590570757967.PNG?w=456',
      category: ['플로럴', '프루티'],
    },
    {
      name: '가브리엘 샤넬 오 드 빠르펭',
      brand: '샤넬',
      size: 50,
      price: 179000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/home/glowmee/upload/20170831/1504169593130.png?w=456',
      category: ['플로럴', '프루티'],
    },
    {
      name: '알뤼르 옴므 스포츠 오 드 뚜왈렛',
      brand: '샤넬',
      size: 50,
      price: 120000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/product/487/48728700-990a-11eb-b73d-4be3072764b5.png?w=456',
      category: ['플로럴', '프루티'],
    },
    {
      name: '알뤼르 옴므 스포츠 오 드 뚜왈렛',
      brand: '샤넬',
      size: 50,
      price: 120000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/product/487/48728700-990a-11eb-b73d-4be3072764b5.png?w=456',
      category: ['플로럴', '프루티'],
    },
    {
      name: '로즈 폼퐁 오 드 뚜왈렛',
      brand: '구딸 파리',
      size: 50,
      price: 210000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/product/f0d/f0d12a20-0f3f-11ee-abf3-694b84207787.jpeg?w=456',
      category: ['플로럴', '프루티'],
    },
    {
      name: '엉 마뗑 도하주 오 드 뚜왈렛',
      brand: '구딸 파리',
      size: 50,
      price: 210000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/product/c03/c0341470-0f46-11ee-a093-1fedeebf5a3b.jpeg?w=456',
      category: ['플로럴', '프루티', '프레쉬'],
    },
    {
      name: '릴 오 떼 오 드 뚜왈렛',
      brand: '구딸 파리',
      size: 100,
      price: 290000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/product/a87/a87caa50-0f40-11ee-98ce-a5be4f9afa8b.jpeg?w=456',
      category: ['시트러스', '프레쉬', '그린'],
    },
    {
      name: '릴 오 떼 오 드 뚜왈렛',
      brand: '구딸 파리',
      size: 100,
      price: 290000,
      image:
        'https://dn5hzapyfrpio.cloudfront.net/product/a87/a87caa50-0f40-11ee-98ce-a5be4f9afa8b.jpeg?w=456',
      category: ['시트러스', '프레쉬', '그린'],
    },
  ]

  const [, setMyInfo] = useRecoilState(myInfoState)

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        localStorage.setItem(MY_UID, JSON.stringify(user.uid))

        const result = await getDataWithId('user', user.uid)

        setMyInfo(result)
      }
    })
  }, [])

  // useEffect(() => {
  //   data.map(v => addData_(v))
  // }, [])

  const addData_ = async v => {
    // const result = await addData('product', '', v)
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
              {/* <Route
                path="/product/:id"
                element={<AnimatedPage element={<Product />} />}
              /> */}
              <Route
                path="/product/:id"
                element={<AnimatedPage element={<ProductDetail />} />}
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
              <Route
                path="/brand/:id"
                element={<AnimatedPage element={<Brand />} />}
              />
              <Route
                path="*"
                element={<AnimatedPage element={<NotFound />} />}
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

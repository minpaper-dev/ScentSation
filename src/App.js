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
  const { getDataWithId } = useFirestore()

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

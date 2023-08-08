import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './pages/Main'
import { styled } from 'styled-components'
import { ScrollToTop } from './components/ScrollToTop'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import app from './Firebase'
import MyPage from './pages/MyPage'

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

const Container = styled.div`
  width: 480px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export default App

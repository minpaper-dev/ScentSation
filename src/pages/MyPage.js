import React, { useEffect, useState } from 'react'
import CustomLogo from '../components/Custom/CustomLogo'
import { styled } from 'styled-components'
import CustomFont from '../styles/CustomFont'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser, getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from '../components/Header'
import useFirestore from '../hooks/useFirestore'
import palette from '../styles/CustomColor'
import ProfileDetail from '../components/Profile/ProfileDetail'
import CustomButtonModal from '../components/Custom/CustomButtonModal'

const MyPage = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const { getDataOne, deleteData } = useFirestore()

  const MenuData = [
    {
      title: 'My ScentSation',
      event: () => navigate(`/review/${userInfo.id}`),
    },
    {
      title: '내 정보 수정',
      event: () => navigate('edit'),
    },
    {
      title: '로그아웃',
      event: () => setIsOpenLogoutModal(true),
    },
    {
      title: '탈퇴하기',
      event: () => setIsOpenWithdrawalModal(true),
    },
  ]

  const [userInfo, setUserInfo] = useState({})
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false)
  const [isOpenWithdrawalModal, setIsOpenWithdrawalModal] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid
        getUserInfo(uid)
      }
    })
  }, [])

  const getUserInfo = async uid => {
    const result = await getDataOne('user', uid)
    setUserInfo({ ...result.data(), id: uid })
  }

  const onLogout = () => {
    setIsOpenLogoutModal(false)
    auth.signOut()
    navigate('/login', { replace: true })
  }

  const onWithdrawal = async () => {
    setIsOpenLogoutModal(false)
    const user = auth.currentUser

    deleteUser(user)
      .then(() => {
        deleteData('user', userInfo.id)
        navigate('/login', {
          replace: true,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <Header pageName={'마이페이지'} />
      <Container>
        <ProfileDetail userInfo={userInfo} />
        <FlexCol>
          {MenuData.map(item => (
            <Button onClick={item.event} key={item.title}>
              <CustomFont size={1.4} content={item.title} weight={600} />
            </Button>
          ))}
        </FlexCol>
        {isOpenLogoutModal && (
          <CustomButtonModal
            content={'정말로 로그아웃 하시겠습니까?'}
            noEvent={() => setIsOpenLogoutModal(false)}
            yesEvent={onLogout}
          />
        )}
        {isOpenWithdrawalModal && (
          <CustomButtonModal
            content={`정말로 탈퇴 하시겠습니까?`}
            noEvent={() => setIsOpenWithdrawalModal(false)}
            yesEvent={onWithdrawal}
          />
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
`

const FlexCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0rem;
`

const Button = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 1rem 2rem;
`

export default MyPage

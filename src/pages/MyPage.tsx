import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { deleteUser, getAuth } from 'firebase/auth'
import { useQuery } from '@tanstack/react-query'

import Header from '../components/Header'
import Loader from '../components/Loader'
import ProfileDetail from '../components/Profile/ProfileDetail'
import CustomButtonModal from '../components/Custom/CustomButtonModal'
import CustomFont from '../styles/CustomFont'
import useFirestore from '../hooks/useFirestore'
import { MY_UID, SEARCH_HISTORY } from '../common/localstorage'
import { UserInterface } from './Main'

const MyPage = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const { getDataWithId, deleteData } = useFirestore()

  const uid = JSON.parse(localStorage.getItem(MY_UID) || 'null')

  const { data: userData, isLoading } = useQuery<UserInterface | undefined>(
    ['user', uid],
    () => getDataWithId<UserInterface>('user', uid)
  )

  const MenuData = [
    {
      title: 'My ScentSation',
      event: () => navigate(`/review/${userData?.id}`),
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

  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false)
  const [isOpenWithdrawalModal, setIsOpenWithdrawalModal] = useState(false)

  const onLogout = () => {
    setIsOpenLogoutModal(false)
    auth.signOut()
    localStorage.removeItem(MY_UID)
    localStorage.removeItem(SEARCH_HISTORY)
    navigate('/login', { replace: true })
  }

  const onWithdrawal = async () => {
    setIsOpenLogoutModal(false)
    const user = auth.currentUser
    if (user) {
      deleteUser(user)
        .then(() => {
          deleteData('user', userData?.id)
          localStorage.removeItem(MY_UID)
          localStorage.removeItem(SEARCH_HISTORY)
          navigate('/login', {
            replace: true,
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  if (isLoading) return <Loader />

  return (
    <>
      <Header pageName={'마이페이지'} />
      <Container>
        <ProfileDetail userInfo={userData} />
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

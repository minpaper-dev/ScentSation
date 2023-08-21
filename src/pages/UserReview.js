import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ProfileDetail from '../components/Profile/ProfileDetail'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import useFirestore from '../hooks/useFirestore'
import ReviewItemWithProduct from '../components/Review/ReviewItemWithProduct'
import palette from '../styles/CustomColor'

const UserReview = () => {
  const { id } = useParams()
  const { getDataOne, getDataWithQuery } = useFirestore()

  const [userInfo, setUserInfo] = useState({})
  const [myReview, setMyReview] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const user = await getDataOne('user', id)
    setUserInfo(user.data())

    const review = await getDataWithQuery('review', 'user.id', '==', id)
    setMyReview(review)

    setIsLoading(false)
  }

  return (
    <>
      <Header pageName={'사용자 리뷰'} />

      {!isLoading && (
        <Container>
          <ProfileDetail userInfo={userInfo} />
          <WrapReview>
            {myReview.map(data => (
              <>
                <ReviewItemWithProduct data={data} isNoProfile={true} />
                {/* <Divider /> */}
              </>
            ))}
          </WrapReview>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: ${palette.Brown100};
  padding-top: 2rem;
  padding-bottom: 5rem;
`

const WrapReview = styled.div`
  width: 80%;
  margin: 2rem auto;
`

const Divider = styled.div`
  height: 1rem;
  background-color: ${palette.Gray300};
  margin: 1rem;
`

export default UserReview

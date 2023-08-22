import React, { useEffect, useState } from 'react'
import VoteItem from '../Vote/VoteItem'
import CustomCarousel from '../Custom/CustomCarousel'
import useFirestore from '../../hooks/useFirestore'
import CustomButtonModal from '../Custom/CustomButtonModal'
import { useNavigate } from 'react-router-dom'

const MainVote = () => {
  const { getDataAll } = useFirestore()
  const navigate = useNavigate()

  const [carouselList, setCarouselList] = useState([])
  const [isLoginModal, setIsLoginModal] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const result = await getDataAll('vote')

    setCarouselList(result)
  }

  return (
    <>
      <CustomCarousel
        carouselList={carouselList}
        renderItem={data => {
          return <VoteItem data={data} setIsLoginModal={setIsLoginModal} />
        }}
      />
      {isLoginModal && (
        <CustomButtonModal
          content={`로그인 한 유저만 사용가능한 기능입니다.
        로그인 하러 이동하시겠습니까?`}
          yesEvent={() => {
            setIsLoginModal(false)
            navigate('/login')
          }}
          noEvent={() => setIsLoginModal(false)}
        />
      )}
    </>
  )
}

export default MainVote

import React, { useEffect, useState } from 'react'
import ReviewItemWithProduct from '../Review/ReviewItemWithProduct'
import useFirestore from '../../hooks/useFirestore'
import CustomCarousel from '../Custom/CustomCarousel'

const MainReview = () => {
  const { getDataAll } = useFirestore()

  const [reviewData, setReviewData] = useState([])

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const result = await getDataAll('review')
    setReviewData(result)
  }

  return (
    <CustomCarousel
      carouselList={reviewData}
      renderItem={data => {
        return <ReviewItemWithProduct data={data} />
      }}
    />
  )
}

export default MainReview

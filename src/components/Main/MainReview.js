import React from 'react'
import CustomCarousel from '../Custom/CustomCarousel'
import ReviewItem from '../Review/ReviewItem'

const MainReview = ({ reviewData }) => {
  return (
    <CustomCarousel
      carouselList={reviewData}
      renderItem={data => {
        return <ReviewItem data={data} />
      }}
    />
  )
}

export default MainReview

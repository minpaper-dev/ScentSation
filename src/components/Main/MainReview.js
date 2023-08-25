import React from 'react'
import ReviewItemWithProduct from '../Review/ReviewItemWithProduct'
import CustomCarousel from '../Custom/CustomCarousel'

const MainReview = ({ reviewData }) => {
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

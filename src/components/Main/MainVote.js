import React from 'react'
import VoteItem from '../Vote/VoteItem'
import CustomCarousel from '../Custom/CustomCarousel'

const MainVote = () => {
  const carouselList = [
    { id: 1, name: '어나더' },
    { id: 2, name: '어나더2' },
    { id: 3, name: '어나더3' },
  ]

  return (
    <CustomCarousel
      carouselList={carouselList}
      renderItem={data => {
        return <VoteItem data={data} />
      }}
    />
  )
}

export default MainVote

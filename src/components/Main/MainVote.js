import React, { useEffect, useState } from 'react'
import VoteItem from '../Vote/VoteItem'
import CustomCarousel from '../Custom/CustomCarousel'
import useFirestore from '../../hooks/useFirestore'

const MainVote = () => {
  const { getDataAll } = useFirestore()

  const [carouselList, setCarouselList] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const result = await getDataAll('vote')

    setCarouselList(result)
  }

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

import React, { useRef, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import { ReviewInterface, VoteInterface } from '../../pages/Main'

interface CustomCarouselProps {
  carouselList: (ReviewInterface | VoteInterface)[] | undefined
  renderItem: (data: ReviewInterface | VoteInterface) => React.ReactNode
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  carouselList,
  renderItem,
}) => {
  const carouselRef = useRef<HTMLUListElement>(null)

  const [currIndex, setCurrIndex] = useState(0)

  let touchStartX = 0
  let touchEndX = 0

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currIndex}00%)`
    }
  }, [currIndex])

  const handleSwipe = (direction: number) => {
    if (!carouselList) return
    const newIndex = currIndex + direction
    if (newIndex > carouselList.length - 1 || newIndex < 0) return

    setCurrIndex(prev => prev + direction)

    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out'
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.nativeEvent.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX

    if (touchStartX >= touchEndX) {
      handleSwipe(1)
    } else {
      handleSwipe(-1)
    }
  }

  const handleNext = () => {
    handleSwipe(1)
  }

  const handlePrev = () => {
    handleSwipe(-1)
  }

  return (
    <Container>
      <Button onClick={handlePrev}>
        <LeftCircleFilled
          style={{
            fontSize: '3rem',
            color: palette.Brown500,
            marginRight: 5,
          }}
        />
      </Button>
      <WrapCarousel onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <Carousel ref={carouselRef}>
          {carouselList?.map(item => {
            return (
              <CarouselContainer key={item.id}>
                {renderItem(item)}
              </CarouselContainer>
            )
          })}
        </Carousel>
        <WrapIndicator>
          {carouselList?.map((item, index) => (
            <Indicator key={item.id} $isActive={index === currIndex} />
          ))}
        </WrapIndicator>
      </WrapCarousel>
      <Button onClick={handleNext}>
        <RightCircleFilled
          style={{ fontSize: '3rem', color: palette.Brown500, marginLeft: 5 }}
        />
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const WrapCarousel = styled.div`
  position: relative;
  overflow: hidden;
`

const Carousel = styled.ul`
  display: flex;
`

const WrapIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

const Indicator = styled.div<{ $isActive: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: ${props =>
    props.$isActive ? palette.Gray100 : palette.Gray400};
  margin-right: 0.3rem;
`

const CarouselContainer = styled.div`
  flex: none;
  object-fit: contain;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding: 1.5%;
`

const Button = styled.button`
  margin: 0 0.5rem;
`

export default CustomCarousel

import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'

interface CustomModalProps {
  content: string
}

const CustomModal: React.FC<CustomModalProps> = ({ content }) => {
  return (
    <ModalBackdrop>
      <Container>
        <ModalView onClick={e => e.stopPropagation()}>
          <CustomFont size={1.2} content={content} />
        </ModalView>
      </Container>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const Container = styled.div`
  width: 100vw;
  max-width: 48rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 2rem;
  width: 60%;
  height: auto;
  background-color: white;
  padding: 4rem 2rem;
`

export default CustomModal

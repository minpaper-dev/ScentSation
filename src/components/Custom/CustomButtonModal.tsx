import React, { useState } from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'

interface CustomButtonModalProps {
  content: string
  yesEvent: () => void
  noEvent: () => void
}

const CustomButtonModal: React.FC<CustomButtonModalProps> = ({
  content,
  yesEvent,
  noEvent,
}) => {
  return (
    <ModalBackdrop onClick={noEvent}>
      <Container>
        <ModalView onClick={e => e.stopPropagation()}>
          <CustomFont size={1.4} content={content} />
          <WrapButton>
            <ExitBtn onClick={yesEvent}>
              <CustomFont size={1.2} content={'YES'} />
            </ExitBtn>
            <ExitBtn onClick={noEvent}>
              <CustomFont size={1.2} content={'NO'} />
            </ExitBtn>
          </WrapButton>
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
  width: 80%;
  height: auto;
  background-color: white;
  padding: 5rem 0;
`

const WrapButton = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`

const ExitBtn = styled.button`
  width: 45%;
  border: 1px solid ${palette.Brown200};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  transition: background-color 0.1s ease-in-out;
  font-size: 0.8rem;
`

export default CustomButtonModal

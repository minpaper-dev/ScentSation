import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import { categories } from '../../common/data'

interface SelectCategoryProps {
  setIsCategoryModal: (state: boolean) => void
  onChange: (value: string, category: string) => void
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  setIsCategoryModal,
  onChange,
}) => {
  const onClickItem = (value: string) => {
    onChange(value, 'category')
    setIsCategoryModal(false)
  }

  return (
    <ModalBackdrop onClick={() => setIsCategoryModal(false)}>
      <ModalView>
        {categories.map((item, index) => (
          <Item key={item.id} onClick={() => onClickItem(item.title)}>
            <CustomFont size={1.4} content={item.title} $marginRi={1} />
            <CustomFont size={1.6} content={item.icon} />
          </Item>
        ))}
      </ModalView>
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
  max-width: 40rem;
  height: auto;
  background-color: white;
  padding: 2rem 0;
`

const Item = styled.button`
  padding: 1.5rem 3rem;
  width: 100%;
`

export default SelectCategory

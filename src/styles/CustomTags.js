import React from 'react'
import { styled } from 'styled-components'
import palette from './CustomColor'
import CustomFont from './CustomFont'

const CustomTags = ({ content, bgc, $marginRi, onClick }) => {
  return (
    <Tag onClick={() => onClick(content)} bgc={bgc} $marginRi={$marginRi}>
      <CustomFont content={content} weight={800} color={'white'} />
    </Tag>
  )
}

const Tag = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  background-color: ${props => (props.bgc ? props.bgc : palette.Brown200)};
  border-radius: 1rem;
  padding: 0.4rem 0.4rem;
  margin-right: ${props => (props.$marginRi ? props.$marginRi : 0.5)}rem;
`

export default CustomTags

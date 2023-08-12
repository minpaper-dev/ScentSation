import React from 'react'
import { styled } from 'styled-components'
import palette from './CustomColor'
import CustomFont from './CustomFont'

const CustomTags = ({ content, bgc, $marginRi }) => {
  return (
    <Tag bgc={bgc} $marginRi={$marginRi}>
      <CustomFont size={0.8} content={content} weight={800} color={'white'} />
    </Tag>
  )
}

const Tag = styled.div`
  width: auto;
  background-color: ${props => (props.bgc ? props.bgc : palette.Brown200)};
  border-radius: 6px;
  padding: 5px 15px;
  margin-right: ${props => (props.$marginRi ? props.$marginRi : 0.5)}rem;
`

export default CustomTags

import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'

const CustomLogo = ({ $marginTop, $marginBt }) => {
  return (
    <Logo $marginTop={$marginTop} $marginBt={$marginBt}>
      <CustomFont
        size={1.5}
        content={'ScentSation'}
        color={palette.Brown100}
        weight={800}
      />
    </Logo>
  )
}

const Logo = styled.div`
  color: ${palette.Brown100};
  font-weight: 700;
  font-size: 2rem;
  margin-top: ${props => (props.$marginTop ? `${props.$marginTop}rem` : 0)};
  margin-bottom: ${props => (props.$marginBt ? `${props.$marginBt}rem` : 0)};
`

export default CustomLogo

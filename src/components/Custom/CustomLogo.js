import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'

const CustomLogo = ({ $marginTop, $marginBt }) => {
  return (
    <Logo $marginTop={$marginTop} $marginBt={$marginBt}>
      ScentSation
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

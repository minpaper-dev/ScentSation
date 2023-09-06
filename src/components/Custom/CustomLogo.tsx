import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'

interface CustomLogoProps {
  $marginTop?: number
  $marginBt?: number
}

const CustomLogo: React.FC<CustomLogoProps> = ({ $marginTop, $marginBt }) => {
  return (
    <Logo $marginTop={$marginTop} $marginBt={$marginBt}>
      <CustomFont
        size={2.5}
        content={'ScentSation'}
        color={palette.Brown200}
        weight={800}
      />
    </Logo>
  )
}

const Logo = styled.div<CustomLogoProps>`
  color: ${palette.Brown100};
  font-weight: 700;
  font-size: 2rem;
  margin-top: ${props => (props.$marginTop ? `${props.$marginTop}rem` : 0)};
  margin-bottom: ${props => (props.$marginBt ? `${props.$marginBt}rem` : 0)};
`

export default CustomLogo

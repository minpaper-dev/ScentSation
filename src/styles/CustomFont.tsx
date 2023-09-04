import React from 'react'
import styled from 'styled-components'

interface CustomFontProps {
  size?: number
  color?: string
  content?: string | number
  weight?: number
  $marginRi?: number
  $marginLf?: number
  $marginBt?: number
  $marginTop?: number
  $textDecoLine?: string
}
const CustomFont: React.FC<CustomFontProps> = ({
  size,
  color,
  content,
  weight,
  $marginRi,
  $marginLf,
  $marginBt,
  $marginTop,
  $textDecoLine,
}) => {
  return (
    <Text
      size={size}
      color={color}
      weight={weight}
      $marginRi={$marginRi}
      $marginLf={$marginLf}
      $marginBt={$marginBt}
      $marginTop={$marginTop}
      $textDecoLine={$textDecoLine}
    >
      {content}
    </Text>
  )
}

const Text = styled.span<CustomFontProps>`
  font-weight: ${props => (props.weight ? props.weight : 400)};
  font-size: ${props => (props.size ? props.size : 1.0)}rem;
  color: ${props => (props.color ? props.color : '#292A2B')};
  margin-right: ${props => (props.$marginRi ? props.$marginRi : 0)}rem;
  margin-left: ${props => (props.$marginLf ? props.$marginLf : 0)}rem;
  margin-bottom: ${props => (props.$marginBt ? props.$marginBt : 0)}rem;
  margin-top: ${props => (props.$marginTop ? props.$marginTop : 0)}rem;
  text-decoration-line: ${props =>
    props.$textDecoLine ? props.$textDecoLine : 'none'};
  white-space: pre-wrap;
`

export default CustomFont

import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
  font-weight: ${props => (props.weight ? props.weight : 400)};
  font-size: ${props => (props.size ? props.size : 1.0)}rem;
  color: ${props => (props.color ? props.color : '#292A2B')};
  margin-right: ${props => (props.$marginRi ? props.$marginRi : 0)}rem;
  margin-left: ${props => (props.$marginLf ? props.$marginLf : 0)}rem;
  margin-bottom: ${props => (props.$marginBt ? props.$marginBt : 0)}rem;
  margin-top: ${props => (props.$marginTop ? props.$marginTop : 0)}rem;
  text-align: ${props =>
    props.center ? 'center' : props.right ? 'right' : 'left'};
  opacity: ${props => (props.opacity ? props.opacity : 1)};
  text-decoration-line: ${props =>
    props.textDecoLine ? props.textDecoLine : 'none'};
  text-decoration-color: ${props =>
    props.textDecoColor ? props.textDecoColor : '#292A2B'};
`

export default ({
  type,
  size,
  color,
  content,
  weight,
  $marginRi,
  $marginLf,
  $marginBt,
  $marginTop,
  center,
  right,
  opacity,
  textDecoLine,
  textDecoColor,
  style,
}) => {
  const checkType = () => {
    return (
      <Text
        size={size}
        color={color}
        weight={weight}
        $marginRi={$marginRi}
        $marginLf={$marginLf}
        $marginBt={$marginBt}
        $marginTop={$marginTop}
        center={center}
        right={right}
        opacity={opacity}
        textDecoLine={textDecoLine}
        textDecoColor={textDecoColor}
        style={{ ...style }}
      >
        {content}
      </Text>
    )
  }

  return checkType(type)
}

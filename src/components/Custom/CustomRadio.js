import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'

const CustomRadio = ({
  name,
  value,
  onChange,
  checked,
  content,
  $isActive,
}) => {
  return (
    <Label key={'gender'} checked={checked} $isActive={$isActive}>
      <Input type="radio" name={name} value={value} onChange={onChange} />
      <CustomFont
        content={content}
        color={$isActive ? 'white' : 'black'}
        weight={$isActive ? 800 : 400}
      />
    </Label>
  )
}

const Label = styled.label`
  display: inline-block;
  background-color: ${props => (props.$isActive ? palette.Brown100 : 'white')};
  border: 1px solid
    ${props => (props.$isActive ? palette.Brown100 : palette.Brown100)};
  padding: 0.8rem;
  border-radius: 1rem;
  margin-right: 1rem;

  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background-color: red;
    opacity: 0.1;
  }
`

const Input = styled.input`
  opacity: 0;

  /* display: hidden; */
`

export default CustomRadio

import React from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'

interface CustomRadioProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  content: string
  $isActive: boolean
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  name,
  value,
  onChange,
  content,
  $isActive,
}) => {
  return (
    <Label key={'gender'} $isActive={$isActive}>
      <Input type="radio" name={name} value={value} onChange={onChange} />
      <CustomFont size={1.2} content={content} weight={$isActive ? 800 : 400} />
    </Label>
  )
}

const Label = styled.label<{ $isActive: boolean }>`
  display: inline-block;
  background-color: ${props => (props.$isActive ? palette.Brown100 : 'white')};
  border: 1px solid
    ${props => (props.$isActive ? palette.Brown100 : palette.Brown100)};
  padding: 0.8rem;
  border-radius: 1rem;
  margin-right: 1rem;

  cursor: pointer;
`

const Input = styled.input`
  display: none;
`

export default CustomRadio

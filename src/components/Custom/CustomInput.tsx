import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'

interface CustomInputProps {
  value: string
  setValue: (e: string) => void
  type?: string
  placeholder: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  type,
  placeholder,
}) => {
  return (
    <Input
      type={type ?? 'text'}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  )
}

const Input = styled.input`
  font-size: 1.2rem;
  border-radius: 8px;
  border: 1px solid ${palette.Brown200};
  padding: 15px 18px;

  &::placeholder {
    color: ${palette.Gray200};
  }

  &:focus {
    outline: none;
    border: 1.5px solid ${palette.Brown500};
  }
`

export default CustomInput

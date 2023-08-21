import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'

const CustomInput = ({
  value,
  setValue,
  type,
  placeholder,
  $marginBt,
  ...props
}) => {
  return (
    <Input
      type={type ?? 'text'}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      value={value}
      $marginBt={$marginBt}
    />
  )
}

const Input = styled.input`
  font-size: 1.2rem;
  border-radius: 8px;
  border: 1px solid ${palette.Brown200};
  padding: 15px 18px;
  margin-bottom: ${props => (props.$marginBt ? `${props.$marginBt}rem` : 0)};

  &::placeholder {
    color: ${palette.Gray200};
  }

  &:focus {
    outline: none;
    border: 1.5px solid ${palette.Brown500};
  }
`

export default CustomInput

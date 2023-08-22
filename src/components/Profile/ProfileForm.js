import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'

const ProfileForm = ({ item, inputInfo, onChange, index, errorMsg }) => {
  return (
    <Container>
      <Input
        $bgc={item.readOnly}
        type={item.type}
        placeholder={item.placeholder}
        onChange={e => onChange(e.target.value, Object.keys(inputInfo)[index])}
        readOnly={item.readOnly}
        value={item.value}
      />
      <CustomFont
        content={errorMsg[Object.keys(inputInfo)[index]]}
        size={0.8}
        $marginTop={1}
        color={palette.Red200}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${palette.Gray100};
  padding: 0.8rem 1rem;
  font-size: 0.8rem;
  background-color: ${props => (props.$bgc ? palette.Gray400 : 'white')};

  &::placeholder {
    color: ${palette.Gray100};
    font-size: 0.8rem;
  }

  &:focus {
    outline: none;
    border: 1.5px solid ${palette.Brown500};
  }
`

export default ProfileForm

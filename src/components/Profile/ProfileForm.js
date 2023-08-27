import React from 'react'
import { styled } from 'styled-components'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'

const ProfileForm = ({ item, onChange, category, errorMessage }) => {
  return (
    <Container>
      <Input
        $bgc={item.readOnly}
        type={item.type}
        placeholder={item.placeholder}
        onChange={e => onChange(e.target.value, category)}
        readOnly={item.readOnly}
        value={item.value}
      />
      <Error>
        <CustomFont
          color={palette.Red200}
          content={errorMessage?.[category]}
          weight={600}
        />
      </Error>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Input = styled.input`
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${palette.Gray100};
  padding: 1.2rem;
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

const Error = styled.div`
  position: absolute;
  bottom: -1.8rem;
  left: 0.5rem;
`

export default ProfileForm

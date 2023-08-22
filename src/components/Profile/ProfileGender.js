import React from 'react'
import { styled } from 'styled-components'
import { genderList } from '../../common/data'
import palette from '../../styles/CustomColor'
import CustomFont from '../../styles/CustomFont'

const ProfileGender = ({ category, inputInfo, onChange }) => {
  console.log(inputInfo)
  return (
    <Container>
      {genderList.map((gender, index) => (
        <Label
          key={gender.title}
          $isActive={inputInfo.gender.value === gender.value}
          style={{ marginLeft: index ? 10 : 0 }}
        >
          <Radio
            type={'radio'}
            name={category}
            value={gender.value}
            onChange={e => onChange(e.target.value, category)}
          />
          <CustomFont
            color={
              inputInfo.gender.value === gender.value
                ? 'black'
                : palette.Gray100
            }
            weight={inputInfo.gender.value === gender.value ? 600 : 400}
            content={gender.title}
          />
        </Label>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.$isActive ? palette.Brown200 : 'white')};
  border: 1px solid ${palette.Gray100};
  border-radius: 0.5rem;
  padding: 0.8rem 0px;

  cursor: pointer;
`

const Radio = styled.input`
  display: none;
`

export default ProfileGender

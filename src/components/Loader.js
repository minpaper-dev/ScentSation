import React from 'react'
import { styled } from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = () => {
  return (
    <Container>
      <LoadingOutlined style={{ fontSize: '5rem' }} />
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default Loader

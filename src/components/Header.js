import React from "react"
import { styled } from "styled-components"

const Header = () => {
    return (
        <Container>
            <Logo>
            ScentSation
            </Logo>
        </Container>
    )
}

const Container = styled.header`
    background-color : white;
    min-height : 100px;
`

const Logo = styled.div`
    color : #E9DACD;
    padding : 18px;
    padding-top : 40px
`

export default Header
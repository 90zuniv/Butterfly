import React from 'react'
import styled from 'styled-components'

export default function AuthPageLayout({ children }) {
  const [Left, Right] = children

  return (
    <Container>
      <Pane>{Left}</Pane>
      <Pane>{Right}</Pane>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;

  position: relative;

  height: 100vh;
`

const Pane = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  padding: 2rem 2rem;
`

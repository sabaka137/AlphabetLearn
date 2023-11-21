import React from 'react';
import AlphabetPage from './pages/AlphabetPage';
import styled from 'styled-components';
const PageWrapper = styled.div<{height:number}>`
  width: 100%;
  min-height: ${props=>props.height}px;
  background:#edeff0;
  display:flex;
  align-items:center;

  @media(max-width:770px){
    justify-content:center;
  }
`;
function App() {
  return (
    <PageWrapper height={window.innerHeight}>
     <AlphabetPage/>
    </PageWrapper>
  );
}

export default App;

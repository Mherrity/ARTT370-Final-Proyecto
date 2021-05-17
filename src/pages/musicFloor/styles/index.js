import styled from 'styled-components'

export const BoxViewer = styled.div`
width: 10vw;
height: 15vh;`

export const BoxesContainer = styled.div`
${props=>props.bottom?'margin-top: auto;':'margin-bottom: auto;'}
/* display: flex;
flex-direction : row;  */
justify-content: space-around;
align-items: space-around;
width: 100vw;
height: 30vh;
`

export const BoxesSideContainer = styled.div`
float: ${props=>props.right?'right;':'left;'}
display: flex;
flex-direction : column; 
justify-content: space-around;
align-items: space-around;
width: ${props=>props.right?'15vw;':'15vw;'}
margin-left: ${props=>props.right?'0vw;':'4.5vw;'}
height: 50vh;
`
export const LFG = styled.div`
position: absolute;
margin: 0;
padding: 0;
width: 100vw;
height: 100vh;
overflow: hidden;
color: transparent;`

export const TestFlex = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
overflow: auto;
`
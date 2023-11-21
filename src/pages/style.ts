import styled from "styled-components";
export const Wrapper = styled.div`
  width: 100%;
  height: ${window.innerHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0px;
  box-sizing: border-box;
  gap:20px;

`;

export const MainContainer = styled.div`
  margin-bottom: 40px;
`;

export const AlphabetTypeContainer = styled.div`
  width:680px;
  margin-bottom:15px;
  display:flex;
  justify-content:space-between;
  cursor:pointer;
  @media(max-width:770px){
    display:none;
  }
`;
export const AlphabetTypeItem = styled.div`
width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;

`;
export const AlphabetTypeItemText = styled.div<{active:boolean}>`
  color:${props=>props.active ? 'black':'grey'};
  padding:5px 20px;
  border-bottom:${props=> props.active ? '3px solid #33AAB4' : 'none'};
  font-family:Inter;
`;
export const Char = styled.div`
  font-size: 100px;
  height:200px;
  width:300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color:#393646;
  cursor:pointer;
  font-family:Noto Sans JP;
  @media(max-width:770px){
    font-size:140px;
    height:250px;
    width:auto;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap:10px;
  @media(max-width:770px){
    align-items: center;
    gap:20px;
  }
`;
export const RandomButton = styled.button`
  width: 150px;
  height: 50px;
  box-shadow: 0 0.325rem 0.55rem #00000014;
  cursor:pointer;
  background:white;
  color:#a0a0a0;
  font-weight:bold;
  border-radius:20px;
  border:none;
`;
export const OpenModalButton = styled.div`
  width:50px;
  height:50px;
  border-radius:40px;
  background:white;
  align-items:center;
  justify-content:center;
  box-shadow: 0 0.325rem 0.55rem #00000014;
  color:#a0a0a0;
  cursor:pointer;
  display:none;
  img{
    width:30px;
  height:30px;
  }
  @media(max-width:770px){
    display:flex;
  }
`;

export const InfoButton = styled.div`
position:relative;
width:20px;
height:20px;
border-radius:40px;
border:1px solid grey;
display:flex;
align-items:center;
justify-content:center;

color:#a0a0a0;
cursor:pointer;
img{
 width:12px;
height:12px;
}
@media(max-width:770px){
  display:none;
}
`;



export const SettingsContainer = styled.div`
  width: 300px;
  height: 400px;
  border: 2px solid white;
`;

export const AlphabetContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
export const AlphabetItem = styled.div`
  width: 50%;
  height: 50px;
  border: 1px solid white;
`;

export const SelectRandomType = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export const SelectRandomTypeItem = styled.div`
  width: 33.33%;
  height: 100%;
  border: 1px solid white;
`;

export const SingleType = styled.div<{isEnable:boolean}>`
  width: 100%;
  height: 50px;
  border: 2px solid white;
  background: ${(props) => (props.isEnable ? "none" : "grey")};
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
export const RangeType = styled.div<{isEnable:boolean}>`
  width: 100%;
  height: 50px;
  border: 2px solid white;
  background: ${(props) => (props.isEnable ? "none" : "grey")};
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

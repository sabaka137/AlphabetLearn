import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Alphabet from "./Alphabet";
import { IAlphabet, IAlphabetPart, IRange } from "../../types";
const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  color: black;
  box-sizing: border-box;
`;
export const AlphabetTypeContainer = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #dadfe1;
  padding: 12px 0px;
`;
export const AlphabetType = styled.div<{ active: boolean }>`
  flex: 1;
  color: ${(props) => (props.active ? "#33AAB4" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: Inter;
  font-size: 20px;
`;
export const AlphabetBottom = styled.div`
  width: 100%;
  height: 70px;
  border-top: 1px solid #dadfe1;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 16px;
`;
export const AlphabetWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AlphabetContainer = styled.div`
  box-sizing: border-box;
  padding: 0px 10px;
  color: white;
  width: 700px;
  height: auto;
  display: flex;
  @media (max-width: 770px) {
    width: 100%;
  }
`;
export const SettingsWrapper = styled.div`
  width: 100%;
  margin: 10px 0px;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  align-items: center;
`;
export const SettingsItem = styled.div`
  gap: 5px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-family: Inter;
`;
const Button = styled.div`
  width: 100%;
  height: 45px;
  background: #0096b2;
  font-family: Inter;
  text-align: center;
  font-size: 0.9rem;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #22a2be;
  }
`;

type Props = {
  setRangeAlph: React.Dispatch<React.SetStateAction<IAlphabetPart | []>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentAlphabet: IAlphabet;
  setType: React.Dispatch<React.SetStateAction<"HIRAGANA" | "KATAKANA">>;
  alphabetType: "HIRAGANA" | "KATAKANA";
  Range: IRange;
  setRange: React.Dispatch<React.SetStateAction<IRange>>;
};

function PhoneAlphabet({
  Range,
  setRange,
  setRangeAlph,
  currentAlphabet,
  alphabetType,
  setType,
  setOpen,
}: Props) {
  const [ctrlPressed, setPressed] = useState<boolean>(false);
  const [altPressed, setAlt] = useState<boolean>(false);

  return (
    <Wrapper>
      <div>
        <AlphabetTypeContainer>
          <AlphabetType onClick={() => setType("HIRAGANA")} active={alphabetType === "HIRAGANA"}>
            ХИРАГАНА
          </AlphabetType>
          <AlphabetType onClick={() => setType("KATAKANA")} active={alphabetType === "KATAKANA"}>
            КАТАКАНА
          </AlphabetType>
        </AlphabetTypeContainer>
        <SettingsWrapper>
          <SettingsItem onClick={() => (setPressed(false), setAlt(false))}>
            Выделить
            <input
              checked={!ctrlPressed && !altPressed}
              onClick={() => (setPressed(false), setAlt(false))}
              type="checkbox"
            />
          </SettingsItem>
          <SettingsItem onClick={() => (setPressed(true), setAlt(false))}>
            Добавить
            <input
              checked={ctrlPressed}
              onClick={() => (setPressed(true), setAlt(false))}
              type="checkbox"
            />
          </SettingsItem>
          <SettingsItem onClick={() => (setPressed(false), setAlt(true))}>
            Удалить
            <input
              checked={altPressed}
              onClick={() => (setPressed(false), setAlt(true))}
              type="checkbox"
            />
          </SettingsItem>
        </SettingsWrapper>
      </div>
      <AlphabetWrapper>
        <AlphabetContainer>
          <Alphabet
            alternativeCtrl={ctrlPressed}
            alternativeAlt={altPressed}
            isModal={true}
            Range={Range}
            setRange={setRange}
            alphabetType={alphabetType}
            currentAlphabet={currentAlphabet}
            setRangeAlph={setRangeAlph}
          />
        </AlphabetContainer>
      </AlphabetWrapper>
      <AlphabetBottom>
        <Button onClick={() => setOpen(false)}>Применить</Button>
      </AlphabetBottom>
    </Wrapper>
  );
}

export default PhoneAlphabet;

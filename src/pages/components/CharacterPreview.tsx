import React, { useState } from "react";
import {
  ButtonContainer,
  Char,
  InfoButton,
  MainContainer,
  OpenModalButton,
  RandomButton,
} from "../style";
import InfoModal from "./InfoModal";
import QustionImg from "../../images/Question.png";
import SettingsImg from "../../images/Settings.png";
type Props = {
  currentChar: string;
  currentCharRu: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  randomizeCharacter: () => void;
};

function CharacterPreview({ currentChar, currentCharRu, setOpen, randomizeCharacter }: Props) {
  const [isMouseIn, setIsMouseIn] = useState<boolean>(false);
  const [infoHover, setHover] = useState<boolean>(false);
  return (
    <MainContainer>
      <Char onMouseEnter={() => setIsMouseIn(true)} onMouseLeave={() => setIsMouseIn(false)}>
        {isMouseIn ? currentCharRu : currentChar}
      </Char>
      <ButtonContainer>
        <RandomButton onClick={() => randomizeCharacter()}>Рандом</RandomButton>
        <OpenModalButton onClick={() => setOpen(true)}>
          <img src={SettingsImg} alt="settings-sign" />
        </OpenModalButton>
        <InfoButton onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <img src={QustionImg} alt="question-sign" />
          {infoHover && <InfoModal />}
        </InfoButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default CharacterPreview;

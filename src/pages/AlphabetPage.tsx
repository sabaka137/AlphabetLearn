import { useState, useEffect } from "react";
import { AlphabetTypeContainer, AlphabetTypeItem, AlphabetTypeItemText, Wrapper } from "./style";
import Alphabet from "./components/Alphabet";
import { HIRAGANA, KATAKANA } from "../data";
import PhoneAlphabet from "./components/PhoneAlphabet";

import { IAlphabet, IAlphabetPart, IRange } from "../types";

import CharacterPreview from "./components/CharacterPreview";
function AlphabetPage() {
  const [Hiragana, setHiragana] = useState<IAlphabet>(HIRAGANA);
  const [Katakana, setKatakana] = useState<IAlphabet>(KATAKANA);
  const [alphabetType, setType] = useState<"HIRAGANA" | "KATAKANA">("HIRAGANA");
  const [modalOpen, setOpen] = useState<boolean>(false);
  const [RangeAlph, setRangeAlph] = useState<IAlphabetPart | []>([]);
  const [currentChar, setCurrentChar] = useState<string>("ば");
  const [currentCharRu, setCurrentCharRu] = useState<string>("a");
  const [prevChar, setPrevChar] = useState<string>("");
  const [Range, setRange] = useState<IRange>({
    first: { char: null, id: null },
    last: { char: null, id: null },
  });

  function RandomFromAnyRow() {
    let currentAlph = alphabetType === "HIRAGANA" ? [...Hiragana] : [...Katakana];
    let length = currentAlph.length;
    let row = Math.floor(Math.random() * length);
    let tempCurrentChar = currentAlph[row][Math.floor(Math.random() * currentAlph[row].length)];
    if (tempCurrentChar.jap == prevChar) {
      RandomFromAnyRow();
    } else {
      setCurrentCharRu(tempCurrentChar.ru);
      setCurrentChar(tempCurrentChar.jap);
      setPrevChar(tempCurrentChar.jap);
    }
  }

  function RandomRange() {
    let resLength = RangeAlph.length;
    let tempCurrentChar = RangeAlph[Math.floor(Math.random() * resLength)];
    if (tempCurrentChar.jap === prevChar && resLength > 1) {
      RandomRange();
    } else {
      setCurrentCharRu(tempCurrentChar.ru);
      setCurrentChar(tempCurrentChar.jap);
      setPrevChar(tempCurrentChar.jap);
    }
  }

  function randomizeCharacter() {
    if (RangeAlph.length > 0) {
      RandomRange();
    } else {
      RandomFromAnyRow();
    }
  }

  useEffect(() => {
    if (RangeAlph.length > 0) {
      RandomRange();
    }
  }, [RangeAlph]);

  return (
    <Wrapper>
      <CharacterPreview
        randomizeCharacter={randomizeCharacter}
        currentChar={currentChar}
        currentCharRu={currentCharRu}
        setOpen={setOpen}
      />

      <div>
        <AlphabetTypeContainer>
          <AlphabetTypeItem onClick={() => setType("HIRAGANA")}>
            <AlphabetTypeItemText active={alphabetType === "HIRAGANA"}>
              ХИРАГАНА
            </AlphabetTypeItemText>
          </AlphabetTypeItem>
          <AlphabetTypeItem onClick={() => setType("KATAKANA")}>
            <AlphabetTypeItemText active={alphabetType === "KATAKANA"}>
              КАТАКАНА
            </AlphabetTypeItemText>
          </AlphabetTypeItem>
        </AlphabetTypeContainer>
        <Alphabet
          alphabetType={alphabetType}
          Range={Range}
          setRange={setRange}
          isModal={false}
          currentAlphabet={alphabetType === "HIRAGANA" ? Hiragana : Katakana}
          setRangeAlph={setRangeAlph}
        />
      </div>
      {modalOpen && (
        <PhoneAlphabet
          alphabetType={alphabetType}
          Range={Range}
          setRange={setRange}
          setType={setType}
          setOpen={setOpen}
          currentAlphabet={alphabetType === "HIRAGANA" ? Hiragana : Katakana}
          setRangeAlph={setRangeAlph}
        />
      )}
    </Wrapper>
  );
}

export default AlphabetPage;

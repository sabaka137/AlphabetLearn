import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { CheckRevers } from "../../utils/CheckReverse";
import { IAlphabet, IAlphabetItem, IAlphabetPart, IRange } from "../../types";

export const AlphabetContainer = styled.div<{ isModal: boolean }>`
  box-sizing: border-box;
  padding: 0px 10px;
  color: white;
  width: 700px;
  display: flex;
  @media (max-width: 770px) {
    display: ${(props) => (props.isModal ? "flex" : "none")};
  }
`;
export const Row = styled.div`
  width: 10%;
`;
export const RowItem = styled.div<{ active: boolean; highlight: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: ${(props) => (props.active ? "white" : "#445069")};
  font-family: Noto Sans JP;
  box-shadow: ${(props) =>
    props.active
      ? "1px 0 0 0 #dadfe1, 0 1px 0 0 #dadfe1, 1px 1px 0 0 #dadfe1, 1px 0 0 0 #dadfe1 inset,0 1px 0 0 #dadfe1 inset"
      : "1px 0 0 0 #dadfe1, 0 1px 0 0 #dadfe1, 1px 1px 0 0 #dadfe1, 1px 0 0 0 #dadfe1 inset,0 1px 0 0 #dadfe1 inset"};
  background: ${(props) =>
    props.active ? "#3bb3bd" : props.highlight ? "rgba(54, 211, 254,0.2)" : "transparent"};
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 770px) {
    font-size: 15px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    height: 45px;
  }
`;

interface Props {
  setRangeAlph: React.Dispatch<React.SetStateAction<IAlphabetPart | []>>;
  currentAlphabet: IAlphabet;
  alphabetType: "HIRAGANA" | "KATAKANA";
  isModal: boolean;
  Range: IRange;
  setRange: React.Dispatch<React.SetStateAction<IRange>>;
  alternativeCtrl?: boolean;
  alternativeAlt?: boolean;
}
function Alphabet({
  alphabetType,
  setRangeAlph,
  currentAlphabet,
  isModal,
  Range,
  setRange,
  alternativeAlt,
  alternativeCtrl,
}: Props) {
  const [ctrlPressed, setPressed] = useState<boolean>(false);
  const [altPressed, setAlt] = useState<boolean>(false);

  const [HighlightRange, setHighlightRange] = useState<IRange>({
    first: { char: null, id: null },
    last: { char: null, id: null },
  });

  function setActive() {
    let tempAlphabet = CheckRevers(Range, currentAlphabet);
    let firstFound: boolean = false;
    let lastFound: boolean = false;

    tempAlphabet.map((_, index: number) =>
      tempAlphabet[index].forEach((char) => {
        if (!firstFound && char.jap === Range.first.char) {
          char.active = true;
          firstFound = true;
          if (HighlightRange.first.char === Range.last.char) {
            lastFound = true;
          }
        } else if (Range.last.char != null) {
          if (char.jap === Range.last.char) {
            char.active = true;
            lastFound = true;
          } else if (firstFound && !lastFound) {
            char.active = true;
          }
        } else {
          char.active = false;
        }
      })
    );
  }

  function setHighlight() {
    let temp = CheckRevers(HighlightRange, currentAlphabet);

    let firstFound = false;
    let lastFound = false;

    temp.map((_, index: number) =>
      temp[index].forEach((el) => {
        if (!firstFound && el.jap == HighlightRange.first.char) {
          el.highlight = true;
          firstFound = true;
          if (HighlightRange.first.char == HighlightRange.last.char) {
            lastFound = true;
          }
        } else if (HighlightRange.last.char != null) {
          if (el.jap == HighlightRange.last.char) {
            el.highlight = true;
            lastFound = true;
          } else if (firstFound && !lastFound) {
            el.highlight = true;
          } else {
            el.highlight = false;
          }
        } else {
          el.highlight = false;
        }
      })
    );
  }
  function setRangeClick(kanji: IAlphabetItem) {
    if (Range.first.char === null) {
      setRange({ first: { char: kanji.jap, id: kanji.id }, last: { char: null, id: null } });
      setHighlightRange({
        first: { char: kanji.jap, id: kanji.id },
        last: { char: null, id: null },
      });
    }
    if (Range.first.char !== null && Range.first.char !== kanji.jap) {
      setRange({ first: Range.first, last: { char: kanji.jap, id: kanji.id } });
    }
    if (Range.first.char !== null && Range.last.char !== null) {
      setRange({ first: { char: kanji.jap, id: kanji.id }, last: { char: null, id: null } });
      setHighlightRange({
        first: { char: kanji.jap, id: kanji.id },
        last: { char: null, id: null },
      });
    }
  }

  function handleEnter(kanji: IAlphabetItem) {
    setHighlightRange({ first: HighlightRange.first, last: { char: kanji.jap, id: kanji.id } });
  }
  function addSingleChar(kanji: IAlphabetItem) {
    let tempKanji = { jap: kanji.jap, ru: kanji.ru, active: true, highlight: false };
    let temp: IAlphabet = [...currentAlphabet];
    let alreadyExist = false;
    temp.map((_, index: number) => {
      temp[index].forEach((el) => {
        if (el.jap === kanji.jap) {
          if (el.active) {
            alreadyExist = true;
          } else {
            el.active = true;
          }
        }
      });
    });

    if (!alreadyExist) {
      setRangeAlph((prev: any) => [...prev, tempKanji]);
    }
  }
  function removeSingleChar(kanji: IAlphabetItem) {
    let temp = [...currentAlphabet];

    Object.keys(temp).map((_, index) => {
      temp[index].forEach((el) => {
        if (el.jap === kanji.jap) {
          el.active = false;
          el.highlight = false;
        }
      });
    });

    setRangeAlph((prev) => prev.filter((el) => el.jap !== kanji.jap));
  }
  useEffect(() => {
    if (window.innerWidth > 770) {
      window.addEventListener("keydown", (e) => {
        if (e.ctrlKey) {
          e.preventDefault();
          setPressed(true);
        }
        if (e.altKey) {
          e.preventDefault();
          setAlt(true);
        }
      });
      window.addEventListener("keyup", (e) => {
        setPressed(false);
        setAlt(false);
      });
    }
  }, []);
  useEffect(() => {
    setActive();
    setHighlight();
    if (Range.first !== null && Range.last !== null) {
      let temp = CheckRevers(Range, currentAlphabet);

      let res: IAlphabetPart = [];
      temp.forEach((_, index: number) =>
        temp[index].forEach((char) => {
          if (char.active) {
            res.push(char);
          }
        })
      );
      setRangeAlph(res);
    }
  }, [Range, HighlightRange]);

  useEffect(() => {
    let temp = CheckRevers(Range, currentAlphabet);
    let res: IAlphabetPart = [];
    temp.forEach((_, index: number) =>
      temp[index].forEach((char) => {
        if (char.active) {
          res.push(char);
        }
      })
    );
    setRangeAlph(res);
  }, [alphabetType]);
  return (
    <AlphabetContainer isModal={isModal}>
      {currentAlphabet.map((el, index: number) => (
        <Row>
          {currentAlphabet[index].map((el) => (
            <>
              <RowItem
                onMouseEnter={() => {
                  Range.first.char !== null && Range.last.char === null && handleEnter(el);
                }}
                onClick={() =>
                  ctrlPressed || alternativeCtrl
                    ? addSingleChar(el)
                    : altPressed || alternativeAlt
                    ? removeSingleChar(el)
                    : setRangeClick(el)
                }
                active={el.active}
                highlight={el.highlight}
              >
                {el.jap}
              </RowItem>
            </>
          ))}
        </Row>
      ))}
    </AlphabetContainer>
  );
}

export default Alphabet;

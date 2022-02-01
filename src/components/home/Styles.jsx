import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #A3E4DB;
  background-image: url('https://www.transparenttextures.com/patterns/cubes.png');
  /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  align-content: center;
  min-height: 90vh;
`;
const Title = styled.h1`
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding-top: 0.5rem;
`;

const TextSmall = styled.h6`
  margin: 0;
  font-style: italic;
  color: #cdd0cb;
  font-size: 0.7rem;
`;

const TextMedium = styled.h3`
  font-weight: 500;
  font-size: 1.2rem;
  margin: 1rem;
  margin-bottom: 0;
  text-align: center;

  @media (min-width: 340px) {
    font-size: 1.5rem;
  }
`;

const TextError = styled.p`
  color: red;
`;

const TextLoading = styled.p`
  color: yellow;
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const ImageContainer = styled.div`
  padding: 1rem 0.5rem 0;
  min-height: 11rem;

  > div {
    height: 8.35rem;
    border-radius: 0.3rem;
    border: 1px solid #fff;
    background-color: #172774;
    background-image: url('https://www.transparenttextures.com/patterns/little-triangles.png');
    /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */

    @media (min-width: 500px) {
      height: 13.9rem;
      border-radius: 0.6rem;
    }
  }

  & img {
    width: 6rem;

    @media (min-width: 500px) {
      width: 10rem;
    }
  }

  > p {
    text-align: center;
    font-size: 0.8rem;
    margin-bottom: 0;
  }
`;

const Button = styled.button`
  color: #fff;
  min-width: 3rem;
  font-size: 1.2rem;
  background-color: #ff0000;
  opacity: 0.8;
  border: none;
  padding: 0.65rem;
  margin-top: 0.5rem;
  border-radius: 0.3rem;

  &:disabled {
    background-color: #6e7c7c;
  }

  &:hover {
    &:not([disabled]) {
      opacity: 1;
    }
  }
`;

export default function GameWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

GameWrapper.Title = function GameWrapperTitle({ children }) {
  return <Title>{children}</Title>;
};

GameWrapper.TextSmall = function GameWrapperTextSmall({ children }) {
  return <TextSmall>{children}</TextSmall>;
};

GameWrapper.TextMedium = function GameWrapperTextMedium({ children }) {
  return <TextMedium>{children}</TextMedium>;
};

GameWrapper.TextError = function GameWrapperTextError({ children }) {
  return <TextError>{children}</TextError>;
};

GameWrapper.TextLoading = function GameWrapperTextLoading({ children }) {
  return <TextLoading>{children}</TextLoading>;
};

GameWrapper.Field = function GameWrapperField({ children }) {
  return <Field>{children}</Field>;
};

GameWrapper.ImageContainer = function GameWrapperImageContainer({ children }) {
  return <ImageContainer>{children}</ImageContainer>;
};

GameWrapper.Button = function GameWrapperButton({ onClick, disabled, text }) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

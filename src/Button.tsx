import styled from 'styled-components';

export const Button = styled.button.attrs(props => ({
  type: props.type || 'button',
}))`
  font-size: 1em;
  font-family: inherit;
  appearance: none;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 6px;
  padding: 0.25em 0.5em;
  line-height: 1;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    background-color: #eee;
    outline: none;
  }

  &:active {
    background-color: #ddd;
    color: inherit;
    transition-duration: 0.1s;
  }

  &::-moz-focus-inner {
    border: none;
  }

  @media (hover: hover) {
    &:hover {
      background-color: #eee;
    }

    &:active {
      background-color: #ddd;
      color: inherit;
    }
  }
`;

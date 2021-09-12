import styled from "@emotion/styled";

const Button = styled.button`
  border-style: none;
  background-color: ${({ theme }) => theme.color.surfacePrimary};
  border-radius: ${({ theme }) => theme.radius.small};
  appearance: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
`;

export default Button;

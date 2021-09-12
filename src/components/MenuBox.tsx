import styled from "@emotion/styled";

const MenuBox = styled.div`
  background-color: ${({ theme }) => theme.color.surfacePrimary};
  filter: ${({ theme }) => theme.shadow.drop};
  border-radius: ${({ theme }) => theme.radius.large};
  overflow: hidden;
`;

export default MenuBox;

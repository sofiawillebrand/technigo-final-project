import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: block;
  position: absolute;
  height: 130px;
  width: 100vw;
  align-items: center;
  background-color: ${(props) => props.theme.darkGreen};
  text-align: center;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const MainContainer = styled.div`
  margin: 200px auto 0 auto;
  width: 80%;
  border-color: ${(props) => props.theme.darkGreen};
  border-style: solid;
  border-width: 5px;
  border-radius: 10px;
  padding: 30px;
`;

export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModeContainer = styled.form`
  display: flex;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

export const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

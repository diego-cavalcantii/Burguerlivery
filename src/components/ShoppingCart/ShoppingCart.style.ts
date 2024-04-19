import { styled } from "styled-components";
import { colors } from "../../styles/colors";

export const ShoppingCartElement = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 450px;
  height: 100vh;
  padding: 16px;
  background-color: ${colors.commom.white};
  transform: translateX(100%);
  transition: transform 0.2s ease-out;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.open === true &&
    `
    transform: translateX(0);
    `}
`;

export const ItemShoppingCart = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 25px;
  margin-bottom: 10px;

  & > p {
    flex-grow: 1;
  }
`

export const ContainerButtonCheckout = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: end;
  /* align-items: end; */
  
`

export const ButtonCheckoutElement = styled.button`
  border: none;
  border-radius: 5px;
  padding: 10px;
  background-color: #228B22 ;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 25px;
  cursor: pointer;

  &:hover{
    background-color: green;
  }
`

export const TotalValeuCart = styled.div`
  padding: 0 0 10px 0;
  margin: 0 0 8px 0;
  border-bottom: 1px solid black;
  text-align: right;

  text-transform: uppercase;
  & > p {
    font-weight: 900;
    font-size: 1.08rem;
  }
`
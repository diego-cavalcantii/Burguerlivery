import { colors } from './../../styles/colors';
import { styled } from "styled-components";
import { colors } from "../../styles/colors";

export const ItemCheckout = styled.div`
  display: flex;
  width: 50%;
  /* border: 1px solid white; */
  background-color: white;
  padding:10px;
  border-radius: 3px;
  align-items: center;
  margin-bottom: 10px;

  & > p {
    flex-grow: 1;
  }
`

export const FinishPurchase = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
`

export const ButtonFinish = styled.button`
  border: none;
  border-radius: 5px;
  padding: 12px;
  background-color: #228B22 ;
  color: white;
  font-weight: 700;
  margin: 1rem 0;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
  transition: all ease-out 0.3s;

  &:hover{
    background-color: green;
  }
`

export const TotalElement = styled.div`
  padding: 10px 0 ;
  text-transform: uppercase;
  & > p {
    font-weight: 900;
    font-size: 1.05rem;
  }
`
export const PaymantOptionElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  padding: 10px 0;
  /* & > label {
    font-size: 1rem;
  } */
`
export const SelectElement = styled.select`
  border: none;
  background-color:  ${colors.primary.main};
  border-radius: 5px;
  padding: 10px 10px 10px 1px;
  transition: all ease-out 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #eead2d;
  }

  & > option {
    background-color: white;
  }
`


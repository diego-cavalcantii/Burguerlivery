import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderContext from "../../context/OrderContext";
import { ButtonCheckoutElement, ContainerButtonCheckout, ItemShoppingCart, ShoppingCartElement, TotalValeuCart } from "./ShoppingCart.style";
import { priceFormat } from "../../helpers/priceFormat";
import { ButtonDeleteItem } from "../Button/Button";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };
  const { hamburgerOrder, setHamburgerOrder, appettizerOrder, setAppettizerOrder, order, setOrder } = useContext(
    OrderContext
  );


  return (
    <ShoppingCartElement open={isOpen}>
      <h1>Carrinho de compras</h1>
      <div>
        {appettizerOrder.map((appettizer, index) => (
          <ItemShoppingCart>
            <p key={index}>
              {appettizer.name} - {appettizer.size}{" "}
              {priceFormat(appettizer.value)}
            </p>
            <ButtonDeleteItem index={index} productOrder={appettizerOrder} setProductOrder={setAppettizerOrder} />
          </ItemShoppingCart>
        ))}
      </div>
      <div>
        {hamburgerOrder.map((hamburger, index) => (
          <ItemShoppingCart>
            <p key={index}>
              {hamburger.name} {priceFormat(hamburger.value)}
            </p>
            <ButtonDeleteItem index={index} productOrder={hamburgerOrder} setProductOrder={setHamburgerOrder} />
          </ItemShoppingCart>
        ))}
      </div>
      <ContainerButtonCheckout>
        <TotalValeuCart>
          <p>Total: {priceFormat(order.totalValue)}</p>
        </TotalValeuCart>
        {order.totalValue > 0 ? <ButtonCheckoutElement onClick={handleClick}>Checkout</ButtonCheckoutElement> : null}
      </ContainerButtonCheckout>
    </ShoppingCartElement >
  );
};
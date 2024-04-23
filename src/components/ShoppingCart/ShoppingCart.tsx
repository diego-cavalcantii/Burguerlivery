import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderContext from "../../context/OrderContext";
import { ButtonCheckoutElement, ContainerButtonCheckout, ItemShoppingCart, ShoppingCartElement, TotalValeuCart, CloseButton } from "./ShoppingCart.style";
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
  const { hamburgerOrder, setHamburgerOrder,
    appettizerOrder, setAppettizerOrder,
    beverageOrder, setBeverageOrder,
    comboOrder, setComboOrder,
    dessertOrder, setDessertOrder,
    order, setOrder } = useContext(
      OrderContext
    );


  return (
    <ShoppingCartElement open={isOpen}>
      <CloseButton onClick={onClose}>Fechar</CloseButton>
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
      <div>
        {beverageOrder.map((beverage, index) => (
          <ItemShoppingCart>
            <p key={index}>
              {beverage.name} {priceFormat(beverage.value)}
            </p>
            <ButtonDeleteItem index={index} productOrder={beverageOrder} setProductOrder={setBeverageOrder} />
          </ItemShoppingCart>
        ))}
      </div>
      <div>
        {comboOrder.map((combo, index) => (
          <ItemShoppingCart>
            <p key={index}>
              {`COMBO ${combo.name} ${priceFormat(combo.value)}`}
            </p>
            <ButtonDeleteItem index={index} productOrder={comboOrder} setProductOrder={setComboOrder} />
          </ItemShoppingCart>
        ))}
      </div>
      <div>
        {dessertOrder.map((dessert, index) => (
          <ItemShoppingCart>
            <p key={index}>
              {dessert.name} {priceFormat(dessert.value)}
            </p>
            <ButtonDeleteItem index={index} productOrder={dessertOrder} setProductOrder={setDessertOrder} />
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

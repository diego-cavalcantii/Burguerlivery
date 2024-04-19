import { ButtonHTMLAttributes } from "react";
import { ButtonDeleteElement, ButtonElement } from "./Button.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  inverse?: boolean;
  size?: "large" | "small" | undefined;
  variant?: "info" | "danger" | undefined;
  onClick: () => void;
}


export const Button = ({
  children,
  inverse,
  size,
  variant,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonElement
      size={size}
      inverse={inverse}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </ButtonElement>
  );
};




export const ButtonDeleteItem = ({ index, productOrder, setProductOrder }) => {

  function handleRemoveItem(index: number, itemOrder: any, setItemOrder: any) {
    const updatedOrder = itemOrder.filter((_, i) => i !== index);
    setItemOrder(updatedOrder);
  };
  return <ButtonDeleteElement onClick={() => handleRemoveItem(index, productOrder, setProductOrder)}>Excluir</ButtonDeleteElement>

}

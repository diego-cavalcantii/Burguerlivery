import { createContext, useEffect, useState } from "react";

type OrderContextProps = {
  appettizer: [];
  hamburger: [];
  combo: [];
  dessert: [];
  beverage: [];
  totaValue: number;
  paymantMethod: [];
};

const OrderContext = createContext<OrderContextProps>({});

interface OrderContextProviderProps {
  children: React.ReactNode;
}

const OrderContextProvider = ({ children }: OrderContextProviderProps) => {
  const inicialOrder = {
    appettizer: [],
    hamburger: [],
    combo: [],
    dessert: [],
    beverage: [],
    totalValue: 0,
    paymantMethod: [],
  };

  const [appettizerOrder, setAppettizerOrder] = useState([]);
  const [hamburgerOrder, setHamburgerOrder] = useState([]);
  const [beverageOrder, setBeverageOrder] = useState([]);
  const [comboOrder, setComboOrder] = useState([]);
  const [dessertOrder, setDessertOrder] = useState([]);
  const [selectedPaymantOrder, setSelectedPaymantOrder] = useState([]);
  const [order, setOrder] = useState(inicialOrder);

  const sumValues = (arrayValues) => {
    return arrayValues.reduce(
      (acumulador, valorAtual) => acumulador + Number(valorAtual),
      0
    );
  };

  const getPrices = (values) => {
    const result = values.map((item) => item.value);
    return result;
  };

  useEffect(() => {
    const subTotalHamburgers = getPrices(hamburgerOrder);
    const subTotalAppetizer = getPrices(appettizerOrder);
    const subTotalBeverage = getPrices(beverageOrder);
    const subTotalCombo = getPrices(comboOrder);
    const subtTotalDessert = getPrices(dessertOrder);
    const subtotal = subTotalHamburgers.concat(
      subTotalAppetizer,
      subTotalBeverage,
      subTotalCombo,
      subtTotalDessert
    );

    const internalOrder = {
      ...order,
      ["hamburger"]: hamburgerOrder,
      ["appettizer"]: appettizerOrder,
      ["beverage"]: beverageOrder,
      ["combo"]: comboOrder,
      ["dessert"]: dessertOrder,
      totalValue: sumValues(subtotal),
      ["paymantMethod"]: selectedPaymantOrder,
    };

    setOrder(internalOrder);
  }, [hamburgerOrder, appettizerOrder, beverageOrder, comboOrder, dessertOrder, selectedPaymantOrder, setOrder]);

  return (
    <OrderContext.Provider
      value={{
        appettizerOrder,
        setAppettizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        beverageOrder,
        setBeverageOrder,
        comboOrder,
        setComboOrder,
        dessertOrder,
        setDessertOrder,
        selectedPaymantOrder,
        setSelectedPaymantOrder,
        order,
        setOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContextProvider };
export default OrderContext;

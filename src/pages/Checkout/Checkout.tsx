import { useContext, useState, useEffect } from "react";
import OrderContext from "../../context/OrderContext";
import { ButtonDeleteItem, Layout } from "../../components";
import { priceFormat } from "../../helpers/priceFormat";
import { ButtonFinish, FinishPurchase, ItemCheckout, SelectElement, TotalElement, PaymantOptionElement } from "./Checkout.style";


export default function Checkout() {
  const { hamburgerOrder, setHamburgerOrder,
    appettizerOrder, setAppettizerOrder,
    beverageOrder, setBeverageOrder,
    comboOrder, setComboOrder,
    dessertOrder, setDessertOrder,
    selectedPaymantOrder, setSelectedPaymantOrder,
    order, setOrder } = useContext(
      OrderContext
    );
  const [paymant, setPaymant] = useState([])
  const [orderLog, setOrderLog] = useState([])

  const getCheckout = async () => {
    const url = "https://burgerlivery-api.vercel.app/payment/options";

    const response = await fetch(url);
    const data = await response.json();
    setPaymant(data);
  }

  useEffect(() => {
    if (paymant.length) {
      return;
    }

    return () => {
      getCheckout();
    };
  }, []);


  const productsDetails = (order) => {
    return order.map(product => ({ name: product.name, value: priceFormat(product.value) }))
  }

  const generateProducts = {
    ["hamburger"]: productsDetails(hamburgerOrder),
    ["appettizer"]: productsDetails(appettizerOrder),
    ["combo"]: productsDetails(comboOrder),
    ["dessert"]: productsDetails(dessertOrder),
    ["beverage"]: productsDetails(beverageOrder),
  }

  useEffect(() => {
    const selectedObject = paymant.find(product => product.id === selectedPaymantOrder);
    if (selectedObject) {
      setSelectedPaymantOrder(selectedObject)
    }
  }, [selectedPaymantOrder]);

  const FinalizarCompra = () => {
    const products = generateProducts;
    setOrderLog([products, "Total " + priceFormat(order.totalValue),order.paymantMethod.text])
  }

  useEffect(() => {
    if (orderLog.length > 0) {
      console.log(orderLog);
    }
  }, [orderLog]);

  

  return (
    <Layout>
      <h1>Checkout</h1>
      <h2>Produtos</h2>
      <div>
        {appettizerOrder.map((appettizer, index) => (
          <ItemCheckout>
            <p key={index}>
              {appettizer.name} - {appettizer.size}{" "}
              {priceFormat(appettizer.value)}
            </p>
            <ButtonDeleteItem index={index} productOrder={appettizerOrder} setProductOrder={setAppettizerOrder} />
          </ItemCheckout>
        ))}
      </div>
      <div>
        {hamburgerOrder.map((hamburger, index) => (
          <ItemCheckout>
            <p key={index}>
              {hamburger.name} {priceFormat(hamburger.value)}
            </p>
            <ButtonDeleteItem index={index} productOrder={hamburgerOrder} setProductOrder={setHamburgerOrder} />
          </ItemCheckout>
        ))}
      </div>
      <div>
        {beverageOrder.map((beverage, index) => (
          <ItemCheckout>
            <p key={index}>
              {beverage.name} {priceFormat(beverage.value)}
            </p>
            <ButtonDeleteItem index={index} productOrder={beverageOrder} setProductOrder={setBeverageOrder} />
          </ItemCheckout>
        ))}
      </div>
      <div>
        {comboOrder.map((combo, index) => (
          <ItemCheckout>
            <p key={index}>
              {`COMBO ${combo.name} ${priceFormat(combo.value)}`}
            </p>
            <ButtonDeleteItem index={index} productOrder={comboOrder} setProductOrder={setComboOrder} />
          </ItemCheckout>
        ))}
      </div>
      <div>
        {dessertOrder.map((dessert, index) => (
          <ItemCheckout>
            <p key={index}>
              {dessert.name} {priceFormat(dessert.value)}
            </p>
            <ButtonDeleteItem index={index} productOrder={dessertOrder} setProductOrder={setDessertOrder} />
          </ItemCheckout>
        ))}
      </div>
      <TotalElement>
        <p>Total: {priceFormat(order.totalValue)}</p>
      </TotalElement>
      <PaymantOptionElement>
        <label htmlFor="paymant">Forma de Pagamento</label>
        <SelectElement id="paymant" onChange={(e) => setSelectedPaymantOrder(e.target.value)}>
          <option disabled selected hidden>Escolha uma opção</option>
          {paymant.map(({ id, text }) => (
            <option value={id} key={id}>{text}</option>
          ))}
        </SelectElement>
      </PaymantOptionElement>
      <FinishPurchase>
        <ButtonFinish onClick={() => FinalizarCompra()}>Finalizar Compra</ButtonFinish>
      </FinishPurchase>
    </Layout >
  )
}

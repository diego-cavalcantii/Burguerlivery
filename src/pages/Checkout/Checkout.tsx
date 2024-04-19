import { useContext, useState, useEffect } from "react";
import OrderContext from "../../context/OrderContext";
import { ButtonDeleteItem, Layout } from "../../components";
import { priceFormat } from "../../helpers/priceFormat";
import { ButtonFinish, FinishPurchase, ItemCheckout, SelectElement, TotalElement, PaymantOptionElement } from "./Checkout.style";


export default function Checkout() {
  const { hamburgerOrder, setHamburgerOrder, appettizerOrder, setAppettizerOrder, order, setOrder } = useContext(
    OrderContext
  );
  const [paymant, setPaymant] = useState([])
  const [selectedPaymant, setSelectedPaymant] = useState("");
  const [orderLog, setOrderLog] = useState([])

  const getCheckout = async () => {
    const url = "http://localhost:8000/payment/options";

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

  useEffect(() => {
    if (orderLog.length > 0) {
      console.log(orderLog);
    }
  }, [orderLog]);


  function FinalizarCompra(...productOrder) {
    setOrderLog([...productOrder]);
  }

  // const productsDetails = (order) => {
  //   return order.map(product => ({ name: product.name, value: priceFormat(product.value) }))
  // }

  // const products = {
  //   ["hamburger"]: productsDetails(hamburgerOrder),
  //   ["appettizer"]: productsDetails(appettizerOrder),
  // }

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
      <TotalElement>
        <p>Total: {priceFormat(order.totalValue)}</p>
      </TotalElement>
      <PaymantOptionElement>
        <label htmlFor="paymant">Forma de Pagamento</label>
        <SelectElement id="paymant" onChange={(e) => setSelectedPaymant(e.target.value)}>
          <option disabled selected hidden>Escolha uma opção</option>
          {paymant.map(({ id, text }) => (
            <option value={text} key={id}>{text}</option>
          ))}
        </SelectElement>
      </PaymantOptionElement>
      <FinishPurchase>
        <ButtonFinish onClick={() => FinalizarCompra(order, priceFormat(order.totalValue), selectedPaymant)}>Finalizar Compra</ButtonFinish>
      </FinishPurchase>
    </Layout >
  )
}
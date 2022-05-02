import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";

const Form: React.FC = () => {
  const [currency1, setCurrency1] = useState("usd");
  const [currency2, setCurrency2] = useState("uah");

  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);

  const [currenciesFetched, setCurrenciesFetched] = useState(true);
  const [amountToUpdate, setAmountToUpdate] = useState("amount1");

  useEffect(() => {
    const fetchData = async () => {
      if (!currenciesFetched) {
        const response = await fetch(
          amountToUpdate === "amount1"
            ? `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency2}/${currency1}.json`
            : `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1}/${currency2}.json`
        );
        const necessaryAmount = await response.json();
        if (amountToUpdate === "amount1") {
          const amount = necessaryAmount[currency1] * amount2;
          const shortenedAmount = amount.toFixed(3);
          setAmount1(Number(shortenedAmount));

          setCurrenciesFetched(true);
        }
        if (amountToUpdate === "amount2") {
          const amount = necessaryAmount[currency2] * amount1;
          const shortenedAmount = amount.toFixed(3);
          setAmount2(Number(shortenedAmount));

          setCurrenciesFetched(true);
        }
      }
    };

    fetchData().catch(console.error);
  }, [
    amountToUpdate,
    currenciesFetched,
    amount1,
    amount2,
    currency1,
    currency2,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.currencyOption}>
          <label htmlFor="number-currency-1">Currency 1</label>
          <div>
            <input
              min={0}
              onChange={(event) => {
                setAmount1(+event.target.value);
                setAmountToUpdate("amount2");
                setCurrenciesFetched(false);
              }}
              className={styles.input}
              id="number-currency-1"
              type="number"
              value={amount1}
            />
            <select
              className={styles.select}
              onChange={(event) => {
                setCurrency1(event.target.value);
                setAmountToUpdate("amount2");
                setCurrenciesFetched(false);
              }}
            >
              <option value="usd">USD</option>
              <option value="uah">UAH</option>
              <option value="eur">EUR</option>
            </select>
          </div>
        </div>
        <div>to: </div>
        <div className={styles.currencyOption}>
          <label htmlFor="number-currency-2">Currency 2</label>
          <div>
            <input
              onChange={(event) => {
                setAmount2(+event.target.value);
                setAmountToUpdate("amount1");
                setCurrenciesFetched(false);
              }}
              className={styles.input}
              id="number-currency-2"
              type="number"
              min={0}
              value={amount2}
            />
            <select
              className={styles.select}
              onChange={(event) => {
                setCurrency2(event.target.value);

                setCurrenciesFetched(false);
              }}
            >
              <option value="uah">UAH</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

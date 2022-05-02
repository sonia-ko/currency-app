import React from "react";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [euValue, setEuValue] = useState(0);
  const [usValue, setUsValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/uah.json"
      );

      const euData = await response.json();

      setEuValue(euData.uah.toFixed(2));

      const responseUs = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/uah.json"
      );

      const usData = await responseUs.json();

      setUsValue(usData.uah.toFixed(2));
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <header className={styles.container}>
      <div className={styles.logo}>CURRENCY UA</div>
      <div className={styles.currencies}>
        <div className={styles.currency}>
          € <span className={styles.currencyValue}> {euValue} UAH</span>
        </div>
        <div className={styles.currency}>
          $ <span className={styles.currencyValue}>{usValue} UAH</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

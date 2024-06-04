import React, { useEffect, useState } from "react";
import styles from "./ExpensesPage.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

function AccountRow({ account }) {
  return (
    <li className={styles.item}>
      <Link to={`/accounts/${account.id}`} className={styles.itemInner}>
        <div className={styles.descriptionText}>{account.name} - {account.number}</div>
        <div className={styles.amountText}>${account.balance}</div>
      </Link>
    </li>
  );
}

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axiosClient.get('/accounts').then(response => {
      setAccounts(response.data)
    })
  }, [])

  if (accounts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateMessage}>
          You haven't no accounts. Create one please :D
        </div>
        <Button to={"/accounts/new"}>New Account</Button>
      </div>
    )
  }
  
  return (
    <>
      <ul className={styles.list}>
        {accounts.map((account) => (
          <AccountRow key={account.id} account={account} />
        ))}
      </ul>

      <div className={styles.actions}>
        <Button to={"/accounts/new"}>New Account</Button>
      </div>
    </>
  )
}

export default AccountsPage;
import React, { useState } from 'react';
import axios from 'axios';
import Button from "./Button";
import styles from "./ExpenseEdit.module.css";
import axiosClient from '../utils/axiosClient';
import { useHistory } from 'react-router-dom';

const AccountForm = ({ account, onSave, disabled }) => {
    const [name, setName] = useState(account ? account.name : '');
    const [number, setNumber] = useState(account ? account.number : '');
    const history = useHistory();
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = { name, number };
      
      if (account) {
        axiosClient.put(`/accounts/${account.id}`, payload).then(response => {
          onSave(response.data);
        });
      } else {
        axiosClient.post('/accounts', payload).then(response => {
          onSave(response.data);
        });
      }
    };

    const handleDelete = () => {
      console.log('account', account)
      
      if (account) {
        axiosClient.delete(`/accounts/${account.id}`);
        history.goBack()
      }
    };

    return (
      <form autoComplete={"off"} onSubmit={handleSubmit} className={styles.form}>
        <fieldset disabled={disabled ? "disabled" : undefined}>
          <div className={styles.formRow}>
            <label htmlFor="name">Name</label>
            <input value={name} type={"text"} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="number">Number</label>
            <input value={number} type={"number"} onChange={(e) => setNumber(e.target.value)} required />
          </div>
        </fieldset>

        <div className={styles.formFooter}>
          <Button
            type={"submit"}
          >
            Save
          </Button>

          {account && account.id && (
            <Button action={handleDelete} kind={"danger"}>
              Delete
            </Button>
          )}
        </div>
        
      </form>
    );
};

export default AccountForm;
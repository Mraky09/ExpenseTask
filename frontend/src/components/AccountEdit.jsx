import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { useNotifications } from "./Notifications";
import AccountForm from "./AccountForm";
import axiosClient from "../utils/axiosClient";

function AccountEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const { notifyError, notifySuccess } = useNotifications();
  const history = useHistory();
  const { id } = useParams();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (id) {
      axiosClient.get(`/accounts/${id}`).then(data => {
        setAccount(data.data)
      })
    }
  }, [id])

  async function handleSave(data) {
    try {
      history.push('/accounts');

      notifySuccess(
        "Awesome, your account is created successfully!"
      );
    } catch (error) {
      notifyError(
        "Failed to save account. Please check your internet connection"
      );
    } finally {
      notifySuccess(
        "Awesome, your account is created successfully!"
      );
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return account && <AccountForm onSave={handleSave} account={account} />;
}

export default AccountEdit;

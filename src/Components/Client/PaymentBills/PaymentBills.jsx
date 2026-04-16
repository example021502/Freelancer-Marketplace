import React from "react";
import { get_user_data } from "../../utils/backend_calls_functions";

const loadPayments = async () => {
  const userToken = await get_user_data();
  if (!userToken)
    return showError(
      "Could not load the user email form token! Please try again later.",
    );
  const payments = await getPaymentsByEmail(userToken?.email);
};

function PaymentBills() {
  return <div>Payment Bills</div>;
}

export default PaymentBills;

import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-3xl font-bold">Payment History: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Paid Time</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                payments.map((payment, index) =>  <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>Cy Ganderton</td>
              <td>${payment.amount}</td>
              <td>{payment.paidAt}</td>
              <td>{payment.transactionId}</td>
            </tr>)
            }
           
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

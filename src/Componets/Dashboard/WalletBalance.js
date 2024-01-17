import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalCost } from "../../store/formSlice";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Controller, useForm } from "react-hook-form";
const WalletBalance = () => {
  const [balance, setBalance] = useState(0);
  const [addAmount, setAddAmount] = useState(0);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get("your-api-endpoint/wallet/balance");
        const walletBalance = response.data.balance;
        setBalance(walletBalance);
      } catch (error) {
        console.error("Error fetching wallet balance:", error.message);
      }
    };

    fetchWalletBalance();
  }, []);
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { handleSubmit, control } = useForm();

  const onToken = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/order/wallet-payment-stripe",
        {
          token: token.id,
          amount: addAmount * 100,
          email: user?.email, // Convert to cents
        }
      );
      if (response.data) {
        dispatch(updateTotalCost(addAmount));
      }
      setAddAmount(0);
      toast.success("Payment confirmation successful!", {
        position: toast.POSITION.TOP_CENTER,
      });
      // eslint-disable-next-line no-restricted-globals

      console.log("Payment confirmation successful:", response.data);
    } catch (error) {
      console.error("Error confirming payment:", error.message);
    }
  };
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/v1/user/add-bank?email=${user?.email}`,
        {
          ...data,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
    console.log(data);
  };
  return (
    <div>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="my-4">Wallet Balance</Card.Title>
          <Card.Text>Your current wallet balance is: ${wallet}</Card.Text>

          <Form.Group className="mb-3">
            <Form.Label>Add Funds</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={addAmount}
              onChange={(e) => setAddAmount(parseFloat(e.target.value))}
            />
          </Form.Group>
          <StripeCheckout
            stripeKey="pk_test_51L1aStLPuz8KfNo1cJbijbXDiiEzbd4aSzzxXGXVyx5onnrUyPgxM7F1o8wcKEj9AsUiqErylJ9KkmEahCoqDKPs00v3wNR5zy"
            amount={addAmount * 100} // Convert to cents
            token={onToken} // Callback function for successful payment
          />
        </Card.Body>
      </Card>
      <div className="mt-5">
        <h3 className="fw-bold">You can send payment using bank</h3>
        Our Bank: Prime Bank LTD Account NO:112425154
      </div>
      If you send payment fill this form
      <div className="mt-5 p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 p-10">
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Your Bank
            </span>
            <Controller
              name="yourBank"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              )}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Transaction id
            </span>
            <Controller
              name="transactionId"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              )}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Amount
            </span>
            <Controller
              name="amount"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              )}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default WalletBalance;

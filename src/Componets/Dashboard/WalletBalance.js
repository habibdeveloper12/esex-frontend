import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalCost } from "../../store/formSlice";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
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

  const onToken = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/order/wallet-payment-stripe",
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
  return (
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
  );
};

export default WalletBalance;

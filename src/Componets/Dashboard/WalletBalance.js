import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const WalletBalance = () => {
  const [balance, setBalance] = useState(0);
  const [addAmount, setAddAmount] = useState(0);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get('your-api-endpoint/wallet/balance');
        const walletBalance = response.data.balance;
        setBalance(walletBalance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error.message);
      }
    };

    fetchWalletBalance();
  }, []);

  const handleAddFunds = async () => {
    try {
      // Replace with your actual API endpoint for adding funds
      const response = await axios.post('your-api-endpoint/wallet/add', {
        amount: addAmount,
      });

      // Assuming the API returns the updated balance
      const updatedBalance = response.data.balance;
      setBalance(updatedBalance);

      // Clear the addAmount input
      setAddAmount(0);

      // You can also show a success message or trigger other actions
    } catch (error) {
      console.error('Error adding funds:', error.message);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="my-4">Wallet Balance</Card.Title>
        <Card.Text>Your current wallet balance is: ${balance}</Card.Text>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Add Funds</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={addAmount}
              onChange={(e) => setAddAmount(parseFloat(e.target.value))}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAddFunds}>
            Add Funds
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default WalletBalance;

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Checkout';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY);

const Payment = ({ formData }) => {
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd'
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm formData={formData} />
    </Elements>
  );
};
export default Payment;

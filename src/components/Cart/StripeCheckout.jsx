import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51MvPLvDL8W5WinuDzV4Ky34H450ujpVjQXHLfCb2oZ4u0ZrrxXAIFowf1klW3GGdpdlejzaU5NcWPtnI1z8LJZsg00YoYbXcsw'
);

function StripeCheckout() {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: '{{CLIENT_SECRET}}',
  // };
  // {/*options={options}*/}

  return (
    <Elements stripe={stripePromise}>
      <div>Test</div>
    </Elements>
  );
}

export default StripeCheckout;

import React from 'react';
import Checkout from './Checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Key)
// console.log(stripePromise);

const Payment = () => {
    const location = useLocation();
    console.log(location);
    return (
        <div>
            <Elements stripe={stripePromise} >
                <Checkout classItem={location?.state?.class} />
            </Elements>
        </div>
    );
};

export default Payment;
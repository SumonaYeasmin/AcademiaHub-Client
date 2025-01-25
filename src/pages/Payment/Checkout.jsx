import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Checkout = ({ classItem }) => {
    console.log(classItem);
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState(null);
    const price = classItem.price;

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log("Error", error);
            // toast.error(error.message)
            setError(error.message);
        }
        else {
            console.log("Payment Method", paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log("Confirm Error", confirmError);
        }
        else {
            console.log("Pament Intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                const paymentInfo = {
                    email: user.email,
                    name: user.displayName,
                    price: price,
                    transactionId: paymentIntent.id,
                    photoURL: classItem.photoURL,
                    title: classItem.title,
                    description: classItem.description,
                    totalEnrollment: classItem.totalEnrolment,
                    teacherEmail: classItem.email,
                    teacherName: classItem.name,
                    status: 'Pending'
                };

                const res = await axiosSecure.post('/payments', paymentInfo)
                // console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Congratulations! You have successfully completed the payment.');
                    // refetch();
                    // navigate('/invoice', { state: { paymentInfo } })
                }
            }
        }
    }

    return (
        <div className="bg-gray-50 max-w-[600px] mx-auto p-4 md:p-8 rounded-lg shadow-lg mt-10">
            <h1 className="text-center text-2xl font-semibold mb-6 text-teal-600">Checkout</h1>
            {/* <h2 className="text-center text-xl mb-6">Total Price: <span className="text-teal-600 font-bold">₹{totalPrice}</span></h2> */}
            <h2 className="text-center text-xl mb-6">Total Price: <span className="text-teal-600 font-bold">${price}</span></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                />
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <div className="text-center mt-6">
                    <button
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-teal-700 transition duration-300"
                        type="submit"
                    >
                        Purchase
                    </button>
                </div>

                <div className="text-center mt-6"></div>
                {/* {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <div className="text-center mt-6">
                    <button
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-teal-700 transition duration-300"
                        type="submit"
                    >
                        Purchase
                    </button>
                </div> */}
            </form>
        </div>
    );
};

export default Checkout;
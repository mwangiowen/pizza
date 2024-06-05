import React, { useState } from 'react';
import { FaShoppingCart, FaTruck, FaCreditCard, FaClipboardCheck, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({ fullName: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleConfirmOrder = () => {
    // Simulating order confirmation logic
    setTimeout(() => {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/home');
      }, 2000);
    }, 1000);
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <Link to="/home">
        <FaHome className="text-2xl text-blue-500 mb-4" />
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="flex justify-center mb-6">
        <StepItem icon={<FaShoppingCart />} text="Cart Summary" stepNumber={1} currentStep={step} />
        <StepItem icon={<FaTruck />} text="Shipping Information" stepNumber={2} currentStep={step} />
        <StepItem icon={<FaCreditCard />} text="Payment Options" stepNumber={3} currentStep={step} />
        <StepItem icon={<FaClipboardCheck />} text="Order Review" stepNumber={4} currentStep={step} />
      </div>
      <div className="bg-white rounded-lg p-6 mb-6">
        {/* Render step content based on the current step */}
        {step === 1 && <CartSummary onNextStep={handleNextStep} />}
        {step === 2 && (
          <ShippingInformation
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
            onChange={handleShippingInfoChange}
            shippingInfo={shippingInfo}
          />
        )}
        {step === 3 && (
          <PaymentOptions
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
            onPaymentMethodChange={handlePaymentMethodChange}
          />
        )}
        {step === 4 && (
          <OrderReview
            onPrevStep={handlePrevStep}
            onConfirmOrder={handleConfirmOrder}
            paymentMethod={paymentMethod}
            shippingInfo={shippingInfo}
          />
        )}
      </div>
      {/* Show success modal when the order is confirmed */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-green-500 text-2xl mb-4">Order Successful!</p>
            <p className="text-center">Redirecting to home...</p>
          </div>
        </div>
      )}
    </div>
  );
};

const StepItem = ({ icon, text, stepNumber, currentStep }) => {
  return (
    <div className="flex items-center mr-4">
      {icon}
      <span className={`text-sm mr-2 ${currentStep >= stepNumber ? 'text-blue-500' : 'text-gray-400'}`}>
        {text}
      </span>
    </div>
  );
};

const CartSummary = ({ onNextStep }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
      {/* Placeholder for displaying cart items */}
      <div className="mb-4">
        <p className="font-semibold">Items in Cart:</p>
        <ul>
          <li>Product 1 - $10</li>
          <li>Product 2 - $20</li>
          {/* Add more items as needed */}
        </ul>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onNextStep}>
        Continue to Shipping
      </button>
    </>
  );
};

const ShippingInformation = ({ onPrevStep, onNextStep, onChange, shippingInfo }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your address"
          />
        </div>
      </form>
      <div className="flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onPrevStep}>
          Back
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onNextStep}>
          Continue to Payment
        </button>
      </div>
    </>
  );
};

const PaymentOptions = ({ onPrevStep, onNextStep, onPaymentMethodChange }) => {
  const handlePaymentMethodSelect = (event) => {
    onPaymentMethodChange(event.target.value);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
      {/* Payment options */}
      <div className="mb-4">
        <label className="block mb-2">
          <input type="radio" name="paymentMethod" value="creditCard" onChange={handlePaymentMethodSelect} />
          Credit Card
        </label>
        <label className="block mb-2">
          <input type="radio" name="paymentMethod" value="paypal" onChange={handlePaymentMethodSelect} />
          PayPal
        </label>
        <label className="block mb-2">
          <input type="radio" name="paymentMethod" value="stripe" onChange={handlePaymentMethodSelect} />
          Stripe
        </label>
      </div>
      <div className="flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onPrevStep}>
          Back
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onNextStep}>
          Continue to Review
        </button>
      </div>
    </>
  );
};

const OrderReview = ({ onPrevStep, onConfirmOrder, paymentMethod, shippingInfo }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Order Review</h2>
      <p className="mb-4">Shipping Address: {shippingInfo.fullName}, {shippingInfo.address}</p>
      <p className="mb-4">Payment Method: {paymentMethod}</p>
      <div className="flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onPrevStep}>
          Back
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onConfirmOrder}>
          Confirm Order
        </button>
      </div>
    </>
  );
};

export default Checkout;

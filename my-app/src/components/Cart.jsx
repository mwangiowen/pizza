import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total payable price when cart changes
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  }, [cart]);

  const handleRemoveFromCart = (itemId) => {
    // Remove the item from cart and update frontend immediately
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    // Show success toast
    toast.success('Item removed successfully', {
      position: 'top-center',
    });
  };

  const removeFromCart = async (itemId) => {
    try {
      // Display confirmation toast
      toast.info(
        <div>
          <span>Are you sure you want to remove this item?</span>
          <button onClick={() => handleRemoveFromCart(itemId)}>Yes</button>
        </div>,
        {
          position: 'top-center',
          autoClose: false,
          closeButton: true,
          closeOnClick: false,
        }
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Show error toast
      toast.error('Failed to remove item from cart', {
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    const confirmBeforeReload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      // Show confirmation toast when attempting to refresh
      toast('Are you sure you want to reload the page?', {
        position: 'top-center',
        autoClose: false,
        closeButton: true,
        closeOnClick: false,
      });
    };

    window.addEventListener('beforeunload', confirmBeforeReload);

    return () => {
      window.removeEventListener('beforeunload', confirmBeforeReload);
    };
  }, []);

  return (
    <div className="bg-white text-red-400 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between mb-2 border-b-2 pb-2">
                <div className="flex items-center">
                  <img src={`https://source.unsplash.com/160x160/?pizza&t=${Date.now()}`} alt="Pizza" className="w-16 h-16 mr-4 rounded-full" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.ingredients}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    disabled
                    className="w-12 mr-2 border rounded-md px-2 py-1 text-center"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                    <AiOutlineDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold">Total Payable:</span>
            <span className="text-lg font-semibold">{totalPrice.toFixed(2)}</span>
          </div>
          <p className="mt-4">
            <Link to="/checkout" className="text-blue-500 hover:underline">
              Proceed to Checkout
            </Link>
          </p>
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty</p>
      )}

      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default Cart;
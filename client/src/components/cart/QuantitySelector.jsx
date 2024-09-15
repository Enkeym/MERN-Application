import React, {useState, useEffect, useCallback} from "react";
import {useEditCartQuantityMutation, useRemoveFromCartMutation} from "../../app/services/cartApi";
import {toast} from "react-toastify";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeFromLocalCart, updateCartQuantity} from "../../features/cartSlice";

const QuantitySelector = ({productId}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.productId === productId));

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const [editCartQuantity, {isLoading}] = useEditCartQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleQuantityChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setQuantity(value);
  };

  const handleKeyDown = (e) => {
    if (
      !(
        (e.key >= "0" && e.key <= "9") ||
        ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"].includes(e.key)
      )
    ) {
      e.preventDefault();
    }
  };

  const handleUpdate = useCallback(async (newQuantity) => {
    if (!cartItem || newQuantity === cartItem.quantity) return;

    try {
      if (newQuantity < 1) {
        await removeFromCart(productId).unwrap();
        dispatch(removeFromLocalCart({productId}));
        toast.success("Product removed from cart");
      } else {
        await editCartQuantity({productId: cartItem.productId, quantity: newQuantity}).unwrap();
        dispatch(updateCartQuantity({productId: cartItem.productId, quantity: newQuantity}));
        /* toast.success("Quantity updated!"); */
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update quantity");
    }
  }, [removeFromCart, productId, dispatch, editCartQuantity, cartItem]);

  const increaseQuantity = () => handleUpdate(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      handleUpdate(quantity - 1);
    } else {
      handleUpdate(0);
    }
  };

  if (!cartItem) {
    return null;
  }

  return (
    <InputGroup>
      <Button variant="outline-secondary" onClick={decreaseQuantity} disabled={isLoading}> - </Button>
      <Form.Control
        style={{textAlign: "center"}}
        type="text"
        value={quantity}
        onChange={handleQuantityChange}
        onKeyDown={handleKeyDown}
        onBlur={() => handleUpdate(quantity)}
        min="0"
        disabled={isLoading}
      />
      <Button variant="outline-secondary" onClick={increaseQuantity} disabled={isLoading}> + </Button>
    </InputGroup>
  );
};

export default React.memo(QuantitySelector);

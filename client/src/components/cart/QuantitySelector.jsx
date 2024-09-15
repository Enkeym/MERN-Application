import {useState} from "react"
import {useEditCartQuantityMutation} from "../../app/services/cartApi"
import {toast} from "react-toastify"
import {Button, Form, InputGroup} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {updateCartQuantity} from "../../features/cartSlice"


const QuantitySelector = ({item}) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const [editCartQuantity, {isLoading}] = useEditCartQuantityMutation()
  const dispatch = useDispatch()

  const handleQuantityChange = async (e) => {
    const value = Math.max(1, Number(e.target.value))
    setQuantity(value)
  }

  const handleUpdate = async (newQuantity) => {
    try {
      await editCartQuantity({productId: item.productId, quantity: newQuantity}).unwrap()
      setQuantity(newQuantity)
      dispatch(updateCartQuantity({productId: item.productId, quantity: newQuantity}))
      toast.success('Quantity updated!')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update quantity')
    }
  }

  const increaseQuantity = () => handleUpdate(quantity + 1);
  const decreaseQuantity = () => handleUpdate(quantity > 1 ? quantity - 1 : 1);

  return (
    <InputGroup>
      <Button variant="outline-secondary" onClick={decreaseQuantity} disabled={isLoading || quantity <= 1}> - </Button>
      <Form.Control style={{
        textAlign: 'center',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
      }} type="number" value={quantity} onChange={handleQuantityChange} onBlur={() => handleUpdate(quantity)} min="1" disabled={isLoading} />
      <Button variant="outline-secondary" onClick={increaseQuantity} disabled={isLoading}> + </Button>
    </InputGroup>
  )
}

export default QuantitySelector
import { useState } from 'react';

const items = [
  {
    id: 1,
    productName: 'Fall Limited Edition Sneakers',
    productDescription:
      'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    price: 250,
    mainPhoto: 'images/image-product-1.jpg',
    photoThumbnail1: 'images/image-product-1-thumbnail.jpg',
    photoThumbnail2: 'images/image-product-2-thumbnail.jpg',
    photoThumbnail3: 'images/image-product-3-thumbnail.jpg',
    photoThumbnail4: 'images/image-product-4-thumbnail.jpg',
    quantity: 1,
  },
  {
    id: 2,
    productName: 'Summer Edition Kicks',
    productDescription:
      'Wear these to look fly in the summer and stand out in a classy fashion. The white are universally matched with any outfit and color. The soles are easily maintained.',
    price: 499,
    mainPhoto: 'images/image-product-1.jpg',
    photoThumbnail1: 'images/image-product-1-thumbnail.jpg',
    photoThumbnail2: 'images/image-product-2-thumbnail.jpg',
    photoThumbnail3: 'images/image-product-3-thumbnail.jpg',
    photoThumbnail4: 'images/image-product-4-thumbnail.jpg',
    quantity: 1,
  },
];
export default function Test() {
  const [cart, setCart] = useState([]);
  console.log(cart);

  function handleAddToCart(item) {
    setCart([...cart, item]);
  }
  return (
    <div>
      {items.map(item => (
        <Products itemObj={item} onAddToCart={handleAddToCart} key={item.id} />
      ))}
    </div>
  );
}

function Products({ itemObj, onAddToCart }) {
  return (
    <div>
      <img
        src="../images/image-product-1-thumbnail.jpg"
        alt={itemObj.productName}
      />
      <p>{itemObj.productName}</p>
      <p>{itemObj.productDescription}</p>
      <button onClick={() => onAddToCart(itemObj)}>Add to cart</button>
    </div>
  );
}

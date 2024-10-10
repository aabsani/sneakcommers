import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

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
  // {
  //   id: 2,
  //   productName: 'Summer Edition Kicks',
  //   productDescription:
  //     'Wear these to look fly in the summer and stand out in a classy fashion. The white are universally matched with any outfit and color. The soles are easily maintained.',
  //   price: 499,
  //   mainPhoto: 'images/image-product-1.jpg',
  //   photoThumbnail1: 'images/image-product-1-thumbnail.jpg',
  //   photoThumbnail2: 'images/image-product-2-thumbnail.jpg',
  //   photoThumbnail3: 'images/image-product-3-thumbnail.jpg',
  //   photoThumbnail4: 'images/image-product-4-thumbnail.jpg',
  //   quantity: 1,
  // },
];

export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleIncreaseQuantity() {
    setQuantity(quantity + 1);
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  function handleAddToCart(item) {
    // setCartItem([...cartItem, item]);
    setIsCartOpen(true);
    setCartItem(items => [...items, item]);
  }

  function handleDeleteCartItem(id) {
    setCartItem(items => items.filter(item => item.id !== id));
    // close cart popover if cart is empty
    if (cartItem.length === 1) {
      setIsCartOpen(false);
    }
  }

  return (
    <div>
      <div>
        <NavBar
          cartItem={cartItem}
          onDeleteCartItem={handleDeleteCartItem}
          quantity={quantity}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />
      </div>
      <div className="app">
        <ProductDisplay
          items={items}
          quantity={quantity}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );

  function NavBar({
    cartItem,
    onDeleteCartItem,
    quantity,
    setIsCartOpen,
    isCartOpen,
  }) {
    const header = ['Collections', 'Men', 'Women', 'About', 'Contact'];
    return (
      <>
        <Flex
          as="nav"
          marginLeft="2em"
          padding="3.5em"
          gap="50px"
          alignItems="center"
          color="gray.500"
        >
          <div>
            <img src="images/logo.svg" alt="company-logo" />
          </div>

          <ul className="navheader">
            <Flex gap={20}>
              {header.map((items, i) => (
                <li className="nav_items" key={'items' + i}>
                  {items}
                </li>
              ))}
            </Flex>
          </ul>

          <Spacer />
          <Cart
            cartItem={cartItem}
            onDeleteCartItem={onDeleteCartItem}
            quantity={quantity}
            setIsCartOpen={setIsCartOpen}
            isCartOpen={isCartOpen}
          />
        </Flex>
        <hr></hr>
      </>
    );
  }

  function ProductDisplay({
    items,
    quantity,
    onDecreaseQuantity,
    onIncreaseQuantity,
    onAddToCart,
  }) {
    const btn = {
      bg: 'orange.400',
      color: '#ffff',
      marginLeft: '15px',
      p: '20px',
      _hover: {
        bg: 'orange.300',
      },
    };
    return (
      <div>
        {items?.map(item => (
          <div className="product" key={item.id}>
            <Box>
              <Box marginLeft="2.5em">
                <img
                  className="main"
                  src={item.mainPhoto}
                  alt={item.productName}
                />
              </Box>
              <Box>
                <Flex p="2em" gap="10px">
                  {Array.from({ length: 4 }, (_, index) => (
                    <img
                      className="thumbnail"
                      src={item[`photoThumbnail${index + 1}`]}
                      alt={item.productName}
                      key={index}
                    />
                  ))}
                </Flex>
              </Box>
            </Box>
            <Box p="30px">
              <h3>Sneaker Company</h3>
              <Heading w="70%">{item.productName}</Heading>
              <Text marginTop="20px" w="70%">
                {item.productDescription}
              </Text>
              <p className="price">
                ${quantity > 0 ? item.price * quantity : item.price}
              </p>
              <AddProduct
                items={items}
                onDecreaseQuantity={onDecreaseQuantity}
                quantity={quantity}
                onIncreaseQuantity={onIncreaseQuantity}
                onAddToCart={onAddToCart}
              />
              <Button sx={btn} onClick={() => onAddToCart(item)}>
                <img src="images/icon-cart.svg" alt="shopping_cart" />{' '}
                <Text p={4} marginLeft={5}>
                  Add to cart
                </Text>
              </Button>
            </Box>
          </div>
        ))}
      </div>
    );
  }

  function AddProduct({
    quantity,
    onIncreaseQuantity,
    onDecreaseQuantity,
    // onAddToCart,
  }) {
    // const btn = {
    //   bg: 'orange.400',
    //   color: '#ffff',
    //   marginLeft: '15px',
    //   p: '20px',
    //   _hover: {
    //     bg: 'orange.300',
    //   },
    // };

    return (
      <Box>
        <Flex marginTop={10}>
          <Button onClick={onDecreaseQuantity}>
            <MinusIcon />
          </Button>
          <p className="quantity">{quantity}</p>
          <Button onClick={onIncreaseQuantity}>
            <AddIcon />
          </Button>
          {/* <Button sx={btn} onClick={() => onAddToCart(item)}>
            <img src="images/icon-cart.svg" alt="shopping_cart" />{' '}
            <Text p={4} marginLeft={5}>
              Add to cart
            </Text>
          </Button> */}
        </Flex>
      </Box>
    );
  }
}

function Cart({
  cartItem,
  onDeleteCartItem,
  quantity,
  setIsCartOpen,
  isCartOpen,
}) {
  const btn = {
    bg: 'orange.400',
    color: '#ffff',
    _hover: {
      bg: 'orange.300',
    },
  };

  const handlePopoverClose = () => {
    setIsCartOpen(false);
  };

  return (
    <Box>
      <Popover
        isOpen={isCartOpen}
        onOpen={() => setIsCartOpen(true)}
        onClose={handlePopoverClose}
      >
        {isCartOpen && <div className="quantity_icon">{cartItem.length}</div>}

        <PopoverTrigger>
          <img src="images/icon-cart.svg" alt="shopping_cart" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <strong>Cart</strong>
          </PopoverHeader>
          {cartItem.length === 0 ? (
            <PopoverBody>
              <p>Cart is empty</p>
            </PopoverBody>
          ) : (
            <>
              <PopoverBody>
                {cartItem.map(item => (
                  <Flex p={1} key={item.id}>
                    <img
                      className="cartImg"
                      src={item.photoThumbnail1}
                      alt={item.productName}
                    />

                    <Box w={60} marginLeft={1}>
                      <p>{item.productName}</p>
                      <span>
                        ${item.price} x {quantity}
                      </span>
                      <span style={{ marginLeft: '7px' }}>
                        <strong>${quantity * item.price}</strong>
                      </span>
                    </Box>
                    <Button onClick={() => onDeleteCartItem(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </Flex>
                ))}
              </PopoverBody>
              <Button sx={btn} mx={7} my={5}>
                Checkout
              </Button>
            </>
          )}
        </PopoverContent>
      </Popover>
    </Box>
  );
}

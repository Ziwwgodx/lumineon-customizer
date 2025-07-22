import { useState, useEffect } from 'react';
import { CartItem, NeonConfig } from '../types';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('neon-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('neon-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (config: NeonConfig, price: number) => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      config,
      price,
      quantity: 1
    };
    setItems(prev => [...prev, newItem]);
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  };
};
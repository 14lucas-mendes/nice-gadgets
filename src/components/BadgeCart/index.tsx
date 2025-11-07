'use client';

import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCartFavorite } from '@/context/CartFavoriteContext';

export default function BadgeCart() {
  const { cartCount } = useCartFavorite();

  return (
    <Badge badgeContent={cartCount} color="primary">
      <ShoppingCartOutlinedIcon color="action" />
    </Badge>
  );
}

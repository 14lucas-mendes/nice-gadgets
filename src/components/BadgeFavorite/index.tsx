'use client';

import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCartFavorite } from '@/context/CartFavoriteContext';

export default function BadgeFavorite() {
  const { favoriteCount } = useCartFavorite();

  return (
    <Badge badgeContent={favoriteCount} color="primary">
      <FavoriteBorderIcon color="action" />
    </Badge>
  );
}
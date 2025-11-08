'use client';

import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCartFavorite } from '@/context/CartFavoriteContext';

export default function BadgeFavorite() {
  const { favoriteCount } = useCartFavorite();

  return (
    <Badge badgeContent={favoriteCount} color="primary">
      {favoriteCount > 0 ? (
        <FavoriteIcon className="text-red-500" />
      ) : (
        <FavoriteBorderIcon color="action" />
      )}
    </Badge>
  );
}
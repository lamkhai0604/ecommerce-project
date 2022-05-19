import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';

interface IStarRatingProps {
  starRating?: number;
}

const StarRating = (props: IStarRatingProps) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    props.starRating && setValue(props.starRating);
  }, [props.starRating]);

  return <Rating name="read-only" value={value} readOnly />
};

export default StarRating;

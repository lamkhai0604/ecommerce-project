import { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface IStarRatingProps {
  starRating?: number;
}

const StarRating = (props: IStarRatingProps) => {
  const [star, setStar] = useState<number>(0);

  useEffect(() => {
    props.starRating && setStar(props.starRating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let star3Rating = (
    <div>
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
      <AiOutlineStar />
      <AiOutlineStar />
    </div>
  );
  let star4Rating = (
    <div>
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
      <AiOutlineStar />
    </div>
  );
  let star5Rating = (
    <div>
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
      <AiFillStar className="checked" />
    </div>
  );
  return <>{star === 3 ? star3Rating : star === 4 ? star4Rating : star5Rating}</>;
};

export default StarRating;

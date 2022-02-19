import ProductCard from 'view/components/ProductCard';
import './style.css';

const Recommend = () => {
  return (
    <div className="recommend">
      <div className="recommend-container">
        <div className="recommend-content">
          <div className="recommend-content_border">
            <p>Recommended For You</p>
          </div>
          <span>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </span>
        </div>
        <div className="recommend-product">
          <ProductCard grey />
        </div>
      </div>
    </div>
  );
};

export default Recommend;

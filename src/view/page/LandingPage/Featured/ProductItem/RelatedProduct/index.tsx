import { ICategory } from 'models/types/categories';
import SwiperCard from 'view/components/base/SwiperCard';
import './style.css';

interface IRelatedProductProps {
  categoryItem?: ICategory;
}

const RelatedProduct = (props: IRelatedProductProps) => {
  const { categoryItem = {} } = props;
  if (!categoryItem) return null;
  return (
    <div className="related">
      <div className="related-content">
        <h3>Related Products</h3>
        <p>Add related products to weekly line up</p>
      </div>
      <div className="related-products mb-5">
        <SwiperCard data={categoryItem.productGroup} slidesPerView={4} spaceBetween={40} />
      </div>
    </div>
  );
};

export default RelatedProduct;

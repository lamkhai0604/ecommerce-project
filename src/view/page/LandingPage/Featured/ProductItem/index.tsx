import ProductImg from "view/components/ProductImg";
import './style.css';

const ProductItem = () => {
    return (
        <div className="productItem">
            <div className="productItem-information">
                <div><ProductImg /></div>
                <div>
                    <h3>Water and Wind Resistant Insulated</h3>
                    <span>StarRating</span>
                    <span>$100.00</span>
                    <div />
                    <div>
                        <p>Brand: <span>company</span></p>
                        <p>Product Code: <span>company</span></p>
                        <p>Availability: <span>company</span></p>
                        <p>Price in reward point: <span>company</span></p>
                    </div>
                </div>
            </div>
            <div className="productItem-description">description</div>
            <div className="productItem-related">Related product</div>
            <div className="productItem-subcribe">subscribe</div>
        </div>
    )
}

export default ProductItem;
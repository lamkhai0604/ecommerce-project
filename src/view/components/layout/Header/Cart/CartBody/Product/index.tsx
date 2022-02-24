import './style.css'

interface IProductProps {
    imgUrl?: string;
    name?: string;
    amount?: number;
    price?: number;
}

const Product = (props: IProductProps) => {
    return (
        <div className="product">
            <img src={props.imgUrl} alt="Product" width="90px" height="120px"/>
            <div className="product-content">
                <p>{props.name}</p>
                <div className="product-content_sum">
                    <span>{props.amount}</span>
                    <span className="mx-2">x</span>
                    <span style={{fontWeight: 'bold', color: '#ff0055'}}>${props.price}</span>
                </div>
            </div>
        </div>
    )
}

export default Product;
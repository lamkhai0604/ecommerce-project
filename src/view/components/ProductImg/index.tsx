import './style.css'

interface IProductImgProps {
    imgUrl?: string;
    name?: string;
}

const ProductImg = (props: IProductImgProps) => {
    return <div className="productImg"><img src={props.imgUrl} alt={props.name} /></div>
}

export default ProductImg;
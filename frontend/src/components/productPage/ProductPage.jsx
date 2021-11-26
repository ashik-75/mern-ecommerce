import { useParams } from 'react-router-dom';
import './productPage.scss';
// import dt from "@sani"

const ProductPage = ({ url }) => {
  const { category } = useParams();

  console.log(category);
  return (
    <div className={category ? 'productPage separate' : 'productPage'}>
      {[...Array(13).keys()].map((dt) => (
        <div className="product" key={dt}>
          <img
            src={
              url ||
              'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHZlZ2V0YWJsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            }
            alt=""
          />
          <div className="product-content">
            <div className="product-title">tasty salad with protein mixed</div>
            <div className="product-price">
              <span>₹100</span>
              <span>18% OFF</span>
            </div>
            <div className="product-main-price">₹120</div>
            <button>buy now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;

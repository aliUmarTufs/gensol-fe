import React from 'react';
import { FULL_ROW } from '../../../constants';
import CommonHeading from '../../common/CommonHeading';
import CommonTextField from '../../common/TextField';
import { Colors, Images } from '../../../theme';
import { Col } from 'antd';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../redux/slicers/user';
import './styles.scss';

const CartProductCard = ({ details, index, colored }) => {
  const dispatch = useDispatch();
  const removeFromCartHandler = () => {
    dispatch(removeFromCart(index));
  };
  return (
    <Col {...FULL_ROW}>
      <div className={`cartItem ${colored ? 'colored' : ''}`}>
        <div className="cartItemInner">
          <img src={details.src} width={100} className="cartitemImage" />
          <div className="cartItemContent">
            <CommonHeading
              text={details.title}
              fontSize={'x-large'}
              lineHeight={1}
              className={"cart-card-text"}
            />
            <CommonTextField
              text={details.description}
              fontSize={'smaller'}
              lineHeight={1.5}
            />
            <CommonHeading
              paddingTop={'20px'}
              text={`$${details.price}`}
              fontSize={'x-large'}
              lineHeight={1}
              color={Colors.theme}
              className={"cart-card-price"}
            />
          </div>
        </div>
        <img
          src={Images.CrossIconCart}
          onClick={removeFromCartHandler}
          className="crossIcons"
        />
      </div>
    </Col>
  );
};

export default CartProductCard;

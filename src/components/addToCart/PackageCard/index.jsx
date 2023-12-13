import { Col, Row } from 'antd';
import React from 'react';
import {
  FULL_ROW,
  TWO_HALF_THIRD_ROW,
  TWO_THIRD_ROW
} from '../../../constants';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../redux/slicers/user';
import CommonTextField from '../../common/TextField';
import { Colors, Images } from '../../../theme';
import './styles.scss';

const PackageCard = ({ details, index, colored }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(index));
  };
  return (
    <Col {...FULL_ROW}>
      <div
        className={`subscriptionItem bottomBorder ${colored ? 'colored' : ''}`}
      >
        <CommonTextField
          className={'paraTextItem'}
          color={Colors.theme}
          text={details.title}
        />
        <Row>
          <Col {...TWO_THIRD_ROW}>
            <CommonTextField fontSize={'large'} text={details.packageName} className={"cart-card-text"} />
          </Col>
          <Col {...TWO_HALF_THIRD_ROW}>
            <div className="priceWrapper">
              <CommonTextField
                color={Colors.theme}
                text={`$${details.price}`}
                className={"priceTitle"}
              />
              <CommonTextField
                paddingLeft={'5px'}
                fontSize={'x-small'}
                text={`Yearly`}
              />
            </div>
          </Col>
        </Row>
        <img
          src={Images.CrossIconCart}
          onClick={removeFromCartHandler}
          className="crossIcons"
        />
      </div>
    </Col>
  );
};

export default PackageCard;

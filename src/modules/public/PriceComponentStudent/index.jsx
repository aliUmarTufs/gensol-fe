import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import { Form } from 'antd';
import { useSelector } from 'react-redux';

const PriceStudent = ({ handleSubmitForm = () => {} }) => {
  // const [intent, setintent] = useState({ intent: 'course' });

  const { cartData } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setintent({ intent: e.target.value });
  };

  const handleNext = () => {
    handleSubmitForm();
  };

  return (
    <BlackBox>
      <HeadingComponent title={'Price'} />

      <div className="cart-items-cont">
        {cartData?.length > 0 &&
          cartData?.map((item, index) => {
            return (
              <div key={index} className="cart-item-wrap">
                <div className="price-wrapper">
                  <img
                    src={item.type === 'course' ? item?.src : Images.Package}
                  />
                  <div className="price-content-wrap">
                    <p>
                      {item.type === 'course'
                        ? item.title
                        : `${item.packageName} (${item.title})`}
                    </p>
                    <h4>{`$${item?.price}`}</h4>
                  </div>
                </div>
                <p>{item?.type === 'course' ? item?.description : ''}</p>
              </div>
            );
          })}
      </div>
      <div className="black-box-btn-wrapper">
        <CommonButton text="Next" width={'172px'} onClick={handleNext} />
      </div>
    </BlackBox>
  );
};

export default PriceStudent;

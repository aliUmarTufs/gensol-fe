import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import { Form } from 'antd';

const PaymentMethodStudent = ({ handleSubmitForm = () => {} }) => {
  const handleNext = () => {
    handleSubmitForm(null, 5);
  };

  return (
    <BlackBox>
      <HeadingComponent title={'Payment Method'} />

      <div className="payment-method-main-wrapper">
        <div className="satisfy-course-content-wrap">
          <p>Shipping Cost</p>

          <div className="satisfy-course-content-radio-wrap">
            <div>
              <input
                type="radio"
                id="send-email"
                name="I-am-an"
                value="send-email"
              />
              <span class="checkmark"></span>
              <label for="send-email">Embed send via email</label>
            </div>
          </div>
        </div>

        <div className="total-subtotal-wrapper">
          <div className="total-subtotal-wrap">
            <p>Subtotal</p>
            <p>$30.00</p>
          </div>
          <div className="total-subtotal-wrap">
            <p>Total</p>
            <p>$30.00</p>
          </div>
        </div>

        <div className="card-detail-wrapper">
          <p>Credit Card Details</p>
          <div className="card-detail-wrap">
            <input type="text" placeholder="Name on card" />
            <input type="text" placeholder="Card Name" />
            <input type="text" placeholder="Card number" />
            <input type="text" placeholder="Expiry" className="expiry" />
            <input type="text" placeholder="CVV" className="cvv" />
          </div>
        </div>
      </div>

      <div className="black-box-btn-wrapper">
        <CommonButton text="Confirm" width={'172px'} onClick={handleNext} />
      </div>
    </BlackBox>
  );
};

export default PaymentMethodStudent;

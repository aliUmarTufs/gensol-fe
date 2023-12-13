import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userCheckoutSendMailRequest } from '../../../redux/slicers/user';
import { toastAlert } from '../../../services/utils';
import { useNavigate } from 'react-router-dom';
import { ALERT_TYPES, HOME_ROUTE } from '../../../constants';

const PaymentSelectionAlertEducation = ({ data }) => {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.user);

  const handleNext = () => {
    setLoading(true);

    const payload = {
      name: data?.studentName,
      email: data?.studentEmail,
      cartItems: cartData,
      studentID: data?.studentId
    };

    dispatch(
      userCheckoutSendMailRequest({
        payloadData: payload,
        responseCallback: (res) => {
          setLoading(false);
          if (res.status) {
            navigate(HOME_ROUTE);
            toastAlert('Mail sent successfully');
            return;
          }
          toastAlert(res?.message, ALERT_TYPES.error);
        }
      })
    );
  };

  return (
    <div className="alertWrapper">
      <BlackBox classes="blackWrapper">
        <HeadingComponent title={'Payment Selection Alert'} />

        <div className="price-main-wrapper">
          <p>
            This is to inform you that a student has selected the "Student"
            payment option for course fees. Please ensure to communicate with
            the student regarding the payment process.
          </p>
        </div>
        <Row justify={'center'} style={{ width: '100%' }}>
          <Col span={24} lg={{ span: 8 }}>
            <CommonButton
              text="Done"
              width={'100%'}
              onClick={handleNext}
              topClass={'buttonWrapper'}
              loading={isLoading}
            />
          </Col>
        </Row>

        <div className="black-box-btn-wrapper"></div>
      </BlackBox>
    </div>
  );
};

export default PaymentSelectionAlertEducation;

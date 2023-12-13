import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { Form, Space } from 'antd';
import CommonButton from '../../common/CommonButton';
import { AppStyles } from '../../../theme';
import { css } from 'aphrodite';
import './styles.scss';
import { role, sum, toastAlert } from '../../../services/utils';
import { ALERT_TYPES, HOME_ROUTE } from '../../../constants';
import { useState } from 'react';
import CommonHeading from '../../common/CommonHeading';
import { useDispatch, useSelector } from 'react-redux';
import { userCheckoutRequest } from '../../../redux/slicers/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from 'antd/es/locale';

const CheckoutForm = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const { cartData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    setLoading(true);
    const cart = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cart);

    if (error) {
      toastAlert(error.message, ALERT_TYPES.error);
      setLoading(false);
    } else {
      const items = cartData?.map((t) => ({ [t['type']]: t.id }));
      const data = { ...formData, type: role(location.pathname) };

      let payloadData = {
        data: {
          token: token.id,
          amount: sum(cartData),
          moreDetails: data,
          orderItems: items
        }
      };

      dispatch(
        userCheckoutRequest({
          payloadData,
          responseCallback: (res) => {
            setLoading(false);
            if (res.status) {
              toastAlert(res?.data?.message, ALERT_TYPES.success);
              navigate(HOME_ROUTE);
            }
          }
        })
      );
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <CommonHeading
        text={'Payment Method'}
        textAlign={'center'}
        className={css(AppStyles.mBottom30)}
      />
      <CardElement options={{ hidePostalCode: true }} />
      <CommonButton
        htmlType="submit"
        text={'Submit'}
        topClass={css(AppStyles.mTop20)}
        loading={loading}
      />
    </Form>
  );
};

export default CheckoutForm;

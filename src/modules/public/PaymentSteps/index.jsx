import React, { useEffect, useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import SelectIntentStudent from '../SelectIntentStudent';
import PriceStudent from '../PriceComponentStudent';
import SelectIntentStudentOther from '../SelectIntentStudentOther';
import CheckoutStudent from '../CheckoutStudent';
import PaymentMethodStudent from '../PaymentMethodStudent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_ROUTE } from '../../../constants';
import {
  addToCart,
  userCheckoutGetMailRequest
} from '../../../redux/slicers/user';

const PaymentSteps = () => {
  // STATES
  const [formInfo, setFormInfo] = useState({});
  const [currentStep, setcurrentStep] = useState(1);

  // CONST VALS
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // HANDLERS
  const handleSubmitForm = (values) => {
    setFormInfo({ ...formInfo, ...values });

    if (currentStep == 3) {
      return;
    }
    setcurrentStep(currentStep + 1);
  };

  // HOOKS
  useEffect(() => {
    if (role === 'teacher') {
      navigate(HOME_ROUTE);
    }
  }, []);

  useEffect(() => {
    const ordernumber = searchParams.get('ordernumber');
    if (ordernumber) {
      dispatch(
        userCheckoutGetMailRequest({
          paramter: ordernumber,
          query: 'populate=*'
        })
      );
    }
  }, [searchParams]);

  return (
    <div className="main-wrapper">
      {currentStep === 1 ? (
        <SelectIntentStudent handleSubmitForm={handleSubmitForm} />
      ) : currentStep == 2 ? (
        <PriceStudent handleSubmitForm={handleSubmitForm} />
      ) : currentStep == 3 ? (
        <CheckoutStudent
          formData={formInfo}
          handleSubmitForm={handleSubmitForm}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PaymentSteps;

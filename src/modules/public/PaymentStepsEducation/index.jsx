import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import SelectIntentEducation from '../SelectIntentEducation';
import WhoWillPayEducation from '../WhoWillPayEducation';
import PaymentSelectionAlertEducation from '../PaymentSelectionAlertEducation';
import CheckoutEducation from '../CheckoutEducation';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../../constants';

const PaymentStepsEducation = () => {
  // STATES
  const [currentStep, setcurrentStep] = useState(1);
  const [formData, setformData] = useState({});

  // CONST VALS
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);

  const handleSubmitForm = (values, isInstitute) => {
    setformData({ ...formData, ...values });
    if (currentStep === 4) {
      return;
    }
    if (isInstitute) {
      setcurrentStep(currentStep + 2);
      return;
    }
    setcurrentStep(currentStep + 1);
  };

  useEffect(() => {
    if (role !== 'teacher') {
      navigate(HOME_ROUTE);
    }
  }, []);

  return (
    <div className="">
      {currentStep === 1 ? (
        <SelectIntentEducation handleSubmitForm={handleSubmitForm} />
      ) : currentStep == 2 ? (
        <WhoWillPayEducation handleSubmitForm={handleSubmitForm} />
      ) : currentStep == 3 ? (
        <PaymentSelectionAlertEducation
          handleSubmitForm={handleSubmitForm}
          data={formData}
        />
      ) : currentStep == 4 ? (
        <CheckoutEducation
          formData={formData}
          handleSubmitForm={handleSubmitForm}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PaymentStepsEducation;

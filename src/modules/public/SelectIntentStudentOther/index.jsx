import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import { Form } from 'antd';

const SelectIntentStudentOther = ({ handleSubmitForm = () => {} }) => {
  const [intent, setintent] = useState({ intent: 'course' });

  const handleChange = (e) => {
    setintent({ intent: e.target.value });
  };

  const handleNext = () => {
    handleSubmitForm(intent, 2);
  };

  return (
    <div className="main-wrapper">
      <BlackBox>
        <HeadingComponent title={'Select Intent'} />

        <div className="radio-input-wrapper">
          <div className="satisfy-course-wrapper">
            <div className="radio-wrapper">
              <input
                type="radio"
                id="satisfy-course"
                checked={intent.intent == 'course' ? true : false}
                onClick={handleChange}
                name="select-intent"
                value="course"
              />
              <span class="checkmark"></span>
              <label for="satisfy-course">
                To Satisfy Course Credit at an Institution
              </label>
            </div>
          </div>

          <div className="satisfy-course-other-wrapper">
            <div className="radio-wrapper">
              <input
                type="radio"
                id="other"
                name="select-intent"
                value="other"
                checked={intent.intent == 'other' ? true : false}
                onClick={handleChange}
              />
              <span class="checkmark"></span>
              <label for="other">Other</label>
            </div>

            <div className="satisfy-course-other-radio-wrap">
              <p className="referral-heading">Have a referral code?</p>
              <div>
                <input
                  type="radio"
                  id="yes"
                  name="intent_other_choice"
                  value="yes"
                />
                <span class="checkmark"></span>
                <label for="yes">Yes</label>
              </div>
              <div className="satisfy-course-content-radio-other-wrap">
                <input
                  type="radio"
                  id="no"
                  name="intent_other_choice"
                  value="no"
                />
                <span class="checkmark"></span>
                <label for="no">No</label>
                <input
                  type="text"
                  placeholder="Referral Code"
                  className="other-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="black-box-btn-wrapper">
          <CommonButton text="Next" width={'172px'} onClick={handleNext} />
        </div>
      </BlackBox>
    </div>
  );
};

export default SelectIntentStudentOther;

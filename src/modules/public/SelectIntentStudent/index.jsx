import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import CommonButton from '../../../components/common/CommonButton';
import { Form, Input, Radio, Space } from 'antd';
import CommonPhoneInput from '../../../components/common/CommonPhoneInput';
import { set } from 'lodash';

const INSTITUTIONS = [
  {
    value: 'school',
    name: 'School'
  },
  {
    value: 'university',
    name: 'University'
  },
  {
    value: 'college',
    name: 'College'
  },
  {
    value: 'other',
    name: 'Other'
  }
];
const REFERAL_CODE = [
  {
    value: 'yes',
    name: 'Yes'
  },
  {
    value: 'no',
    name: 'No'
  }
];
const SelectIntentStudent = ({ handleSubmitForm = () => {} }) => {
  const [selectedIntent, setIntent] = useState(1);
  const [selectedInstitution, setInstitution] = useState(INSTITUTIONS[0].value);
  const [selectedReferal, setReferal] = useState(REFERAL_CODE[0].value);

  const [form] = Form.useForm();

  const setIntentHandler = (e) => {
    setIntent(e.target.value);
  };
  const setInstitutionHandler = (e) => {
    setInstitution(e.target.value);
  };
  const setReferalHandler = (e) => {
    setReferal(e.target.value);
  };

  const handleNext = () => {
    form.validateFields().then((values) => {
      handleSubmitForm(values);
    });
  };

  return (
    <BlackBox>
      <HeadingComponent title={'Select Intent'} />

      <div className="select-intent-wrapper">
        <Form
          form={form}
          initialValues={{
            method: 1,
            institute: INSTITUTIONS[0]?.value,
            referral: REFERAL_CODE[0]?.value
          }}
        >
          <Form.Item name={'method'}>
            <Radio.Group onChange={setIntentHandler} value={selectedIntent}>
              <Space direction="vertical" size="middle">
                <Radio value={1}>
                  To Satisfy Course Credit at an Institution
                </Radio>
                {selectedIntent == 1 && (
                  <div className="cource-credit-box">
                    <h3>Institution Information</h3>
                    <p>Please provide information about your institution</p>
                    <p>I am an:</p>
                    <Form.Item name={'institute'}>
                      <Radio.Group
                        onChange={setInstitutionHandler}
                        value={selectedInstitution}
                      >
                        <Space direction="vertical">
                          {INSTITUTIONS.map((item) => (
                            <Radio value={item.value}>{item.name}</Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    {selectedInstitution == 'other' && (
                      <Form.Item
                        name="otherInstitution"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your institution!'
                          }
                        ]}
                      >
                        <Input
                          placeholder="Type here.."
                          className="conditioned-input mt-1"
                        />
                      </Form.Item>
                    )}
                    <div className="institution-info-fields">
                      <Form.Item
                        name="institutionName"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input your institution name'
                          },
                          {
                            max: 200,
                            message: 'Please input maximum 200 characters'
                          }
                        ]}
                      >
                        <Input
                          placeholder="Institution Name"
                          className="mt-1"
                        />
                      </Form.Item>
                      <Form.Item
                        name="instituteAddress"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input your address'
                          },
                          {
                            max: 500,
                            message: 'Please input maximum 500 characters'
                          }
                        ]}
                      >
                        <Input placeholder="Address" className=" mt-1" />
                      </Form.Item>
                      <Form.Item
                        name="instituteCountry"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input your country'
                          },
                          {
                            max: 100,
                            message: 'Please input maximum 100 characters'
                          }
                        ]}
                      >
                        <Input placeholder="Country" className=" mt-1" />
                      </Form.Item>
                      <Form.Item
                        name="instituteEmail"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input your email'
                          },
                          {
                            type: 'email',
                            message: 'Please input valid email'
                          },
                          {
                            max: 100,
                            message: 'Please input maximum 100 characters'
                          }
                        ]}
                      >
                        <Input placeholder="Contact Email" className="mt-1" />
                      </Form.Item>
                      <CommonPhoneInput
                        name="institutePhone"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
                <Radio value={2}>Other</Radio>
                {selectedIntent == 2 && (
                  <div className="cource-credit-box">
                    <p>Have a referral code?</p>
                    <Form.Item name="referral">
                      <Radio.Group
                        onChange={setReferalHandler}
                        value={selectedReferal}
                      >
                        <Space direction="vertical">
                          {REFERAL_CODE.map((item) => (
                            <Radio value={item.value}>{item.name}</Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    {selectedReferal == REFERAL_CODE[0].value && (
                      <Form.Item
                        name="referralCode"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your referral code!'
                          }
                        ]}
                      >
                        <Input
                          placeholder="Referral Code"
                          className="conditioned-input mt-1"
                        />
                      </Form.Item>
                    )}
                  </div>
                )}
              </Space>
            </Radio.Group>
          </Form.Item>
          <div className="black-box-btn-wrapper">
            <CommonButton
              text="Next"
              width={'172px'}
              classname="next-btn"
              onClick={handleNext}
            />
          </div>
        </Form>
      </div>
      {/* <div className="radio-input-wrapper">
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

          <div className="satisfy-course-content-wrapper">
            <div className="institution-wrapper">
              <p className="institution-heading">Institution Information</p>
              <p>Please provide information about your institution</p>
            </div>

            <div className="satisfy-course-content-wrap">
              <p>I am an:</p>

              <div className="satisfy-course-content-radio-wrap">
                <div>
                  <input
                    type="radio"
                    id="school"
                    name="school"
                    value={'School'}
                  />
                  <span class="checkmark"></span>
                  <label for="school">School</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="university"
                    name="I-am-an"
                    value="University"
                  />
                  <span class="checkmark"></span>
                  <label for="university">Other</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="college"
                    name="I-am-an"
                    value="College"
                  />
                  <span class="checkmark"></span>
                  <label for="college">College</label>
                </div>
                <div className="satisfy-course-content-radio-other-wrap">
                  <input
                    type="radio"
                    id="i-am-an-other"
                    name="I-am-an"
                    value="I-am-an-other"
                  />
                  <span class="checkmark"></span>
                  <label for="i-am-an-other">Other</label>
                  <input
                    type="text"
                    placeholder="Type here.."
                    className="other-input"
                  />
                </div>
              </div>
            </div>

            <div className="satisfy-course-detail-wrapper">
              <input type="text" placeholder="Institution Name" />
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Country" />
              <input type="text" placeholder="Contact Email" />
              <input type="text" placeholder="Institution" />
            </div>
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
        </div>
      </div>

      <div className="black-box-btn-wrapper">
        <CommonButton text="Next" width={'172px'} onClick={handleNext} />
      </div> */}
    </BlackBox>
  );
};

export default SelectIntentStudent;

import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';

const WhoWillPayEducation = ({ handleSubmitForm = () => {} }) => {
  const [form] = Form.useForm();
  const [intent, setintent] = useState({ intent: 'student' });

  const { cartData } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setintent({ intent: e.target.value });
  };

  const handleNext = () => {
    if (intent.intent == 'student') {
      form.validateFields().then((values) => {
        handleSubmitForm(values);
      });
      return;
    }
    handleSubmitForm(intent, true);
  };

  return (
    <div className="main-wrapper">
      <BlackBox>
        <HeadingComponent title={'Who Will Pay'} />

        <div className="radio-input-wrapper">
          <p>Who will Pays?</p>
          <div className="satisfy-course-other-wrapper">
            <div className="radio-wrapper">
              <input
                type="radio"
                id="student"
                name="select-intent"
                value="student"
                checked={intent.intent == 'student' ? true : false}
                onClick={handleChange}
              />
              <span class="checkmark"></span>
              <label for="student">Student</label>
            </div>

            {intent.intent == 'student' && (
              <div className="satisfy-course-other-radio-wrap">
                <Form
                  form={form}
                  className="satisfy-course-content-radio-other-wrap"
                >
                  <Form.Item
                    name="studentName"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Student Name'
                      }
                    ]}
                  >
                    <Input placeholder="Student Name" className="other-input" />
                  </Form.Item>
                  <Form.Item
                    name="studentId"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Student Id'
                      }
                    ]}
                  >
                    <Input placeholder="Student Id" className="other-input" />
                  </Form.Item>
                  <Form.Item
                    name="studentEmail"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Student Email'
                      },
                      {
                        type: 'email',
                        message: 'Please Enter Valid Email'
                      }
                    ]}
                  >
                    <Input
                      placeholder="Student Email Address"
                      className="other-input"
                    />
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
          <div className="satisfy-course-other-wrapper">
            <div className="radio-wrapper">
              <input
                type="radio"
                id="institution"
                name="select-intent"
                value="institution"
                checked={intent.intent == 'institution' ? true : false}
                onClick={handleChange}
              />
              <span class="checkmark"></span>
              <label for="institution">Institution</label>
            </div>

            {intent.intent == 'institution' && (
              <div className="satisfy-course-other-radio-wrap">
                <p className="institution-heading">Calculate Price</p>
                <br />
                {/* <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                </p>
                <br />
                <p>Price</p> */}

                <div className="cart-items-cont">
                  {cartData?.length > 0 &&
                    cartData?.map((item, index) => {
                      return (
                        <div key={index} className="cart-item-wrap">
                          <div className="price-wrapper">
                            <img
                              src={
                                item.type === 'course'
                                  ? item?.src
                                  : Images.Package
                              }
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
                          <p>
                            {item?.type === 'course' ? item?.description : ''}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="black-box-btn-wrapper">
          <CommonButton text="Next" width={'172px'} onClick={handleNext} />
        </div>
      </BlackBox>
    </div>
  );
};

export default WhoWillPayEducation;

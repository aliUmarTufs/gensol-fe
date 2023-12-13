import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import CommonButton from '../../../components/common/CommonButton';
import { Button, Col, Form, Input, Row } from 'antd';
import CommonPhoneInput from '../../../components/common/CommonPhoneInput';
import { useDispatch, useSelector } from 'react-redux';
import { sum } from '../../../services/utils';
import { removeFromCart } from '../../../redux/slicers/user';
import CommonModal from '../../../components/common/CommonModal';
import Payment from '../../../components/Payment';

const CheckoutStudent = ({ formData, handleSubmitForm = () => {} }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { cartData } = useSelector((state) => state.user);

  const removeItemHandler = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleNext = () => {
    form.validateFields().then((values) => {
      handleSubmitForm(values);
      setIsOpen(true);
    });
  };

  return (
    <div className="checkoutstudent">
      <BlackBox>
        <HeadingComponent title={'Checkout'} />
        <Form form={form}>
          <div className="payment-method-main-wrapper">
            <div className="price-main-wrapper">
              {cartData.map((item, index) => (
                <div className="price-wrapper" key={index}>
                  <img
                    src={item.type === 'course' ? item?.src : Images.Package}
                  />
                  <div className="price-content-wrap">
                    <div className="item-wrapper">
                      <p>
                        {item.type === 'course'
                          ? item.title
                          : `${item.packageName} (${item.title})`}
                      </p>
                      {cartData?.length > 1 && (
                        <img
                          src={Images.DeleteIcon}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            removeItemHandler(index);
                          }}
                        />
                      )}
                    </div>
                    <div className="sku-wrapper">
                      <Row style={{ width: '100%' }}>
                        <Col span={24}>
                          <div className="sku-price-wrapper">
                            <p>${item.price.toFixed(2)}</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="total-subtotal-wrapper">
              <div className="total-subtotal-wrap">
                <p>Subtotal</p>
                <p>${sum(cartData)}</p>
              </div>
              <div className="total-subtotal-wrap">
                <p>Total</p>
                <p>${sum(cartData)}</p>
              </div>
            </div>

            <div className="checkout-input-wrapper">
              <p>Address</p>
              <Row gutter={[16, 16]} className="card-detail-wrap">
                <Col xs={24}>
                  <Form.Item
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input your full name'
                      },
                      {
                        max: 100,
                        message: 'Please input no more than 100 characters'
                      }
                    ]}
                  >
                    <Input placeholder="Full Name" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="addressLine1"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input your address line 1'
                      },
                      {
                        max: 100,
                        message: 'Please input no more than 100 characters'
                      }
                    ]}
                  >
                    <Input placeholder="Address Line 1" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="addressLine2"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input your address line 2'
                      },
                      {
                        max: 100,
                        message: 'Please input no more than 100 characters'
                      }
                    ]}
                  >
                    <Input placeholder="Address Line 2" />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <CommonPhoneInput name="phoneNumber" />
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input your city'
                      },
                      {
                        max: 100,
                        message: 'Please input no more than 100 characters'
                      }
                    ]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="state"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input your state'
                      },
                      {
                        max: 100,
                        message: 'Please input no more than 100 characters'
                      }
                    ]}
                  >
                    <Input placeholder="State/Province/Region" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="postalcode"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input your postcode/zip code'
                      },
                      {
                        type: 'text',
                        message: 'Please input only number'
                      },
                      {
                        max: 5,
                        message: 'Please input no more than 5 characters'
                      }
                    ]}
                  >
                    <Input placeholder="Postcode/Zip" type="text" />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="country"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input your country'
                      },
                      {
                        max: 100,
                        message: 'Please input no more than 100 characters'
                      }
                    ]}
                  >
                    <Input placeholder="Country" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="satisfy-course-content-check-wrap">
              <div>
                <input
                  type="checkbox"
                  id="send-email"
                  name="I-am-an"
                  value="send-email"
                />
                {/* <span class="checkmark"></span> */}
                <label for="send-email">
                  Save this address for faster checkout
                </label>
              </div>
            </div>
          </div>

          <div className="black-box-btn-wrapper">
            <CommonButton text="Pay now" width={'172px'} onClick={handleNext} />
          </div>
        </Form>
      </BlackBox>
      <CommonModal isModalVisible={isOpen} setIsModalVisible={setIsOpen}>
        <Payment formData={formData} />
      </CommonModal>
    </div>
  );
};

export default CheckoutStudent;

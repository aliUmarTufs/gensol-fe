import React, { useState } from 'react';
import { AppStyles, Colors } from '../../../theme';
import { Col, Form, Input, Row, Space } from 'antd';
import { css } from 'aphrodite';
import { ALERT_TYPES, EMAIL_RULE, validatorField } from '../../../constants';
import CommonButton from '../../../components/common/CommonButton';
import CommonTextField from '../../../components/common/TextField';
import CommonSelect from '../../../components/common/CommonSelect';
import CommonInputField from '../../../components/common/CommonInput';
import CommonModal from '../../../components/common/CommonModal';
import CommonDivider from '../../../components/common/CommonDivider';
import CommonPhoneInput from '../../../components/common/CommonPhoneInput';
import { useDispatch } from 'react-redux';
import { getaQuoteForm } from '../../../redux/slicers/general';
import { toastAlert } from '../../../services/utils';

const ProductLineModal = ({
  calculator,
  students,
  productLine,
  isFavorite,
  setIsFavourite,
  form1,
  setCalculator
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const handleFinish = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      const payloadData = {
        ...values,
        productLine,
        numOfStudents: students,
        price: calculator?.price.toFixed(2),
        interval: calculator?.duration
      };
      dispatch(
        getaQuoteForm({
          payloadData,
          responseCallback: (res) => {
            setLoading(false);
            if (res.status) {
              form.resetFields();
              form1.resetFields();
              setCalculator({ price: 0, duration: 'Monthly' });
              toastAlert('Email send successfully');
              setIsFavourite(false);
            }
            toastAlert(res?.message, ALERT_TYPES.error);
          }
        })
      );
    });
  };

  return (
    <CommonModal isModalVisible={isFavorite} setIsModalVisible={setIsFavourite}>
      <Form form={form}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <CommonTextField text={'Custom Package'} />
          <Space>
            <CommonTextField
              lineHeight={2}
              color={Colors.theme}
              fontWeight={'bold'}
              fontSize={'large'}
              text={`$${calculator?.price.toFixed(2)}`}
            />
            <CommonTextField
              paddingLeft={'5px'}
              paddingTop={'5px'}
              text={calculator?.duration}
            />
          </Space>
          <CommonDivider />
          <Row gutter={[20, 0]}>
            <Col lg={{ span: 12 }} span={24}>
              <CommonInputField
                name="name"
                placeholder={'Name'}
                rules={[
                  {
                    validator: (_, value) => {
                      return validatorField(_, value, 3, 80);
                    }
                  }
                ]}
              />
            </Col>
            <Col lg={{ span: 12 }} span={24}>
              <CommonPhoneInput name={'phone'} />
            </Col>
          </Row>
          <CommonInputField
            name="email"
            type={'email'}
            placeholder={'Email'}
            rules={EMAIL_RULE}
          />
          <CommonSelect
            rules={[
              {
                required: true,
                message: 'Please select your package!'
              }
            ]}
            placeholder="Package"
            name="packageName"
            options={[
              { value: 'Gold', label: 'Gold' },
              { value: 'Silver', label: 'Silver' },
              { value: 'Bronze', label: 'Bronze' }
            ]}
          />
          <div className="btn-wrapper">
            <CommonButton
              loading={isLoading}
              text={'submit'}
              width={'180px'}
              onClick={handleFinish}
            />
          </div>
        </Space>
      </Form>
    </CommonModal>
  );
};

export default ProductLineModal;

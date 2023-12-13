import React, { useState } from 'react';
import CommonTextField from '../../../components/common/TextField';
import { css } from 'aphrodite';
import { AppStyles, Images } from '../../../theme';
import CommonButton from '../../../components/common/CommonButton';
import CommonPasswordInput from '../../../components/common/CommonPassword';
import { Form, Space } from 'antd';
import CommonHeading from '../../../components/common/CommonHeading';
import CommonInputField from '../../../components/common/CommonInput';
import {
  ALERT_TYPES,
  EMAIL_RULE,
  EMAIL_VERIFICATION_ROUTE,
  handlePassworMatch,
  passwordValidation,
  validatorField
} from '../../../constants';
import CommonPhoneInput from '../../../components//common/CommonPhoneInput';
import CommonSelect from '../../../components/common/CommonSelect';
import { useNavigate } from 'react-router-dom';
import { ForgotRequest, forgotRequest } from '../../../redux/slicers/user';
import { useDispatch } from 'react-redux';
import { toastAlert } from '../../../services/utils';

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    setLoading(true);
    const { email } = values;

    const payloadData = {
      email: email
    };

    dispatch(
      forgotRequest({
        payloadData,
        responseCallback: (res) => {
          setLoading(false);
          if (res.status) {
            toastAlert('Email send successfully', ALERT_TYPES.success);
          }
        }
      })
    );
  };

  const [form] = Form.useForm();
  const { getFieldValue } = form;
  const navigate = useNavigate();

  return (
    <>
      <Form form={form} onFinish={onFinish} >
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.logo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Forgot your password'}
          />
          <CommonTextField
            width="65%"
            margin="0 auto"
            textAlign={'center'}
            text={
              'Enter your registered email below to receive password reset instruction'
            }
            opacity={'0.5'}
          />
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Email Address'} />
            <CommonInputField
              name="email"
              type={'email'}
              className={'auth'}
              placeholder={'john.smith@domain.com'}
              rules={EMAIL_RULE}
            />
          </Space>

          <CommonButton
            htmlType="submit"
            loading={loading}
            text={'Send'}
            classname={css(AppStyles.mTop20, AppStyles.mBottom10)}
          />
        </Space>
      </Form>
    </>
  );
};

export default Forgot;

import React, { useState } from 'react';
import CommonTextField from '../../../components/common/TextField';
import { css } from 'aphrodite';
import { AppStyles, Images } from '../../../theme';
import CommonButton from '../../../components/common/CommonButton';
import CommonPasswordInput from '../../../components/common/CommonPassword';
import { Checkbox, Form, Space } from 'antd';
import CommonHeading from '../../../components/common/CommonHeading';
import CommonInputField from '../../../components/common/CommonInput';
import {
  ALERT_TYPES,
  DASHBOARD_ROUTE,
  EMAIL_RULE,
  FORGOT_ROUTE,
  HOME_ROUTE,
  handlePassworMatch,
  passwordValidation,
  validatorField
} from '../../../constants';
import CommonPhoneInput from '../../../components//common/CommonPhoneInput';
import CommonSelect from '../../../components/common/CommonSelect';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginRequest } from '../../../redux/slicers/user';
import { toastAlert } from '../../../services/utils';

const Login = () => {
  // STATES
  const [loading, setLoading] = useState(false);

  // CONST VALS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // HANDLERS
  const onFinish = (values) => {
    setLoading(true);
    const { password, email } = values;

    const payloadData = {
      identifier: email,
      password: password
    };

    dispatch(
      userLoginRequest({
        payloadData,
        responseCallback: (res) => {
          setLoading(false);
          if (res.status) {
            toastAlert('Login successfully');
          }
        }
      })
    );
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.logo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Let’s login to your account first'}
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

          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Password'} />
            <CommonPasswordInput
              name={'password'}
              placeholder={'**************'}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
            />
          </Space>
          <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
            <Space>
              <Form.Item
                name="remember"
                valuePropName="checked"
                className={css(AppStyles.mBottom0)}
              >
                <Checkbox />
              </Form.Item>
              <CommonTextField text="Remember me" />
            </Space>
            <Space>
              <CommonTextField
                onClick={() => navigate(FORGOT_ROUTE)}
                text={'Forgot Password'}
              />
            </Space>
          </Space>

          <CommonButton
            htmlType="submit"
            loading={loading}
            text={'Login in'}
            classname={css(AppStyles.mTop20, AppStyles.mBottom10)}
          />
          <Space className={css(AppStyles.justifyCenter, AppStyles.w100)}>
            <CommonTextField text={'Don’t have an account?'} />
            <CommonTextField
              className={'theme-text'}
              onClick={() => navigate('/sign-up')}
              text={'Sign up'}
            />
          </Space>
        </Space>
      </Form>
    </>
  );
};

export default Login;

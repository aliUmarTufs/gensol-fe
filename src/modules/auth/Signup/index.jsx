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
  HOME_ROUTE,
  handlePassworMatch,
  lOGIN_ROUTE,
  passwordValidation,
  validatorField
} from '../../../constants';
import CommonPhoneInput from '../../../components//common/CommonPhoneInput';
import CommonSelect from '../../../components/common/CommonSelect';
import { useNavigate } from 'react-router-dom';
import {
  updateRoleRequest,
  userSignupRequest
} from '../../../redux/slicers/user';
import { useDispatch } from 'react-redux';
import { toastAlert } from '../../../services/utils';

const ROLE_IDS = [
  {
    label: 'Teacher',
    value: 1
  },
  {
    label: 'Student',
    value: 3
  }
];

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    setLoading(true);
    const { fullName, phoneNumber, password, email, role } = values;

    const payloadData = {
      username: fullName,
      email: email,
      password: password,
      phoneNumber: '+' + phoneNumber,
      fullName: fullName,
      role: role
    };

    dispatch(
      userSignupRequest({
        payloadData,
        responseCallback: (res) => {
          dispatch(
            updateRoleRequest({
              payloadData: {
                role: role,
                userID: res?.data?.user?.id
              },
              headers: {
                Authorization: `Bearer ${res?.data?.jwt}`
              }
            })
          );
          setLoading(false);

          if (res.status) {
            navigate(lOGIN_ROUTE);
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
      <Form form={form} onFinish={onFinish}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.logo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Create new account'}
          />
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Full Name'} />
            <CommonInputField
              name="fullName"
              className={'auth'}
              placeholder={'John Smith'}
              rules={[
                {
                  validator: (_, value) => {
                    return validatorField(_, value, 3, 80);
                  }
                }
              ]}
            />
          </Space>
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
            <CommonTextField text={'Role'} />
            <CommonSelect
              rules={[
                {
                  required: true,
                  message: 'Please input Role'
                }
              ]}
              placeholder="Select Role"
              name="role"
              options={ROLE_IDS}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Phone Number'} />
            <CommonPhoneInput name={'phoneNumber'} />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'New Password'} />
            <CommonPasswordInput
              name={'password'}
              placeholder={'**************'}
              rules={[
                {
                  validator: (_, value) => {
                    return passwordValidation(_, value);
                  }
                }
              ]}
            />
          </Space>
          <Space direction="vertical" className={css(AppStyles.w100)}>
            <CommonTextField text={'Confirm Password'} />
            <CommonPasswordInput
              name={'newPassword'}
              placeholder={'**************'}
              rules={[
                {
                  validator: (_, value) => {
                    return handlePassworMatch(
                      _,
                      value,
                      getFieldValue('password')
                    );
                  }
                }
              ]}
            />
          </Space>

          <CommonButton
            htmlType="submit"
            loading={loading}
            text={'Sign up'}
            classname={css(AppStyles.mTop20, AppStyles.mBottom10)}
          />
          <Space className={css(AppStyles.justifyCenter, AppStyles.w100)}>
            <CommonTextField text={'Already have an account?'} />
            <CommonTextField
              className={'theme-text'}
              onClick={() => navigate('/login')}
              text={'Login'}
            />
          </Space>
        </Space>
      </Form>
    </>
  );
};

export default SignUp;

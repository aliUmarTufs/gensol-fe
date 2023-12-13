import React from 'react';
import CommonTextField from '../../../components/common/TextField';
import { css } from 'aphrodite';
import { AppStyles, Images } from '../../../theme';
import CommonButton from '../../../components/common/CommonButton';
import CommonPasswordInput from '../../../components/common/CommonPassword';
import { Form, Space } from 'antd';
import CommonHeading from '../../../components/common/CommonHeading';
import CommonInputField from '../../../components/common/CommonInput';
import {
  EMAIL_RULE,
  handlePassworMatch,
  lOGIN_ROUTE,
  passwordValidation,
  validatorField
} from '../../../constants';
import CommonPhoneInput from '../../../components//common/CommonPhoneInput';
import CommonSelect from '../../../components/common/CommonSelect';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const onFinish = (values) => {
    navigate(lOGIN_ROUTE);
  };

  const navigate = useNavigate();

  return (
    <>
      <Form onFinish={onFinish}>
        <Space direction="vertical" className={css(AppStyles.w100)}>
          <Space className={css(AppStyles.w100, AppStyles.justifyCenter)}>
            <img src={Images.logo} width={'50px'} height={'58px'} />
          </Space>
          <CommonHeading
            level={3}
            textAlign={'center'}
            text={'Email Verification Please Check Your Email'}
          />
          <CommonTextField
            width="65%"
            margin="0 auto"
            textAlign={'center'}
            text={`Add 6 digits verification code sent on your given email number adm**** ***@gmail.com `}
            opacity={'0.5'}
          />
          <CommonInputField
            autoFocus={true}
            name={'code'}
            type={'number'}
            className={'auth'}
            placeholder={'5 6 8 9 2 3'}
            // onClick={resend}
            suffix={<CommonTextField text={'Resend'} opacity={'0.5'} />}
            rules={[
              {
                validator: (_, value) => {
                  return validatorField(_, value, 6, 6);
                }
              }
            ]}
          />
          <CommonButton
            text={'Submit'}
            // loading={loading}
            htmlType="submit"
            classname={css(AppStyles.mTop20)}
          />
        </Space>
      </Form>
    </>
  );
};

export default EmailVerification;

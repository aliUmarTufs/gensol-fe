import React, { useEffect, useState } from 'react';
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
  handlePassworMatch,
  lOGIN_ROUTE,
  passwordValidation,
  validatorField
} from '../../../constants';
import CommonPhoneInput from '../../../components/common/CommonPhoneInput';
import CommonSelect from '../../../components/common/CommonSelect';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_REQUEST } from '../../../config/webService';
import { resetPasswordRequest } from '../../../redux/slicers/user';
import { toastAlert } from '../../../services/utils';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  const onFinish = (values) => {
    setLoading(true);
    const { password, newPassword } = values;

    const payloadData = {
      password: password,
      passwordConfirmation: newPassword,
      code: code
    };

    dispatch(
      resetPasswordRequest({
        payloadData,
        responseCallback: (res) => {
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

  useEffect(() => {
    if (!code) {
      navigate(lOGIN_ROUTE);
    }
  }, [code]);

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
            text={'Reset your Password'}
          />
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
            text={'Submit'}
            loading={loading}
            htmlType="submit"
            classname={css(AppStyles.mTop20)}
          />
        </Space>
      </Form>
    </>
  );
};

export default ResetPassword;

import React from 'react';
import './styles.scss';
import CommonHeading from '../../common/CommonHeading';
import { AppStyles, Colors } from '../../../theme';
import CommonDivider from '../../common/CommonDivider';
import { Col, Form, Row, Space } from 'antd';
import {
  ALERT_TYPES,
  EMAIL_RULE,
  handlePassworMatch,
  passwordValidation
} from '../../../constants';
import CommonInputField from '../../common/CommonInput';
import { css } from 'aphrodite';
import CommonTextField from '../../common/TextField';
import CommonPasswordInput from '../../common/CommonPassword';
import CommonButton from '../../common/CommonButton';
import {
  ProfileUpdateRequest,
  passwordChangeRequest
} from '../../../redux/slicers/user';
import { useDispatch, useSelector } from 'react-redux';
import { toastAlert } from '../../../services/utils';

const PasswordCard = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { getFieldValue } = form;
  const { data } = useSelector((state) => state.user);

  const { email } = data?.user || {};

  const onFinish = (values) => {
    const { currentPassword, password, newPassword } = values;

    const payloadData = {
      currentPassword: currentPassword,
      password: password,
      passwordConfirmation: newPassword,
      email: email
    };

    dispatch(
      passwordChangeRequest({
        payloadData,
        responseCallback: (res) => {
          form.resetFields();

          if (res.status) {
            toastAlert('Password Update successfully', ALERT_TYPES.success);
          }
        }
      })
    );
  };

  return (
    <div className="profile-info">
      <CommonHeading
        color={Colors.theme}
        level={2}
        text={'Change password'}
        className={'bebas-family'}
      />
      <CommonDivider />
      <Form form={form} onFinish={onFinish}>
        <Row gutter={[20, 10]}>
          <Col lg={12} sm={24} xs={24}>
            <Space direction="vertical" className={css(AppStyles.w100)}>
              <CommonTextField color={Colors.theme} text={'Old Password'} />
              <CommonPasswordInput
                name={'currentPassword'}
                placeholder={'**************'}
              />
            </Space>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Space direction="vertical" className={css(AppStyles.w100)}>
              <CommonTextField color={Colors.theme} text={'New Password'} />
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
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Space direction="vertical" className={css(AppStyles.w100)}>
              <CommonTextField color={Colors.theme} text={'Confirm Password'} />
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
          </Col>
        </Row>
        <div className="profile-but">
          <CommonButton htmlType="submit" text={'Confirm'} width={'200px'} />
        </div>
      </Form>
    </div>
  );
};

export default PasswordCard;

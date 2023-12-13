import React, { useState } from 'react';
import './styles.scss';
import CommonHeading from '../../common/CommonHeading';
import { AppStyles, Colors } from '../../../theme';
import CommonDivider from '../../common/CommonDivider';
import { Col, Form, Row, Space } from 'antd';
import { ALERT_TYPES, EMAIL_RULE } from '../../../constants';
import CommonInputField from '../../common/CommonInput';
import { css } from 'aphrodite';
import CommonTextField from '../../common/TextField';
import CommonButton from '../../common/CommonButton';
import CommonPhoneInput from '../../common/CommonPhoneInput';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileUpdateRequest } from '../../../redux/slicers/user';
import { toastAlert } from '../../../services/utils';

const ProfileCard = () => {
  const [disabled, setDisabled] = useState(true);
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { email, username, phoneNumber, id } = data?.user || {};

  const onFinish = (values) => {
    const { name, phoneNumber } = values;

    const payloadData = {
      username: name,
      phoneNumber: phoneNumber
    };

    dispatch(
      ProfileUpdateRequest({
        payloadData,
        responseCallback: (res) => {
          setDisabled(true);
          if (res.status) {
            toastAlert('Profile Update successfully', ALERT_TYPES.success);
          }
        },
        parameter: id
      })
    );
  };
  return (
    <div className="profile-info">
      <CommonHeading
        color={Colors.theme}
        level={2}
        text={'Profile Information'}
        className={'bebas-family'}
      />
      <CommonDivider />
      <Form
        initialValues={{
          email: email,
          name: username,
          phoneNumber: phoneNumber
        }}
        onFinish={onFinish}
        onValuesChange={(changedValues, allValues) => {
          setDisabled(false);
        }}
      >
        <Row gutter={[20, 10]}>
          <Col lg={12} sm={24} xs={24}>
            <Space direction="vertical" className={css(AppStyles.w100)}>
              <CommonTextField text={'Email:'} color={Colors.theme} />
              <CommonInputField
                disabled={true}
                name="email"
                type={'email'}
                className={'auth'}
                placeholder={'john.smith@domain.com'}
                rules={EMAIL_RULE}
              />
            </Space>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Space direction="vertical" className={css(AppStyles.w100)}>
              <CommonTextField text={'Name:'} color={Colors.theme} />
              <CommonInputField
                name="name"
                className={'auth'}
                placeholder={'Enter your name'}
              />
            </Space>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Space direction="vertical" className={css(AppStyles.w100)}>
              <CommonTextField text={'Phone:'} color={Colors.theme} />
              <CommonPhoneInput name={'phoneNumber'} />
            </Space>
          </Col>
          {/* <Col lg={12} sm={24} xs={24}>
            <Space direction="vertical" className={css(AppStyles.w100)}>
              <CommonTextField text={'Country:'} color={Colors.theme} />
              <CommonInputField
                name="contry"
                type={'email'}
                className={'auth'}
                placeholder={'Enter your country'}
                // rules={EMAIL_RULE}
              />
            </Space>
          </Col> */}
        </Row>
        <div className="profile-but">
          <CommonButton
            disabled={disabled}
            htmlType="submit"
            text={'Update'}
            width={'200px'}
          />
        </div>
      </Form>
    </div>
  );
};

export default ProfileCard;

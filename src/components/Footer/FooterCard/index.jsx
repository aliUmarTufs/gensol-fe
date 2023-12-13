import React from 'react';
import './styles.scss';
import { Divider, Form, Space } from 'antd';
import { AppStyles, Images } from '../../../theme';
import CommonTextField from '../../common/TextField';
import CommonInputField from '../../common/CommonInput';
import { css } from 'aphrodite';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { newsletterSubscriptionForm } from '../../../redux/slicers/general';
import { ALERT_TYPES, EMAIL_RULE } from '../../../constants';
import { toastAlert } from '../../../services/utils';

const { fb, insta, linkedin, twitter, Vector } = Images;

const Img = [
  { src: fb, link: 'https://www.facebook.com/GeniusAcademyEd' },
  { src: twitter, link: 'https://twitter.com/GeniusAcademyEd' },
  {
    src: linkedin,
    link: 'https://www.linkedin.com/company/geniusacademyeducation/'
  },
  { src: Vector, link: 'https://vimeo.com/' },
  { src: insta, link: 'https://www.instagram.com/geniusacademyeducation/' }
];

const temp = [
  {
    text: 'Learning Solutions',
    link: 'https://www.experiencegeniusacademy.com/'
  },

  {
    text: 'Platform',
    link: 'https://www.experiencegeniusacademy.com/platform'
  },

  {
    text: 'Resources',
    link: 'https://www.experiencegeniusacademy.com/resources'
  },

  {
    text: 'Library',
    link: 'https://experiencegenius.academy/dsm-video-immersion-series'
  },
  {
    text: 'About Genius',
    link: 'https://www.experiencegeniusacademy.com/about-genius-academy'
  },

  {
    text: 'Help',
    link: ''
  }
];

const scroll = () => {
  window.scrollTo(0, 0);
};

const FooterCard = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFinish = () => {
    form.validateFields().then((values) => {
      const { email } = values;
      const payloadData = {
        ...values,
        email: email
      };
      dispatch(
        newsletterSubscriptionForm({
          payloadData,
          responseCallback: (res) => {
            console.log({ res });
            if (res?.data?.status == true) {
              form.resetFields();
              toastAlert('Email send successfully');
            } else if (res?.data?.status == false) {
              toastAlert(res?.data?.message, ALERT_TYPES.error);
            }
          }
        })
      );
    });
  };

  return (
    <div className="card-parent">
      <div className="scroll-up" onClick={scroll}>
        <FontAwesomeIcon icon={faChevronUp} />
      </div>
      <Space size={50} className={css(AppStyles.flexWrap)}>
        <img src={Images.footerLogo} />
        <Space direction="vertical">
          <Form form={form}>
            <Space direction="vertical">
              <CommonTextField text={'News letter'} />
              <CommonInputField
                name={'email'}
                type={'email'}
                className={'footer-field'}
                placeholder="Enter your email address"
                suffix={
                  <img
                    src={Images.message}
                    onClick={handleFinish}
                    className={css(AppStyles.cursorPointer)}
                  />
                }
                rules={EMAIL_RULE}
              />
            </Space>
          </Form>

          <Space>
            <CommonTextField text={'Social Media'} />
            {Img.map((t) => (
              <a target="_blank" href={t.link}>
                <img src={t.src} />
              </a>
            ))}
          </Space>
        </Space>
      </Space>
      <Divider />
      <Space
        align="baseline"
        className={css(
          AppStyles.spaceBetween,
          AppStyles.w100,
          AppStyles.flexWrap
        )}
      >
        <Space size={20} className={css(AppStyles.flexWrap)}>
          {temp.map((t) => (
            <CommonTextField
              text={t.text}
              onClick={() => {
                if (t.link) {
                  window.open(t.link, '_blank');
                }
              }}
              key={Math.random()}
            />
          ))}
        </Space>
        <CommonTextField text={'© 2023 All rights reserved Genius Academy.'} />
      </Space>
    </div>
  );
};

export default FooterCard;

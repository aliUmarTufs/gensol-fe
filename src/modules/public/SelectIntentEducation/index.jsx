import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import { Form, Input, Radio, Space } from 'antd';
import CommonTextField from '../../../components/common/TextField';
import CommonInputField from '../../../components/common/CommonInput';
import CommonPhoneInput from '../../../components/common/CommonPhoneInput';
import {
  AUDIENCE,
  EMAIL_RULE,
  INTEREST,
  LMSFIELD,
  SUBJECT
} from '../../../constants';

const SelectIntentEducation = ({ handleSubmitForm = () => {} }) => {
  const [selectedIntent, setIntent] = useState(1);

  const [form] = Form.useForm();

  const setIntentHandler = (e) => {
    setIntent(e.target.value);
  };

  const handleNext = (values) => {
    handleSubmitForm(values);
    // handleSubmitForm(null, 1);
  };

  return (
    <Form
      form={form}
      onFinish={handleNext}
      initialValues={{
        method: 1,
        audience: AUDIENCE[0].value,
        interest: INTEREST[0].value,
        subject: SUBJECT[0].value
      }}
    >
      <BlackBox>
        <HeadingComponent title={'Select Delivery Method'} />
        <div className="select-intent-wrapper">
          <Form.Item name="method">
            <Radio.Group onChange={setIntentHandler} value={selectedIntent}>
              <Space direction="vertical">
                <Radio value={1}>
                  <CommonTextField
                    text={'Genius Academy Platform'}
                    fontWeight={700}
                  />
                </Radio>

                {selectedIntent == 1 && (
                  <Space direction="vertical" className={'checkout-content'}>
                    <Space size={3} direction="vertical">
                      <CommonTextField
                        text={'Audience Information'}
                        fontWeight={700}
                      />
                      <CommonTextField
                        text={
                          'Please provide us with some information about your interests and preferences.'
                        }
                      />
                    </Space>
                    <CommonTextField
                      className={css(AppStyles.mTop10, AppStyles.mBottom10)}
                      text={'I am a:'}
                      fontWeight={700}
                    />
                    <Form.Item name="audience">
                      <Radio.Group>
                        <Space direction="vertical">
                          {AUDIENCE.map((item) => (
                            <Radio value={item.value}>
                              <CommonTextField text={item.name} />
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.audience !== currentValues.audience
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue('audience') === 'audienceOther' ? (
                          <CommonInputField
                            name="audienceOther"
                            placeholder={'Type here...'}
                          />
                        ) : null
                      }
                    </Form.Item>

                    <CommonTextField
                      text={'Interest:'}
                      className={css(AppStyles.mTop10, AppStyles.mBottom10)}
                      fontWeight={700}
                    />
                    <Form.Item name="interest">
                      <Radio.Group>
                        <Space direction="vertical">
                          {INTEREST.map((item) => (
                            <Radio value={item.value}>
                              <CommonTextField text={item.name} />
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.interest !== currentValues.interest
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue('interest') === 'interestOther' ? (
                          <>
                            <CommonInputField
                              name="interestOther"
                              placeholder={'Type here...'}
                            />
                            <CommonInputField
                              name="interestEmail"
                              type={'email'}
                              placeholder={'john.smith@domain.com'}
                              rules={EMAIL_RULE}
                            />
                          </>
                        ) : null
                      }
                    </Form.Item>
                  </Space>
                )}

                <Radio value={2}>
                  <CommonTextField fontWeight={700} text={'LMS'} />
                </Radio>
                {selectedIntent == 2 && (
                  <Space direction="vertical" className={'checkout-content'}>
                    <Space size={3} direction="vertical">
                      <CommonTextField
                        text={'LMS Information'}
                        className={css(AppStyles.mTop10)}
                        fontWeight={700}
                      />
                      <CommonTextField
                        text={
                          'Please provide the following details to create your LMS account.'
                        }
                      />
                    </Space>
                    {LMSFIELD?.map((t) => (
                      <CommonInputField
                        name={t.name}
                        type={t.type}
                        placeholder={t.placeholder}
                        rules={t.type === 'email' && EMAIL_RULE}
                      />
                    ))}

                    <CommonTextField
                      className={css(AppStyles.mTop10, AppStyles.mBottom10)}
                      text={'Subjects of Interest:'}
                      fontWeight={700}
                    />
                    <Form.Item name="subject">
                      <Radio.Group>
                        <Space direction="vertical">
                          {SUBJECT.map((item) => (
                            <Radio value={item.value}>
                              <CommonTextField text={item.name} />
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.subject !== currentValues.subject
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue('subject') === 'subjectOther' ? (
                          <CommonInputField
                            name="subjectOther"
                            placeholder={'Type here...'}
                          />
                        ) : null
                      }
                    </Form.Item>

                    <Space
                      className={css(AppStyles.mTop15)}
                      size={3}
                      direction="vertical"
                    >
                      <CommonTextField
                        text={'Audience Information'}
                        fontWeight={700}
                      />
                      <CommonTextField
                        text={
                          'Please provide us with some information about your interests and preferences.'
                        }
                      />
                    </Space>
                    <CommonTextField
                      className={css(AppStyles.mTop10, AppStyles.mBottom10)}
                      text={'I am a:'}
                      fontWeight={700}
                    />
                    <Form.Item name="audience">
                      <Radio.Group>
                        <Space direction="vertical">
                          {AUDIENCE.map((item) => (
                            <Radio value={item.value}>
                              <CommonTextField text={item.name} />
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.audience !== currentValues.audience
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue('audience') === 'audienceOther' ? (
                          <CommonInputField
                            name="audienceOther"
                            placeholder={'Type here...'}
                          />
                        ) : null
                      }
                    </Form.Item>

                    <CommonTextField
                      text={'Interest:'}
                      className={css(AppStyles.mTop10, AppStyles.mBottom10)}
                      fontWeight={700}
                    />
                    <Form.Item name="interest">
                      <Radio.Group>
                        <Space direction="vertical">
                          {INTEREST.map((item) => (
                            <Radio value={item.value}>
                              <CommonTextField text={item.name} />
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.interest !== currentValues.interest
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue('interest') === 'interestOther' ? (
                          <>
                            <CommonInputField
                              name="interestOther"
                              placeholder={'Type here...'}
                            />
                            <CommonInputField
                              name="interestEmail"
                              type={'email'}
                              placeholder={'john.smith@domain.com'}
                              rules={EMAIL_RULE}
                            />
                          </>
                        ) : null
                      }
                    </Form.Item>
                  </Space>
                )}
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="black-box-btn-wrapper">
          <CommonButton text="Next" width={'172px'} htmlType="submit" />
        </div>
      </BlackBox>
    </Form>
  );
};

export default SelectIntentEducation;

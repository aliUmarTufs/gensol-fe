import { Form, Select } from 'antd';
import React from 'react';
import './styles.scss';

const CommonSelect = ({ name, rules, options, placeholder, defaultValue }) => {
  return (
    <>
      <Form.Item name={name} rules={rules}>
        <Select placeholder={placeholder} options={options} />
      </Form.Item>
    </>
  );
};

export default CommonSelect;

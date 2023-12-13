/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input } from 'antd';
import './styles.scss';
import { validatorField } from '../../../constants';

const CommonInputField = ({
  placeholder,
  name,
  // label,
  className,
  maxLength,
  showCount,
  addonBefore,
  type,
  onChange,
  // onBlur,
  // value,
  // errors,
  // touch,
  height,
  suffix,
  rules,
  disabled,
  autoFocus,
  onKeyDown,
  reference
}) => {
  return (
    <Form.Item
      name={name}
      rules={
        rules
          ? rules
          : [
              {
                validator: (_, value) => {
                  return validatorField(_, value, 0, 80);
                }
              }
            ]
      }
    >
      <Input
        ref={reference}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        style={{ height }}
        type={type}
        disabled={disabled}
        // name={name}
        addonBefore={addonBefore}
        showCount={showCount}
        maxLength={maxLength}
        className={`ad-input  ${className || ''}`}
        placeholder={placeholder}
        onChange={onChange}
        // onBlur={onBlur}
        // value={value}
        suffix={suffix || true}
      />
      {/* {errors && touch && (
        <p
          style={{
            color: "red",
            fontSize: "13px",
            marginBottom: "0",
          }}
        >
          {errors[name]}
        </p>
      )} */}
    </Form.Item>
  );
};

export default CommonInputField;

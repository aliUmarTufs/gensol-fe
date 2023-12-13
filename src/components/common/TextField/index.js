import React from 'react';
import './styles.scss';
import { AppStyles } from '../../../theme';
import { css } from 'aphrodite';

const CommonTextField = ({
  topClass,
  text,
  children,
  font,
  fontSize,
  color,
  mb = 0,
  mt = 0,
  onClick,
  textAlign,
  fontWeight,
  fontFamily,
  letterSpacing,
  textDecoration,
  paddingLeft,
  className,
  title,
  lineHeight,
  opacity,
  width,
  margin = 0,
  paddingTop
}) => {
  return (
    <div className={`${topClass || ''}  paragraph-parent`}>
      <p
        title={title}
        className={`${className || ''} ${
          onClick ? css(AppStyles.pointer) : ''
        }`}
        style={{
          margin: margin,
          padding: 0,
          fontFamily: font,
          fontSize,
          color,
          marginBottom: mb,
          marginTop: mt,
          textAlign,
          fontFamily,
          fontWeight,
          letterSpacing,
          lineHeight,
          paddingLeft,
          paddingTop,
          textDecoration,
          whiteSpace: 'pre-wrap',
          opacity,
          width
        }}
        onClick={onClick}
      >
        {text || children}
      </p>
    </div>
  );
};

export default CommonTextField;

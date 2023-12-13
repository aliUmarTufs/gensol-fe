import { Divider } from 'antd';
import React from 'react';
import './styles.scss';

const CommonDivider = ({ className, type }) => {
  return (
    <Divider className={className ? className : 'common-divider'} type={type} />
  );
};

export default CommonDivider;

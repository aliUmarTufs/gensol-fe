import React from 'react';
import { css } from 'aphrodite';
import { AppStyles, Colors, Images } from '../../theme';
import './styles.scss';

const BlackBox = ({ children, classes = '' }) => {
  return <div className={`blackBoxWrapper ${classes}`}>{children}</div>;
};
export default BlackBox;

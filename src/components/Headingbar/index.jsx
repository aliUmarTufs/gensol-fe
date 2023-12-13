import React from 'react';
import './styles.scss';
import CommonTextField from '../common/TextField';
import CommonHeading from '../common/CommonHeading';
import { Colors } from '../../theme';

const HeadingBar = ({ text }) => {
  return (
    <div className="headingBar-parent">
      <CommonHeading text={text} color={Colors.theme} />
    </div>
  );
};

export default HeadingBar;

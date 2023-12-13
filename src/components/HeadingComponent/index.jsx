import React from 'react';
import { css } from 'aphrodite';
import { AppStyles, Colors, Images } from '../../theme';
import './styles.scss';

const HeadingComponent = ({ title }) => {
  return (
    <div className="HeadingComponentWrapper">
      <h1 className="HeadingComponentWrap">{title}</h1>
      <span className="border"></span>
    </div>
  );
};
export default HeadingComponent;

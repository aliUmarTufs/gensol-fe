import React, { useState } from 'react';
import './styles.scss';
import { BlackBox, HeadingComponent } from '../../../components';
import { AppStyles, Colors, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import { Form } from 'antd';
import CommonHeading from '../../../components/common/CommonHeading';

const Dropper = ({
  refer,
  visibleDiv,
  onDrop = () => {},
  onDragOver = () => {}
}) => {
  return (
    <div ref={refer}>
      {visibleDiv && (
        <>
          <div className="dropperCart" onDragOver={onDragOver}>
            <CommonHeading text={'Add to Cart'} />
          </div>
          <div
            style={{
              position: 'fixed',
              right: '-59px',
              zIndex: 1,
              rotate: '-90deg',
              top: '30%',
              transform: 'translateY(-50%)'
            }}
            className="viewCartWrapper"
          >
            <img src={Images.ArrowUp} />
            <CommonHeading
              text={'View Cart'}
              color={Colors.theme}
              lineHeight={1}
              className={'viewCartBtnWrapper'}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dropper;

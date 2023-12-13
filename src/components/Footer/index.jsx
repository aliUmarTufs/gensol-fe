import React from 'react';
import './styles.scss';
import { AppStyles, Images } from '../../theme';
import CommonHeading from '../common/CommonHeading';
import CommonButton from '../common/CommonButton';
import FooterCard from './FooterCard';
import { Space } from 'antd';

const Footer = () => {
  return (
    <footer className="web-footer">
      <div className="background">
        <div className="content">
          <CommonHeading text={'Request a Demo'} />
          <CommonHeading text={'from a Genius Today'} />
          <CommonButton
            text="Request a Demo"
            width={'240px'}
            onClick={() => {
              window.open(
                'https://curriculum.experiencegeniusacademy.com/meetings/k-rocco/genius-academy-demo-ceo',
                '_blank'
              );
            }}
          />
          <FooterCard />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

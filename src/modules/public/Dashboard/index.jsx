import React, { useState, useEffect } from 'react';
import './styles.scss';
import CommonHeading from '../../../components/common/CommonHeading';
import { Space } from 'antd';
import { Colors } from '../../../theme';
import CommonDivider from '../../../components/common/CommonDivider';
import ProfileCard from '../../../components/dashboard/ProfileCard';
import PasswordCard from '../../../components/dashboard/PasswordCard';
import PurchaseHistory from '../../../components/dashboard/History';

const Dashboard = () => {
  // STATES
  const [show, setShow] = useState(true);

  return (
    <div className="dashborad-wrapper">
      <CommonHeading text={'Profile'} textAlign={'center'} />

      <Space>
        <CommonHeading
          level={2}
          text={'Profile edit'}
          color={show ? Colors.theme : ''}
          className={'bebas-family'}
          onClick={() => setShow(!show)}
        />
        <CommonDivider className="heading-divider" type="vertical" />
        <CommonHeading
          level={2}
          text={'Purchase history'}
          color={show ? '' : Colors.theme}
          className={'bebas-family'}
          onClick={() => setShow(!show)}
        />
      </Space>
      <CommonDivider />

      {show ? (
        <>
          <ProfileCard />
          <PasswordCard />
        </>
      ) : (
        <PurchaseHistory />
      )}
    </div>
  );
};

export default Dashboard;

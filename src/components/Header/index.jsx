import React, { useState } from 'react';
import './styles.scss';
import CommonTextField from '../common/TextField';
import { Col, Dropdown, Row, Space } from 'antd';
import { AppStyles, Colors, Images } from '../../theme';
import { css } from 'aphrodite';
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  SIGNUP_ROUTE,
  header,
  lOGIN_ROUTE
} from '../../constants';
import CommonButton from '../common/CommonButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../SideBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginRequest, userSignOutSuccess } from '../../redux/slicers/user';

const Header = () => {
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handelLogout = () => {
    dispatch(
      userSignOutSuccess({
        payloadData: {},
        responseCallback: (res) => {
          if (res.status) {
            navigate(lOGIN_ROUTE);
          }
        }
      })
    );
  };

  const handelSignin = () => {
    navigate(lOGIN_ROUTE);
  };

  return (
    <header className="main-header">
      {!user?.data?.jwt && (
        <Space
          className={`${css(AppStyles.w100, AppStyles.justifyCenter)} top-bar`}
        >
          <CommonTextField text={'Free Library Access -'} fontWeight={700} />
          <CommonTextField
            text={'Signup Now'}
            color={Colors.theme}
            fontWeight={700}
            onClick={() => {
              navigate(SIGNUP_ROUTE);
            }}
          />
        </Space>
      )}

      <div
        className={`${css(AppStyles.flexBox, AppStyles.pTop15)} header-content`}
      >
        <img
          src={Images.logo}
          width="67px"
          height="69px"
          onClick={() => navigate(HOME_ROUTE)}
          className="c-pointer"
        />
        <Space
          className={`${css(
            AppStyles.w100,
            AppStyles.pLeft50,
            AppStyles.spaceBetween
          )} menu`}
        >
          {header.map((t) => (
            <CommonTextField
              text={t.text}
              key={Math.random()}
              color={'#343434'}
              onClick={() => {
                if (t.link) {
                  if (t.text === 'Products') {
                    navigate(t.link);
                  } else {
                    window.open(t.link, '_blank');
                  }
                }
              }}
            />
          ))}
          {/* <img src={Images.searchIcon} /> */}
          {user?.data?.jwt ? (
            <Dropdown
              placement="bottom"
              menu={{
                items: [
                  {
                    key: 1,
                    label: (
                      <CommonTextField
                        fontWeight={'600'}
                        text={'Dashboard'}
                        color={Colors.theme}
                        onClick={() => {
                          navigate(DASHBOARD_ROUTE);
                        }}
                      />
                    )
                  },
                  {
                    key: 2,
                    label: (
                      <CommonTextField
                        fontWeight={'600'}
                        text={'Logout'}
                        color={Colors.theme}
                        onClick={handelLogout}
                      />
                    )
                  }
                ]
              }}
              trigger={['click']}
            >
              <Space align="center">
                <FontAwesomeIcon
                  className={css(AppStyles.pointer)}
                  icon={faUser}
                />
              </Space>
            </Dropdown>
          ) : (
            <CommonButton text={'Sign In'} onClick={handelSignin} />
          )}
          <div className="divider"></div>
          <CommonButton
            text="Schedule A Demo"
            width={'196px'}
            onClick={() => {
              window.open(
                'https://www.experiencegeniusacademy.com/demo',
                '_blank'
              );
            }}
          />
        </Space>

        <div className={`hamburgerIconWrapper`}>
          <FontAwesomeIcon
            className={css(AppStyles.pointer)}
            size={'lg'}
            onClick={() => setopen(true)}
            icon={faBars}
          />
        </div>
      </div>
      <SideBar open={open} handleClose={setopen} />
    </header>
  );
};

export default Header;

import { App, Drawer } from 'antd';
import { css } from 'aphrodite';
import React, { useEffect } from 'react';
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  header,
  lOGIN_ROUTE
} from '../../constants';
import { AppStyles, Colors, Images } from '../../theme';
import CommonButton from '../common/CommonButton';
import CommonTextField from '../common/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSignOutSuccess, getRoleRequest } from '../../redux/slicers/user';
import './styles.scss';

const SideBar = ({ open, handleClose = () => {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const handelLogout = () => {
    dispatch(userSignOutSuccess());
    handleClose(false);
  };

  const handelLogin = () => {
    navigate(lOGIN_ROUTE);
  };

  useEffect(() => {
    if (user?.data?.jwt) {
      dispatch(
        getRoleRequest({
          parameter: user?.data?.user.id,
          query: 'populate=*'
        })
      );
    }
    handleClose(false);
  }, [location]);

  return (
    <Drawer
      title="Side Bar"
      placement="left"
      onClose={() => handleClose(false)}
      open={open}
      headerStyle={{ display: 'none' }}
      width={"90%"}
    >
      <div
        className={css(
          AppStyles.flexColumn,
          AppStyles.spaceBetween,
          AppStyles.h100
        )}
      >
        <span className={css(AppStyles.marginVerticalBase)}>
          <img
            src={Images.logo}
            width="67px"
            height="69px"
            onClick={() => navigate(HOME_ROUTE)}
            className="c-pointer"
          />

          {header.map((t) => (
            <CommonTextField
              topClass={css(AppStyles.marginVerticalBase)}
              text={t.text}
              key={Math.random()}
              color={'#343434'}
              onClick={() => navigate(t.link)}
            />
          ))}

          <CommonTextField
            topClass={css(AppStyles.marginVerticalBase)}
            text={'Dashboard'}
            color={'#343434'}
            onClick={() => navigate(DASHBOARD_ROUTE)}
          />
        </span>
        <span>
          {user?.data?.jwt ? (
            <CommonButton
              text="Logout"
              onClick={handelLogout}
              width={'100%'}
              background={'#fff'}
              border={1}
              color={Colors.theme}
              borderStyle={'solid'}
              borderColor={Colors.theme}
            />
          ) : (
            <CommonButton
              text="Login"
              onClick={handelLogin}
              width={'100%'}
              background={'#fff'}
              border={1}
              color={Colors.theme}
              borderStyle={'solid'}
              borderColor={Colors.theme}
            />
          )}

          <CommonButton
            text="Schedule A Demo"
            width={'100%'}
            topClass={css(AppStyles.marginVerticalBase)}
            onClick={() => {
              window.open(
                'https://www.experiencegeniusacademy.com/demo',
                '_blank'
              );
            }}
          />
        </span>
      </div>
    </Drawer>
  );
};
export default SideBar;

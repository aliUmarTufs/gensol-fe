import React, { useState } from 'react';
import './styles.scss';
import { AppStyles, Images } from '../../../theme';
import { Col, Row, Space } from 'antd';
import CommonHeading from '../../common/CommonHeading';
import CommonTextField from '../../common/TextField';
import CommonButton from '../../common/CommonButton';
import { css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import { SUB_PRODUCT } from '../../../constants';
import { BASE_URL } from '../../../config/webService';
import CommonVideoModal from '../../common/videoModal';
import CommonVideoPreview from '../../CommonVideo';

const ProductCard = ({ detail }) => {
  const navigate = useNavigate();
  const { src, name, description, trailer } = detail;
  const [open, setOpen] = useState(false);

  const handelTrailer = () => {
    setOpen(true);
  };

  console.log({ detail });
  return (
    <>
      <Row
        gutter={[20, 20]}
        className={`${css(AppStyles.spaceBetween)} productCard-parent`}
      >
        <Col lg={13} md={12} sm={24} xs={24} className="left-side">
          <div className="right-shadow"></div>
          <img
            src={detail?.featuredImg?.data?.attributes?.url}
            width={'100%'}
          />
          <div className="left-shadow"></div>
        </Col>
        <Col lg={9} md={12} sm={24} xs={24} className="right-side">
          <Space
            direction="vertical"
            className={css(AppStyles.spaceBetween, AppStyles.h100)}
          >
            <CommonHeading text={name} />
            <CommonTextField text={description} />
            <Space size={50}>
              <CommonButton text={'Watch Now'} onClick={handelTrailer} />
              <CommonTextField
                text={'See All'}
                textDecoration="underline"
                onClick={() => {
                  // navigate(SUB_PRODUCT);
                  // navigate(`${SUB_PRODUCT}/${name}`);
                  navigate(SUB_PRODUCT.replace(':categoryName', name));
                }}
              />
            </Space>
          </Space>
        </Col>
      </Row>
      <CommonVideoModal isModalVisible={open} setIsModalVisible={setOpen}>
        <CommonVideoPreview video={trailer?.data?.attributes?.url} />
      </CommonVideoModal>
    </>
  );
};

export default ProductCard;

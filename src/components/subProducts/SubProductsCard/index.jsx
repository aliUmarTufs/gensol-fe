import React, { useState } from 'react';
import CommonTextField from '../../common/TextField';
import './styles.scss';
import { AppStyles, Colors, Images } from '../../../theme';
import { Space } from 'antd';
import CommonHeading from '../../common/CommonHeading';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_DETAIL } from '../../../constants';
import { detectMob } from '../../../services/utils';
import { css } from 'aphrodite';
import CommonVideoModal from '../../common/videoModal';
import CommonVideoPreview from '../../CommonVideo';
import { BASE_URL } from '../../../config/webService';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../../redux/slicers/product';

const SubProductsCard = ({ detail, mobile, onDragCard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Draggable, setDraggable] = useState(false);
  const [open, setOpen] = useState(false);

  const { attributes } = detail;

  const handelTrailer = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div
      className="subProductsCard-parent"
      draggable={true}
      onDrag={() => {
        if (onDragCard) {
          onDragCard(detail);
        }
      }}
    >
      <img
        src={attributes?.featuredImage1?.data?.attributes?.url}
        width={'100%'}
        height={'250px'}
        draggable={false}
      />

      {detectMob() ? (
        <img
          src={Images.DragIcon}
          className="dragicon"
          draggable={false}
          onClick={() => {
            if (mobile) {
              mobile(detail);
            }
          }}
        />
      ) : (
        <img src={Images.DragIcon} className="dragicon" draggable={false} />
      )}

      <Space
        direction="vertical"
        draggable={false}
        className="detailes"
        onClick={() => {
          dispatch(setSelectedProduct(attributes?.title));
          navigate(PRODUCT_DETAIL.replace(':id', detail?.id));
        }}
      >
        <CommonHeading
          level={3}
          text={attributes?.title}
          color={Colors.theme}
        />
        <CommonTextField text={attributes?.shortDescription} />
        <Space className={css(AppStyles.flexBox, AppStyles.end)}>
          <img src={Images.view} />
          <CommonTextField
            onClick={handelTrailer}
            text={'View Trailer'}
            className={'bebas-family'}
            textDecoration="underline"
          />
        </Space>
      </Space>
      <CommonVideoModal isModalVisible={open} setIsModalVisible={setOpen}>
        <CommonVideoPreview />
      </CommonVideoModal>
    </div>
  );
};

export default SubProductsCard;

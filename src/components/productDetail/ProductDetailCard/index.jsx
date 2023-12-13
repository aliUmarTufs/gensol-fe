import React, { useState } from 'react';
import './styles.scss';
import CommonHeading from '../../common/CommonHeading';
import CommonTextField from '../../common/TextField';
import { Space } from 'antd';
import { AppStyles, Images } from '../../../theme';
import CommonVideoPreview from '../../CommonVideo';
import CommonModal from '../../common/CommonModal';
import CommonVideoModal from '../../common/videoModal';
import CommonButton from '../../common/CommonButton';
import { css } from 'aphrodite';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../config/webService';
import { addToCart } from '../../../redux/slicers/user';
import { detectMob } from '../../../services/utils';

const ProductDetailCard = ({
  onDragCard,
  isCartView,
  ProdDetail,
  productDetail,
  cartProduct,
  mobile,
  addToCartListdetail
}) => {
  const [open, setOpen] = useState(false);
  const [video, setVid] = useState('');
  const dispatch = useDispatch();

  const handelTrailer = (vid) => {
    setVid(vid);
    setOpen(!open);
  };

  console.log({ productDetail });

  return (
    <div className="DetailCard-parent">
      <div
        className={`background ${isCartView ? 'iscartViewDetail' : ''}`}
        style={{ backgroundImage: `url(${productDetail.image})` }}
      >
        <div
          onDrag={() => {
            if (onDragCard) {
              onDragCard(productDetail, true);
            }
          }}
          draggable={true}
          className={`details`}
        >
          <Space size={25} direction="vertical">
            {detectMob() ? (
              <img
                src={Images.DragIcon}
                className="dragicon"
                draggable={false}
                onClick={() => {
                  addToCartListdetail();
                }}
              />
            ) : (
              <img
                src={Images.DragIcon}
                className="dragicon"
                draggable={false}
              />
            )}
            <img src={productDetail.image} className="respDetailImage" />
            <CommonHeading
              text={productDetail.title}
              className={'theme-text'}
            />
            <CommonHeading
              level={2}
              text={'Story'}
              className={'bebas-family'}
            />
            <CommonTextField
              // text={
              //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
              // }
              text={productDetail?.description}
            />
            <CommonHeading
              level={2}
              text={'Learning Objectives'}
              className={'bebas-family'}
            />
            <Space direction="vertical">
              <CommonTextField
                fontWeight={600}
                text={
                  'After watching this video, the learner should be able to'
                }
              />
              {productDetail?.learningObjectives?.map((item, index) => (
                <CommonTextField text={`(${index + 1}) ${item?.point}`} />
              ))}
              {/* <CommonTextField
              text={
                '(2) Determine the timeline and duration of symptoms that qualify for the diagnosis.'
              }
            />
            <CommonTextField
              text={
                '(3) Confirm symptoms are not the result of other conditions or mental disorders.'
              }
            />
            <CommonTextField
              text={'(4) Establish the duration and trajectory of symptoms.'}
            /> */}
            </Space>
            <Space
              size={20}
              className={css(AppStyles.flexBox, AppStyles.flexWrap)}
            >
              <Space>
                <img src={Images.watch} />
                <CommonTextField
                  text={'Watch Now'}
                  className={'bebas-family'}
                  textDecoration="underline"
                  onClick={() => handelTrailer(productDetail?.video)}
                />
              </Space>
              <Space>
                <img src={Images.view} />
                <CommonTextField
                  onClick={() => handelTrailer(productDetail?.trailer)}
                  text={'View Trailer'}
                  className={'bebas-family'}
                  textDecoration="underline"
                />
              </Space>
              {/* <Space>
              <img src={Images.favorite} />
              <CommonTextField
                text={'favorite'}
                className={'bebas-family'}
                textDecoration="underline"
              />
            </Space> */}
              <Space>
                <CommonButton
                  text={'Add to Cart'}
                  // onClick={() => {
                  //   onDragCard(4, true);
                  // }}
                  onClick={addToCartListdetail}
                />
              </Space>
            </Space>
          </Space>
        </div>
      </div>
      <CommonVideoModal isModalVisible={open} setIsModalVisible={setOpen}>
        <CommonVideoPreview video={video} />
      </CommonVideoModal>
    </div>
  );
};

export default ProductDetailCard;

5;

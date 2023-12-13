import React from 'react';
import CommonVideoPreview from '../../CommonVideo';
import { Space } from 'antd';
import CommonTextField from '../../common/TextField';
import { AppStyles, Colors, Images } from '../../../theme';
import CommonHeading from '../../common/CommonHeading';
import './styles.scss';
import { css } from 'aphrodite';
import { millisecondsToTime } from '../../../services/utils';

const HistoryCard = ({ content }) => {
  return (
    <div className="history-card-parent">
      <div className="thumb-box">
        <img
        className={content?.isCource ? 'history-thumb' : 'history-thumb-package'}
          src={content?.isCource ? content.thumbnail : Images.Package}
          alt=""
        />
      </div>
      {/* <CommonVideoPreview className={'history-video'} /> */}
      <div direction="vertical" className="card-content">
        <div
          className={css(
            AppStyles.spaceBetween,
            AppStyles.w100,
            AppStyles.flexBox,
            AppStyles.flexWrap
          )}
        >
          <div style={{ width: '60%' }}>
            <CommonHeading
              textAlign={'start'}
              level={3}
              className={'bebas-family elepsis'}
              text={content?.title}
              color={Colors.theme}
            />
          </div>
          <div style={{ width: '40%' }}>
            <CommonTextField
              text={`$ ${content?.amount} `}
              fontWeight={'600'}
              textAlign={'end'}
            />
          </div>
        </div>
        <Space
          wrap={true}
          className={css(
            AppStyles.spaceBetween,
            AppStyles.w100,
            AppStyles.mTop15
          )}
        >
          <Space>
            <CommonTextField
              className={'bebas-family'}
              text={
                content?.isCource
                  ? `Duration ${millisecondsToTime(content?.duration)}`
                  : content?.packageType
              }
            />
          </Space>
          <CommonTextField text={`Purchased on: ${content?.createdAt}`} />
        </Space>
      </div>
    </div>
  );
};

export default HistoryCard;

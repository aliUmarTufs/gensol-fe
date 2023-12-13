import React from 'react';
import { AppStyles, Colors, Images } from '../../../theme';
import SubProductsCard from '../../subProducts/SubProductsCard';
import { Col, Row } from 'antd';
import { css } from 'aphrodite';
import CommonHeading from '../../common/CommonHeading';
import './styles.scss';
import EmptyData from '../../common/EmptyData';

const { subProduct1, subProduct2, subProduct3 } = Images;

const temp = [
  { src: subProduct2, text: 'Neurocognitive Disorders!', id: 1 },
  { src: subProduct1, text: 'SOCIAL psychology!', id: 2 },
  { src: subProduct3, text: 'Schizophrenia Spectrum!', id: 3 }
];

const RelatedMedia = ({
  onDragCard,
  isCartView,
  courseArr,
  currentCourseID,
  mobile
}) => {
  let filteredCourse = _.filter(courseArr, function (item) {
    return currentCourseID != item?.id;
  });
  return (
    <div>
      <CommonHeading
        level={3}
        text={'Related Media'}
        color={Colors.theme2}
        className={css(AppStyles.mBottom15)}
      />
      <Row
        gutter={[16, 16]}
        className={`${
          isCartView ? 'listingcardsDetailRows iscartRelateView' : ''
        }`}
      >
        {filteredCourse?.length > 0 ? (
          filteredCourse.map((item) =>
            isCartView ? (
              <>
                <Col
                  lg={8}
                  md={12}
                  sm={24}
                  xs={24}
                  className={`lgWidth ${css(
                    AppStyles.justifyCenter,
                    AppStyles.flexBox
                  )}`}
                >
                  <SubProductsCard
                    detail={item}
                    key={Math.random()}
                    onDragCard={onDragCard}
                    mobile={mobile}
                  />
                </Col>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  xs={24}
                  className={`mdWidth ${css(
                    AppStyles.justifyCenter,
                    AppStyles.flexBox
                  )}`}
                >
                  <SubProductsCard
                    detail={item}
                    key={Math.random()}
                    onDragCard={onDragCard}
                    mobile={mobile}
                  />
                </Col>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  xs={24}
                  className={`md1Width ${css(
                    AppStyles.justifyCenter,
                    AppStyles.flexBox
                  )}`}
                >
                  <SubProductsCard
                    detail={item}
                    key={Math.random()}
                    onDragCard={onDragCard}
                    mobile={mobile}
                  />
                </Col>
                <Col
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className={`md2Width ${css(
                    AppStyles.justifyCenter,
                    AppStyles.flexBox
                  )}`}
                >
                  <SubProductsCard
                    detail={item}
                    key={Math.random()}
                    onDragCard={onDragCard}
                    mobile={mobile}
                  />
                </Col>
                <Col
                  lg={8}
                  md={12}
                  sm={24}
                  xs={24}
                  className={`md3Width ${css(
                    AppStyles.justifyCenter,
                    AppStyles.flexBox
                  )}`}
                >
                  <SubProductsCard
                    detail={item}
                    key={Math.random()}
                    onDragCard={onDragCard}
                    mobile={mobile}
                  />
                </Col>
              </>
            ) : (
              <Col
                lg={8}
                md={12}
                sm={24}
                xs={24}
                className={css(AppStyles.justifyCenter, AppStyles.flexBox)}
              >
                <SubProductsCard
                  detail={item}
                  key={Math.random()}
                  onDragCard={onDragCard}
                  mobile={mobile}
                />
              </Col>
            )
          )
        ) : (
          <EmptyData />
        )}
      </Row>
    </div>
  );
};

export default RelatedMedia;

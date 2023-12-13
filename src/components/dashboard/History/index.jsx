import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Col, Row, Space } from 'antd';
import { css } from 'aphrodite';
import { AppStyles, Colors } from '../../../theme';
import CommonHeading from '../../common/CommonHeading';
import CommonInputField from '../../common/CommonInput';
import CommonDivider from '../../common/CommonDivider';
import HistoryCard from '../HistoryCard';
import { THREE_ITEM_ROWS_2 } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersRequest } from '../../../redux/slicers/user';

const PurchaseHistory = () => {
  // STATES
  const [search, setSearch] = useState('');
  const [filteredItems, setfilteredItems] = useState([]);
  // CONST VALS
  const dispatch = useDispatch();
  const { data, orders } = useSelector((state) => state.user);

  // HOOKS
  useEffect(() => {
    dispatch(
      getOrdersRequest({
        query: `populate[orderItems][populate]=package.productLine&populate[orderItems][populate]=course.featuredImage1&populate=user&filters[user][id][$eqi]=${data?.user?.id}`
      })
    );
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      setfilteredItems(orders);
    }
  }, [orders]);

  useEffect(() => {
    if (search.length > 0) {
      setfilteredItems(
        orders.filter((item) =>
          item?.title?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setfilteredItems(orders);
    }
  }, [search]);

  return (
    <div className="history-wrapper">
      <Space
        className={`${css(
          AppStyles.spaceBetween,
          AppStyles.w100,
          AppStyles.alignItemsCenter
        )} search-content`}
      >
        <CommonHeading
          level={2}
          text={'purchased Courses'}
          color={Colors.theme}
          className={'bebas-family'}
          onClick={() => setShow(!show)}
        />
        <CommonInputField
          onChange={(e) => setSearch(e.target.value)}
          placeholder={'Search Courses'}
          className={'history-search'}
        />
      </Space>
      <CommonDivider />
      {filteredItems.length === 0 && (
        <div className="no-data">
          <CommonHeading
            textAlign={'center'}
            level={2}
            text={'No Data Found'}
            color={Colors.theme}
            className={'bebas-family'}
          />
        </div>
      )}
      <Row gutter={[20, 20]}>
        {filteredItems?.map((item, index) => (
          <Col {...THREE_ITEM_ROWS_2} key={index}>
            <HistoryCard content={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PurchaseHistory;

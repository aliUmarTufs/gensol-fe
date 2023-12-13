import {
  faArrowDown,
  faChevronDown,
  faCircleXmark,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { App, Col, Drawer, Dropdown, Input, Row, Select, Space } from 'antd';
import { css } from 'aphrodite';
import React, { useEffect, useState } from 'react';
import { header } from '../../constants';
import { AppStyles, Colors, Fonts, Images } from '../../theme';
import CommonButton from '../common/CommonButton';
import CommonHeading from '../common/CommonHeading';
import CommonTextField from '../common/TextField';
import './styles.scss';
import { useDispatch } from 'react-redux';
import {
  getAssessmentsRequest,
  getDiagnosisRequest,
  getTopicsRequest
} from '../../redux/slicers/product';
const FilterProducts = ({
  open,
  handleClose = () => {},
  handleSearchChange,
  filter,
  setfilter
}) => {
  const dispatch = useDispatch();
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [item3, setItem3] = useState([]);

  const diagnosis = item1?.map((t) => ({
    value: t?.attributes?.name,
    label: (
      <a
        onClick={() => {
          handleFilter({
            key: `${t.attributes.name} ${t?.id}`,
            value: 'diagnosis',
            id: `${t?.id}`
          });
        }}
      >
        {`${t?.attributes?.name}`}
      </a>
    ),
    key: `${t.attributes.name} ${t?.id}`
  }));

  const assessments = item2?.map((t) => ({
    value: t?.attributes?.name,
    label: (
      <a
        onClick={() => {
          handleFilter({
            key: `${t.attributes.name} ${t?.id}`,
            value: 'assessments',
            id: `${t?.id}`
          });
        }}
      >
        {`${t?.attributes?.name}`}
      </a>
    ),
    key: `${t.attributes.name} ${t?.id}`
  }));

  const topics = item3?.map((t) => ({
    value: t?.attributes?.name,
    label: (
      <a
        onClick={() => {
          handleFilter({
            key: `${t.attributes.name} ${t?.id}`,
            value: 'topics',
            id: `${t?.id}`
          });
        }}
      >
        {`${t?.attributes?.name}`}
      </a>
    ),
    key: `${t.attributes.name} ${t?.id}`
  }));

  useEffect(() => {
    dispatch(
      getDiagnosisRequest({
        payloadData: {},
        responseCallback: (res) => {
          if (res.status) {
            setItem1(res.data.data);
          }
        }
      })
    );

    dispatch(
      getAssessmentsRequest({
        payloadData: {},
        responseCallback: (res) => {
          if (res.status) {
            setItem2(res.data.data);
          }
        }
      })
    );

    dispatch(
      getTopicsRequest({
        payloadData: {},
        responseCallback: (res) => {
          if (res.status) {
            setItem3(res.data.data);
          }
        }
      })
    );
  }, []);

  const handleFilter = (val) => {
    setfilter([...filter, val]);
  };

  const handleDelete = (indx) => {
    let clone = [...filter];
    clone.splice(indx, 1);
    setfilter(clone);
  };
  return (
    <div>
      <Row className={css(AppStyles.justifyEnd)} gutter={[6, 12]}>
        <Col
          xl={{ span: 4 }}
          lg={{ span: 4 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
        >
          <Dropdown
            menu={{
              items: diagnosis
            }}
            trigger={['click']}
          >
            <Space
              className={`${css(AppStyles.padding15)} menuItem`}
              align="center"
            >
              Diagnosis
              <FontAwesomeIcon
                className={css(AppStyles.pointer)}
                icon={faChevronDown}
              />
            </Space>
          </Dropdown>
        </Col>
        <Col
          xl={{ span: 4 }}
          lg={{ span: 4 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
        >
          <Dropdown
            menu={{
              items: assessments
            }}
            trigger={['click']}
          >
            <Space
              className={`${css(AppStyles.padding15)} menuItem`}
              align="center"
            >
              Assessment
              <FontAwesomeIcon
                className={css(AppStyles.pointer)}
                icon={faChevronDown}
              />
            </Space>
          </Dropdown>
        </Col>
        <Col
          xl={{ span: 4 }}
          lg={{ span: 4 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
        >
          <Dropdown
            menu={{
              items: topics
            }}
            trigger={['click']}
          >
            <Space
              className={`${css(AppStyles.padding15)} menuItem`}
              align="center"
            >
              Topic
              <FontAwesomeIcon
                className={css(AppStyles.pointer)}
                icon={faChevronDown}
              />
            </Space>
          </Dropdown>
        </Col>
        <Col
          xl={{ span: 7 }}
          lg={{ span: 7 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
        >
          <Input
            placeholder="Search Module"
            size="large"
            onChange={handleSearchChange}
            suffix={
              <FontAwesomeIcon
                className={css(AppStyles.pointer)}
                icon={faSearch}
              />
            }
            className={`${css(AppStyles.fullWidth)} inputWrapper`}
          />
        </Col>

        {/* </div> */}
        <Col
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          {filter?.length > 0 && (
            <CommonTextField
              text={'Filter:'}
              fontSize={20}
              color={Colors.black}
              fontWeight={'600'}
            />
          )}
          <div className="filtersItemsWrapper">
            {filter?.map((item, indx) => (
              <div className={'filtersItems'}>
                {diagnosis?.find((items) => item.key === items.key)?.value ||
                  assessments?.find((items) => item.key === items.key)?.value ||
                  topics?.find((items) => item.key === items.key)?.value}
                <img
                  src={Images.CrossIcon}
                  className="iconWrapper"
                  onClick={() => handleDelete(indx)}
                />
                {/* <FontAwesomeIcon
                color={Colors.theme}
                size={'lg'}
                className={`${css(AppStyles.pointer)} iconWrapper`}
                icon={faCircleXmark}
              /> */}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default FilterProducts;

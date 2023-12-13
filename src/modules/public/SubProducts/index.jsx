import React, { useEffect, useRef, useState } from 'react';
import { HeadingBar, Loader, SubProductsCard } from '../../../components';
import { AppStyles, Colors, Images } from '../../../theme';
import { Col, Input, Row, Space } from 'antd';
import { css } from 'aphrodite';
import {
  ALERT_TYPES,
  FULL_ROW,
  PAYMENT_STEPS,
  PAYMENT_STEPS_EDU,
  PRODUCT,
  lOGIN_ROUTE
} from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import CommonHeading from '../../../components/common/CommonHeading';
import { useNavigate, useParams } from 'react-router-dom';
import CommonButton from '../../../components/common/CommonButton';
import CommonTextField from '../../../components/common/TextField';
import { getSubProductRequest } from '../../../redux/slicers/product';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, set } from 'lodash';
import EmptyData from '../../../components/common/EmptyData';
import PackageCard from '../../../components/addToCart/PackageCard';
import CartProductCard from '../../../components/addToCart/ProductCard';
import { addToCart } from '../../../redux/slicers/user';
import { BASE_URL } from '../../../config/webService';
import { sum, toastAlert } from '../../../services/utils';
import './styles.scss';

const SubProducts = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const div1Ref = useRef(null);

  console.log({ categoryName });

  const windowHeight = window.innerHeight;
  const [visibleDiv, setVisibleDiv] = useState(false);
  const [topPosition, setTopPosition] = useState('30%');
  const [isCartView, setisCartView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempProduct, settempProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const { cartData, isAuthenticated, role } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const navigateCheckoutHandler = () => {
    const isTeacher = role === 'teacher';
    if (!isAuthenticated) {
      toastAlert('Please login first', ALERT_TYPES.error);
      navigate(
        `${lOGIN_ROUTE}?redirect=${
          isTeacher ? PAYMENT_STEPS_EDU : PAYMENT_STEPS
        }`
      );
      return;
    }
    if (isTeacher) {
      navigate(PAYMENT_STEPS_EDU);
      return;
    }
    navigate(PAYMENT_STEPS);
  };

  const handleScroll = () => {
    const isInView = isScrolledIntoView(
      document.getElementById('listingcards')
    );
    setVisibleDiv(isInView);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getSubProductRequest({
        payloadData: {},
        param: categoryName,
        // query: `populate=*`,
        query: `populate=*&filters[categories][name][$eqi]=${categoryName}`,
        responseCallback: (res) => {
          setLoading(false);
          if (res.status) {
            setProduct(res.data.data);
          }
        }
      })
    );
  }, []);

  const isScrolledIntoView = (elem) => {
    if (!elem) return false;

    const rect = elem.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return !(rect.bottom < 0 || rect.top - windowHeight >= 0);
  };

  const ondragCard = (data, bool = false) => {
    settempProduct(data);
  };

  const addToCartList = () => {
    const cart = [
      {
        id: tempProduct?.id,
        title: tempProduct?.attributes.title,
        description: tempProduct?.attributes.shortDescription,
        price: tempProduct?.attributes.price,
        type: 'course',
        src: tempProduct?.attributes?.featuredImage1?.data?.attributes?.url
      }
    ];

    dispatch(addToCart(cart));
  };

  const mobile = (data) => {
    const cart = [
      {
        id: data?.id,
        title: data?.attributes.title,
        description: data?.attributes.shortDescription,
        price: data?.attributes.price,
        type: 'course',
        src: data?.attributes?.featuredImage1?.data?.attributes?.url
      }
    ];

    dispatch(addToCart(cart));
  };

  const debouncedSearch = debounce((term) => {
    setLoading(true);
    dispatch(
      getSubProductRequest({
        payloadData: {},
        query: `populate=*&filters[categories][name][$eqi]=${categoryName}&filters[title][$containsi]=${term}`,
        responseCallback: (res) => {
          setLoading(false);
          if (res.status) {
            setProduct(res.data.data);
          }
        }
      })
    );
  }, 500);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    debouncedSearch(term); // This will trigger the debounced function after 500 milliseconds
  };

  return (
    <>
      <div ref={div1Ref}>
        {visibleDiv && (
          <>
            {isCartView && (
              <div
                className="dropperCart"
                onDrop={addToCartList}
                onDragOver={(event) => onDragOver(event)}
              >
                <CommonHeading
                  text={'Add to Cart'}
                  className={'addtoCartHead'}
                  color={Colors.theme}
                />
                <CommonTextField
                  text={
                    'Select your desired products and effortlessly add them to your cart'
                  }
                  className={'borderBottom'}
                />
                <div className="cartItemWrapper">
                  <Row gutter={[0, 8]}>
                    {cartData?.length < 1 && (
                      <Col>
                        <CommonHeading
                          text={'Cart is empty'}
                          lineHeight={1}
                          fontSize={'x-large'}
                        />
                      </Col>
                    )}
                    {cartData?.map((t, index) =>
                      t.type === 'package' ? (
                        <PackageCard
                          details={t}
                          index={index}
                          colored
                          key={index}
                        />
                      ) : (
                        <CartProductCard
                          colored
                          key={index}
                          details={t}
                          index={index}
                        />
                      )
                    )}
                  </Row>
                  <div className={css(AppStyles.marginVerticalBase)}>
                    {cartData.length > 0 && (
                      <Row justify={'end'} gutter={[0, 16]}>
                        <Col {...FULL_ROW} className="borderTop">
                          <div
                            className={`cartTotal ${css(
                              AppStyles.flexBox,
                              AppStyles.spaceBetween
                            )}`}
                          >
                            <CommonTextField
                              text={'Total'}
                              fontSize={'large'}
                              lineHeight={1.5}
                              className={'cart-card-text'}
                            />
                            <CommonTextField
                              text={`$${sum(cartData)}`}
                              fontSize={'large'}
                              lineHeight={1.5}
                              className={'cart-card-text'}
                            />
                          </div>
                        </Col>
                        <Col>
                          <CommonButton
                            text={'Checkout'}
                            onClick={navigateCheckoutHandler}
                          />
                        </Col>
                      </Row>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div
              style={{
                position: 'fixed',
                right: '-59px',
                zIndex: 1,
                rotate: '-90deg',
                top: topPosition,
                transform: 'translateY(-50%)'
              }}
              onClick={() => {
                setisCartView(!isCartView);
              }}
              className="viewCartWrapper"
            >
              <img
                src={Images.ArrowUp}
                style={
                  isCartView
                    ? {
                        rotate: '-90deg'
                      }
                    : {}
                }
              />
              <CommonHeading
                text={'View Cart'}
                color={Colors.theme}
                lineHeight={1}
                className={'viewCartBtnWrapper'}
              />
            </div>
          </>
        )}
      </div>
      <HeadingBar text={'Products'} />
      <div className="subproduct-container">
        <Space
          wrap={true}
          className={`sub-pr-head ${css(
            AppStyles.spaceBetween,
            AppStyles.w100,
            AppStyles.mBottom20
          )}`}
        >
          <Space className="sub-pr-title-wrap">
            <CommonButton
              classname={'border'}
              onClick={() => {
                // navigate(PRODUCT);
                navigate(-1);
              }}
              border={`1px solid ${Colors.theme}`}
              background={Colors.themeLight}
              text={
                <Space>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <CommonTextField
                    text={'back'}
                    color={Colors.theme2}
                    fontWeight={600}
                  />
                </Space>
              }
              width={'100px'}
            />
            <CommonHeading
              level={3}
              text={categoryName}
              color={Colors.theme2}
              className={'sub-pr-title'}
            />
          </Space>
          <Input
            onChange={handleSearchChange}
            placeholder="Search Module"
            size="large"
            suffix={
              <FontAwesomeIcon
                className={css(AppStyles.pointer)}
                icon={faSearch}
              />
            }
            className={`${css(AppStyles.fullWidth)} inputWrapper`}
          />
        </Space>
        <Row
          gutter={[30, 20]}
          id="listingcards"
          className={`listingcardsRows ${
            isCartView ? 'iscartView' : ''
          } iscartViewNo`}
        >
          {loading ? (
            <Loader />
          ) : product?.length > 0 ? (
            product?.map((t, index) =>
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
                      detail={t}
                      key={Math.random()}
                      onDragCard={ondragCard}
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
                      detail={t}
                      key={Math.random()}
                      onDragCard={ondragCard}
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
                      detail={t}
                      key={Math.random()}
                      onDragCard={ondragCard}
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
                      detail={t}
                      key={Math.random()}
                      onDragCard={ondragCard}
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
                      detail={t}
                      key={Math.random()}
                      onDragCard={ondragCard}
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
                    detail={t}
                    key={Math.random()}
                    onDragCard={ondragCard}
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
    </>
  );
};

export default SubProducts;

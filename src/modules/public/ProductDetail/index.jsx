import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import {
  HeadingBar,
  ProductCard,
  ProductDetailCard,
  RelatedMedia
} from '../../../components';
import { AppStyles, Colors, Images } from '../../../theme';
import { Col, Row, Space } from 'antd';
import Card from '../../../components/subProducts/SubProductsCard';
import SubProductsCard from '../../../components/subProducts/SubProductsCard';
import { css } from 'aphrodite';
import CommonButton from '../../../components/common/CommonButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CommonTextField from '../../../components/common/TextField';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ALERT_TYPES,
  FULL_ROW,
  PAYMENT_STEPS,
  PAYMENT_STEPS_EDU,
  SUB_PRODUCT,
  lOGIN_ROUTE
} from '../../../constants';
import CommonVideoPreview from '../../../components/CommonVideo';
import $ from 'jquery';
import CommonHeading from '../../../components/common/CommonHeading';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductDetailRequest,
  getRelatedMediaRequest
} from '../../../redux/slicers/product';
import {
  courseCatQueryManipulator,
  sum,
  toastAlert
} from '../../../services/utils';
import { BASE_URL } from '../../../config/webService';
import { addToCart } from '../../../redux/slicers/user';
import CartProductCard from '../../../components/addToCart/ProductCard';
import PackageCard from '../../../components/addToCart/PackageCard';

const { subProduct1, subProduct2, subProduct3 } = Images;

const temp = [
  { src: subProduct2, text: 'Neurocognitive Disorders!', id: 1 },
  { src: subProduct1, text: 'SOCIAL psychology!', id: 2 },
  { src: subProduct3, text: 'Schizophrenia Spectrum!', id: 3 },
  {
    id: 4,
    text: 'AVOIDANT Personality disorders',
    src: Images.subProduct1
  }
];

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const params = useParams();

  const { productDetail, selectedProductName } = useSelector(
    (state) => state.product
  );

  const div1Ref = useRef(null);
  const listing = useRef(null);

  const windowHeight = window.innerHeight;
  const [visibleDiv, setVisibleDiv] = useState(false);
  const [topPosition, setTopPosition] = useState('20%');
  const [isCartView, setisCartView] = useState(false);
  const [tempDragCard, settempDragCard] = useState(null);
  const [cartList, setcartList] = useState([]);
  const [categoryIDS, setCategoryIDS] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [detail, setDetail] = useState(false);
  const [tempProduct, settempProduct] = useState(null);
  const { cartData, isAuthenticated, role } = useSelector(
    (state) => state.user
  );

  const onDragOver = (event) => {
    event.preventDefault();
  };
  const handleScroll = () => {
    const isInView = isScrolledIntoView(
      document.getElementById('prodDetailId')
    );
    setVisibleDiv(isInView);
  };

  useEffect(() => {
    dispatch(
      getProductDetailRequest({
        param: id,
        query: `populate=*`,
        responseCallback: (resp) => {
          const catIDS = resp?.data?.data?.attributes?.categories?.data;
          setCategoryIDS(catIDS);
        }
      })
    );
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (categoryIDS) {
      dispatch(
        getRelatedMediaRequest({
          query: `${courseCatQueryManipulator(categoryIDS)}&populate=*`,
          responseCallback: (resp) => {
            let courseList = resp?.data?.data;
            setFilteredCourses(courseList);
          }
        })
      );
    }
  }, [categoryIDS]);

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

  const isScrolledIntoView = (elem) => {
    if (!elem) return false;

    const rect = elem.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return !(rect.bottom < 0 || rect.top - windowHeight >= 0);
  };

  const ondragCard = (data, bool = false) => {
    settempProduct(data);
    if (bool) {
      setDetail(true);
    }
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

  const addToCartListdetail = () => {
    const cart = [
      {
        id: productDetail.id,
        title: productDetail.title,
        description: productDetail.shortDescription,
        price: productDetail?.price,
        type: 'course',
        src: productDetail?.image
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

  const ProdDetail = {
    ...(params?.id
      ? {
          ...temp[params?.id - 1]
        }
      : {
          id: 9,
          text: 'AVOIDANT Personality disorders',
          src: Images.subProduct1
        })
  };

  const removeFromCart = (id) => {
    let clone = cartList.slice(0);
    clone.splice(id, 1);

    setcartList(clone);
  };

  return (
    <>
      {/* Add to cart view starts */}
      <div ref={div1Ref}>
        {visibleDiv && (
          <>
            {isCartView && (
              <div
                className="dropperCart"
                onDrop={detail ? addToCartListdetail : addToCartList}
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
      {/* Add to cart view ends */}

      <HeadingBar text={'details'} />

      <div className="productDetail-container" id="prodDetailId">
        <CommonButton
          classname={'border'}
          onClick={() => {
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
        <ProductDetailCard
          onDragCard={ondragCard}
          isCartView={isCartView}
          ProdDetail={ProdDetail}
          productDetail={productDetail}
          addToCartListdetail={addToCartListdetail}
          // cartProduct={tempProduct}
        />
        <RelatedMedia
          courseArr={filteredCourses}
          currentCourseID={id}
          onDragCard={ondragCard}
          removeFromCart={removeFromCart}
          isCartView={isCartView}
          mobile={mobile}
        />
      </div>
    </>
  );
};

export default ProductDetail;

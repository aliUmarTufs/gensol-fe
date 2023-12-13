import React, { useEffect, useState } from 'react';
import './styles.scss';
import { HeadingBar, Loader, SubProductsCard } from '../../../components';
import { AppStyles, Colors, Images } from '../../../theme';
import { Col, Form, Input, Row, Space, theme } from 'antd';
import { css } from 'aphrodite';
import {
  ALERT_TYPES,
  FULL_ROW,
  HALF_ROW_FULL_WIDTH_XS,
  PAYMENT_STEPS,
  PAYMENT_STEPS_EDU,
  PRODUCT,
  THREE_ITEM_ROWS_2,
  TWO_HALF_ROW,
  TWO_HALF_THIRD_ROW,
  TWO_THIRD_ITEMS_ROW,
  TWO_THIRD_ROW,
  lOGIN_ROUTE,
  numberMinMaxValidatorField
} from '../../../constants';
import CommonHeading from '../../../components/common/CommonHeading';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../../components/common/CommonButton';
import CommonTextField from '../../../components/common/TextField';
import CommonSelect from '../../../components/common/CommonSelect';
import CommonInputField from '../../../components/common/CommonInput';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPackages } from '../../../redux/slicers/product';
import { addToCart } from '../../../redux/slicers/user';
import { sum, toastAlert } from '../../../services/utils';
import PackageCard from '../../../components/addToCart/PackageCard';
import CartProductCard from '../../../components/addToCart/ProductCard';
import ProductLineModal from './modal';

const ProductLines = () => {
  const [form1] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartData, isAuthenticated, role } = useSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(false);
  const [selectedStudents, setStudents] = useState(0);
  const [currenttab, setcurrenttab] = useState('Asynchronous Simulations');
  const [calculator, setCalculator] = useState({
    price: 0,
    duration: 'Monthly'
  });
  const [productPackage, setProductPackage] = useState([]);
  const [isFavorite, setIsFavourite] = useState(false);

  const handleFormChange = (changedValues, allValues) => {
    setCalculator({
      price:
        allValues?.duration === 'Monthly'
          ? allValues?.student * 9.9
          : allValues?.student * 40,
      duration: allValues?.duration
    });
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

  useEffect(() => {
    setLoading(true);
    dispatch(
      getProductPackages({
        payloadData: {},
        query: `populate=packages`,
        responseCallback: (res) => {
          setLoading(false);
          if (res.status) {
            setProductPackage(res.data.data);
          }
        }
      })
    );
  }, []);

  if (loading) {
    return <Loader />;
  }
  const filter = () => {
    const select = productPackage?.filter(
      (d) => d?.attributes?.title === currenttab
    )[0];
    return select?.attributes?.packages.data;
  };

  const handelCart = (id, data) => {
    const cart = [
      {
        id: id,
        title: currenttab,
        packageName: data?.title,
        price: data?.yearly,
        type: 'package'
      }
    ];

    dispatch(addToCart(cart));
  };

  const handleFinish = () => {
    form1.validateFields().then((values) => {
      setStudents(values.student);
      setIsFavourite(true);
    });
  };

  return (
    <>
      <HeadingBar text={'Product Lines'} />
      <div className="productLinesWrapper">
        <div className="subproduct-container">
          <div className="prodlineMenu">
            {productPackage?.map((t) => (
              <CommonHeading
                text={t?.attributes?.title}
                className={`menuHeading ${
                  currenttab === t?.attributes?.title ? 'menuHeadingActive' : ''
                }`}
                onClick={() => {
                  setcurrenttab(t?.attributes?.title);
                }}
                color={Colors.theme}
              />
            ))}
          </div>
          <div className="subproduct-container">
            <CommonTextField
              textAlign={'center'}
              className={'paraText'}
              lineHeight={2}
              text={`Our Asynchronous Simulations integrate seamlessly with existing courses, enabling students to access a database of multimedia case studies and interactive assessments. Alternatively, students can access our on-demand site to study independently, learning new skills and reinforcing their knowledge at their own pace Our Interactive Assessments & Teaching Guides provide students with engaging, hands-on opportunities to develop their cognitive empathy and clinical assessment skills.`}
            />
          </div>
          <div className={css(AppStyles.textAlignCenter, AppStyles.mBottom20)}>
            <CommonButton
              onClick={() => navigate(PRODUCT)}
              width={'200px'}
              text={'See More'}
            />
          </div>
          <Row gutter={[16, 16]}>
            <Col className="order" {...THREE_ITEM_ROWS_2}>
              <div className="prodlineCards">
                <div className="prodlineCardWrapper">
                  <CommonHeading
                    text={'Total up Packages Price'}
                    className={'menuHeading'}
                    color={Colors.theme}
                  />

                  <div className="packagewrappper">
                    <Row gutter={[0, 10]}>
                      {cartData?.length < 1 && (
                        <Col style={{ paddingTop: 40 }}>
                          <CommonHeading
                            text={'Cart is empty'}
                            lineHeight={1}
                            fontSize={'x-large'}
                          />
                        </Col>
                      )}
                      {cartData?.map((t) =>
                        t.type === 'package' ? (
                          <PackageCard details={t} />
                        ) : (
                          <CartProductCard details={t} />
                        )
                      )}
                    </Row>

                    <Row>
                      <Col {...FULL_ROW}>
                        {cartData.length > 0 && (
                          <div className="topBorder">
                            <Row>
                              <Col {...TWO_THIRD_ROW}>
                                <CommonTextField
                                  fontWeight={'bold'}
                                  fontSize={'large'}
                                  text={`Total:`}
                                />
                              </Col>
                              <Col {...TWO_HALF_THIRD_ROW}>
                                <div className="totalpriceWrapper">
                                  <CommonTextField
                                    color={Colors.theme}
                                    fontWeight={'bold'}
                                    fontSize={'large'}
                                    text={`$${sum(cartData)}`}
                                  />
                                  <CommonButton
                                    classname={css(AppStyles.mTop15)}
                                    onClick={navigateCheckoutHandler}
                                    text={'Checkout'}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="package" {...TWO_THIRD_ITEMS_ROW}>
              <div className="prodlineCards">
                <CommonHeading
                  text={currenttab}
                  paddingLeft={'5px'}
                  lineHeight={1.5}
                  fontSize={'xxx-large'}
                  className={'menuHeading '}
                  color={Colors.theme}
                />
                <Row gutter={[8, 16]}>
                  {filter()?.map((d) => (
                    <Col {...TWO_HALF_ROW}>
                      <div className="prodlineSubCardWrapper">
                        <div className="subscrip_headpackage">
                          <CommonTextField
                            text={d.attributes.title}
                            // className={'menuHeading'}
                          />
                          <div
                            className={`priceWrapper subscriptionItem ${css(
                              AppStyles.justifyStart
                            )}`}
                          >
                            <CommonTextField
                              // textAlign={'center'}
                              // className={'paraText'}
                              lineHeight={2}
                              color={Colors.theme}
                              fontWeight={'bold'}
                              fontSize={'large'}
                              text={`$${d.attributes.yearly}`}
                            />
                            <CommonTextField
                              // textAlign={'center'}
                              // lineHeight={2}
                              paddingLeft={'5px'}
                              // color={Colors.theme}
                              paddingTop={'5px'}
                              text={`Yearly`}
                            />
                          </div>
                        </div>
                        <div className="subscrip_package">
                          <ul>
                            <li>{d.attributes.numberOfStudents} Students</li>
                            <li>
                              ${d.attributes.perStudentMonthlyPrice} Per student
                            </li>
                            <li>Readable content of a page</li>
                            <li>Web sites still in their infancy</li>
                            <li>Readable content of a page</li>
                            <li>Web sites still in their infancy</li>
                          </ul>
                          <CommonButton
                            text={'Add to Cart'}
                            onClick={() => handelCart(d.id, d.attributes)}
                          />
                        </div>
                      </div>
                    </Col>
                  ))}

                  <Col {...FULL_ROW}>
                    <div className="prodlineCardWrapper">
                      <div className="customPackage bottomBorder subscriptionItem">
                        <div>
                          <CommonTextField
                            text={'Custom Package'}
                            // className={'menuHeading'}
                          />
                          <div
                            className={`priceWrapper ${css(
                              AppStyles.justifyStart
                            )}`}
                          >
                            <CommonTextField
                              // textAlign={'center'}
                              // className={'paraText'}
                              lineHeight={2}
                              color={Colors.theme}
                              fontWeight={'bold'}
                              fontSize={'large'}
                              text={`$${calculator?.price.toFixed(2)}`}
                            />
                            <CommonTextField
                              // textAlign={'center'}
                              // lineHeight={2}
                              paddingLeft={'5px'}
                              // color={Colors.theme}
                              paddingTop={'5px'}
                              text={calculator?.duration}
                            />
                          </div>
                        </div>
                        <CommonButton
                          text={'Get a quote'}
                          onClick={handleFinish}
                        />
                      </div>
                      <Form
                        form={form1}
                        initialValues={{
                          student: null,
                          duration: calculator?.duration
                        }}
                        onValuesChange={handleFormChange}
                      >
                        <Row gutter={[16, 16]}>
                          <Col {...HALF_ROW_FULL_WIDTH_XS}>
                            <CommonSelect
                              name={'duration'}
                              options={[
                                { value: 'Monthly', label: 'Monthly' },
                                { value: 'Yearly', label: 'Yearly' }
                              ]}
                            />
                          </Col>
                          <Col {...HALF_ROW_FULL_WIDTH_XS}>
                            <CommonInputField
                              rules={[
                                {
                                  validator: (_, value) => {
                                    return numberMinMaxValidatorField(_, value);
                                  }
                                }
                              ]}
                              type={'number'}
                              name={'student'}
                              placeholder={'No. of student'}
                            />
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <ProductLineModal
        productLine={currenttab}
        students={selectedStudents}
        isFavorite={isFavorite}
        setIsFavourite={setIsFavourite}
        calculator={calculator}
        form1={form1}
        setCalculator={setCalculator}
      />
    </>
  );
};

export default ProductLines;

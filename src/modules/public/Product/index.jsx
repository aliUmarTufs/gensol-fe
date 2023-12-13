import React, { useEffect, useState } from 'react';
import './styles.scss';
import { HeadingBar, Loader, ProductCard } from '../../../components';
import { AppStyles, Images } from '../../../theme';
import { Space } from 'antd';
import FilterProducts from '../../../components/FilterProducts';
import CommonButton from '../../../components/common/CommonButton';
import { css } from 'aphrodite';
import { getProductRequest } from '../../../redux/slicers/product';
import { useDispatch } from 'react-redux';
import EmptyData from '../../../components/common/EmptyData';
import { debounce } from 'lodash';
import CommonSkeleton from '../../../components/common/CommonSkeleton';

const { product1, product2, product3 } = Images;

const temp = [
  { src: product3, text: 'Neurocognitive Disorders!' },
  { src: product2, text: 'SOCIAL psychology!' },
  { src: product1, text: 'Schizophrenia Spectrum!' }
];

const Product = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  // const [skeleton, setSkeleton] = useState(false);
  const [filter, setfilter] = useState([]);

  useEffect(() => {
    setLoading(true);

    const query = filter
      ?.map((t) => {
        const id = t.key.split(' ');
        return `filters[${t.value}][id][$in]=${t.id}`;
      })
      .join('&');

    dispatch(
      getProductRequest({
        payloadData: {},
        query: `populate=*&${query}`,
        responseCallback: (res) => {
          setLoading(false);
          if (res.status) {
            setProduct(res.data.data);
          }
        }
      })
    );
  }, [filter]);

  const debouncedSearch = debounce((term) => {
    setLoading(true);

    const query = filter
      ?.map((t) => {
        const id = t.key.split(' ');
        return `filters[${t.value}][id][$in]=${t.id}`;
      })
      .join('&');

    dispatch(
      getProductRequest({
        payloadData: {},
        query: `populate=*&filters[name][$containsi]=${term}&${query}`,
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

  console.log({ filter });
  return (
    <>
      <HeadingBar text={'Categories'} />
      <div className="product-container">
        <FilterProducts
          filter={filter}
          setfilter={setfilter}
          handleSearchChange={handleSearchChange}
        />
        <div>
          {loading ? (
            <Loader />
          ) : product?.length > 0 ? (
            product?.map((t) => (
              <ProductCard detail={t?.attributes} key={Math.random()} />
            ))
          ) : (
            <EmptyData />
          )}
        </div>
        <CommonButton
          topClass={css(AppStyles.textAlignCenter, AppStyles.mTop30)}
          text={'Load More'}
          width={'150px'}
        />
      </div>
    </>
  );
};

export default Product;

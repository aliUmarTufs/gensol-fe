import { BASE_URL } from '../config/webService';
import { DATE_FORMAT } from '../constants';
import { getFormattedDateTime } from '../services/utils';

const manipulateCourseData = (data) => {
  const atributes = data?.attributes;
  let course = {};
  course['title'] = atributes?.title ?? '';
  course['amount'] = atributes?.price?.toFixed(2) ?? '';
  course['duration'] = atributes?.durationMilisecond ?? '';
  course['thumbnail'] = atributes?.featuredImage1?.data?.attributes?.url ?? '';
  course['isCource'] = true;

  return course;
};

const manipulatePackageData = (data) => {
  const atributes = data?.attributes;
  let packagedata = {};

  packagedata['title'] = `${atributes?.title ?? ''} (${
    atributes?.productLine?.data?.attributes?.title ?? ''
  })`;
  packagedata['packageType'] = atributes?.packageType ?? '';
  packagedata['amount'] = atributes?.yearly?.toFixed(2) ?? '';
  packagedata['isCource'] = false;

  return packagedata;
};

const manipulateOrderData = (data, date) => {
  let order = {};
  if (data?.course?.data) {
    order = { ...manipulateCourseData(data?.course?.data) };
  } else {
    order = { ...manipulatePackageData(data?.package?.data) };
  }
  order['id'] = data?.id ?? null;
  order['createdAt'] = getFormattedDateTime(date, DATE_FORMAT);

  return order;
};

export const manipulateOrderProducts = (data) => {
  let products = [];
  data?.attributes?.orderItems?.forEach((item) => {
    products.push(manipulateOrderData(item, data?.attributes?.createdAt));
  });

  return products;
};
export const manipulateOrdersList = ({ data }) => {
  let orders = [];
  data?.forEach((item) => {
    orders.push(...manipulateOrderProducts(item));
  });

  return orders;
};

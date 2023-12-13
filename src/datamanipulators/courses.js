import { BASE_URL } from '../config/webService';

export const manipulateCourseData = (data) => {
  if (_.isEmpty(data)) return {};
  let course = {};
  let courseData = data?.attributes;
  course['id'] = data?.id ?? null;
  course['title'] = courseData?.title ?? '';
  course['description'] = courseData?.longDescription ?? '';
  course['video'] = courseData?.video?.data?.attributes?.url
    ? courseData?.video?.data?.attributes?.url
    : '';
  course['trailer'] = courseData?.trailer?.data?.attributes?.url
    ? courseData?.trailer?.data?.attributes?.url
    : '';
  course['image'] = courseData?.featuredImage2?.data?.attributes?.url
    ? courseData?.featuredImage2?.data?.attributes?.url
    : '';

  course['learningObjectives'] = courseData?.learning_objectives ?? [];
  course['shortDescription'] = courseData?.shortDescription ?? '';
  course['price'] = courseData?.price ?? 0;

  return course;
};

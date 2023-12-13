import React from 'react';
import './styles.scss';
import { Skeleton } from 'antd';

const CommonSkeleton = ({ className }) => {
  return (
    <div className={className ? className : 'skeletonParent'}>
      <Skeleton active className="skeleton" />
      <Skeleton active className="skeleton" />
    </div>
  );
};

export default CommonSkeleton;

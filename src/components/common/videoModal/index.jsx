import React from 'react';

import { Modal, Space } from 'antd';
import './styles.scss';
import CommonTextField from '../TextField';
import CommonButton from '../CommonButton';

const CommonVideoModal = ({
  setIsModalVisible,
  isModalVisible,
  children,
  width,
  title,
  discription,
  onConfirm,
  loading,
  className,
  destroyOnClose
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Modal
        destroyOnClose={true}
        className={'video-modal'}
        footer={null}
        width={width}
        title={title}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        {children}
      </Modal>
    </div>
  );
};

export default CommonVideoModal;

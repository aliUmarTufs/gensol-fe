import React, { useEffect } from 'react';

import { Modal, Space } from 'antd';
import './styles.scss';
import CommonTextField from '../TextField';
import CommonButton from '../CommonButton';

const CommonModal = ({
  setIsModalVisible,
  isModalVisible,
  children,
  width,
  title,
  discription,
  onConfirm,
  loading,
  className = '',
  destroyOnClose
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalVisible]);

  return (
    <div>
      <Modal
        destroyOnClose={destroyOnClose}
        className={`common-modal ${
          discription && 'confirmation-modal'
        } ${className}`}
        footer={null}
        width={width}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        {discription ? (
          <Space size={20} direction="vertical" className="confirm-content">
            <CommonTextField text={discription} textAlign={'center'} />
            <CommonButton
              text={'Confirm'}
              onClick={onConfirm}
              loading={loading}
            />
            <CommonButton
              text={'Not Now'}
              onClick={handleOk}
              background="none"
              border={'1px solid #ffff'}
              topClass={'not-now'}
            />
          </Space>
        ) : (
          children
        )}
      </Modal>
    </div>
  );
};

export default CommonModal;

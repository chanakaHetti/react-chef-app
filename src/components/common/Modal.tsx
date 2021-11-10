import * as React from "react";

import { Modal } from 'react-bootstrap';
// import './Modal.css';

type CommonModalProps = {
  title: string,
  children: JSX.Element,
  size?: "sm" | "lg" | "xl" | undefined
  className: string,
  closeModal: () => void
};

export const CommonModal = (
  {
    title,
    children,
    size,
    className,
    closeModal
  }: CommonModalProps
): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  return (
    <Modal
      dialogClassName={className}
      show={isModalOpen}
      onHide={closeModal}
      size={size}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

import React, { useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  position?: 
    | 'center'
    | 'left-center'
    | 'left-top'
    | 'left-bottom'
    | 'center-top'
    | 'center-bottom'
    | 'right-center'
    | 'right-top'
    | 'right-bottom';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, position = 'center' }) => {


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }
    return () => {
      document.body.style.overflow = 'unset'; 
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${
        positionClasses[position]
      } ${isOpen ? styles.overlayVisible : styles.overlayHidden}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.content} ${isOpen ? styles.contentVisible : styles.contentHidden}`}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


const styles = {
    overlay: `fixed inset-0 z-50 flex bg-black bg-opacity-50 transition-opacity`,
    overlayVisible: `opacity-100 pointer-events-auto`,
    overlayHidden: `opacity-0 pointer-events-none`,
    content: `modal-content bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md transform transition-all`,
    contentVisible: `scale-100`,
    contentHidden: `scale-95`,
    header: `modal-header mb-4 flex justify-between items-center`,
    title: `text-xl font-semibold`,
    closeButton: `text-gray-500 hover:text-gray-800`,
    body: `modal-body mb-4`,
    footer: `modal-footer flex justify-end`,
  };

  const positionClasses = {
    center: `justify-center items-center`,
    'left-center': `justify-start items-center`,
    'left-top': `justify-start items-start`,
    'left-bottom': `justify-start items-end`,
    'center-top': `justify-center items-start`,
    'center-bottom': `justify-center items-end`,
    'right-center': `justify-end items-center`,
    'right-top': `justify-end items-start`,
    'right-bottom': `justify-end items-end`,
  };
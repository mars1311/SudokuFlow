import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Loader } from '../Loader/Loader';

// import LiquidGlass from 'liquid-glass-react'
import css from './Modal.module.scss';


interface ModalProps {
  isOpen: boolean,
  isLoading: boolean,
  onClose: () => void,
  children: ReactNode

  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}
export const Modal = ({
  isOpen,
  isLoading,
  onClose,
  children,
  closeOnBackdropClick = true,
  closeOnEsc = true,
}: ModalProps) => {

  // close on esc
   useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

   useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const onHandleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <div className={css.modalPortal} onClick={onHandleClose}
      role="dialog" aria-modal="true">
      <div className={css.modalPortal__content} onClick={(e) => e.stopPropagation()}>
        <button className={css.modalPortal__close} onClick={onClose} aria-label="Close" />
        {children}
      </div>
      {isLoading && <Loader />}
    </div>,
    document.body
  );
}
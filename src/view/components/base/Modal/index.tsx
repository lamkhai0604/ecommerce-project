import { ReactNode, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

interface IModalProps {
  children: ReactNode;
  className?: string;
  onClose: () => void;
}

interface IModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

interface IBackdropProps {
  onClose: () => void;
}

export const Backdrop = (props: IBackdropProps) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlay = (props: IModalOverlayProps) => {
  return (
    <div className="modal-component">
      {' '}
      <div className="cancelBtnModal" onClick={props.onClose}>
        X
      </div>
      {props.children}
    </div>
  );
};

const Modal = (props: IModalProps) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById('overplays') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        document.getElementById('overplays') as HTMLElement
      )}
    </Fragment>
  );
};

export default Modal;

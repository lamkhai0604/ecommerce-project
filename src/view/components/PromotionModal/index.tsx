import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import './style.css';

interface IPromotionModalProps {
  onClose: () => void;
}

const PromotionModal = (props: IPromotionModalProps) => {
  return (
    <Modal onClose={props.onClose}>

      <div className="promotion-modal">
        <div className="promotion-modal_content">
          <h3>Ten percent member discount</h3>
          <p>
            Enjoy our newsletter to stay updated with the latest news and special sales. Let's your
            email address here!
          </p>
          <div className="input-group mb-4">
            <Input
              clsName="modal-content_input"
              input={{
                id: '1',
                type: 'text',
                defaultValue: '',
                placeholder: 'Please enter your email to subscribe',
              }}
            />
            <Button clsName="modal-content_btn" size="small">Subscribe</Button>
          </div>
          <Input
            label="Don't show again"
            input={{
              id: '1',
              type: 'checkbox',
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PromotionModal;

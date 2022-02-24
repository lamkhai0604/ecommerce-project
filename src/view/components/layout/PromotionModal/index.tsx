import Button from 'view/components/base/Button';
import Input from 'view/components/base/Input';
import Modal from 'view/components/base/Modal';
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
          <div className="promotion-modal_form mb-4">
            <Input
              input={{
                id: '1',
                type: 'text',
                defaultValue: '',
                placeholder: 'Please enter your email to subscribe',
              }}
            />
            <Button size="small">
              Subscribe
            </Button>
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

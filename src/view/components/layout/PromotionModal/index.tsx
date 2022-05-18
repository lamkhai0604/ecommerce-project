import Button from 'view/components/base/Button';
import Radio from 'view/components/base/Radio';
import Input from 'view/components/base/Input';
import Modal from 'view/components/base/Modal';
import './style.css';

interface IPromotionModalProps {
  count?: number;
  onClose: () => void;
}

const PromotionModal = (props: IPromotionModalProps) => {
  return (
    <Modal onClose={props.onClose}>
        <span className="">This advertisement will disappear in {props.count} seconds</span>
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
            <Button size="small">Subscribe</Button>
          </div>
          <Radio label="Don't show this message again" />
        </div>
      </div>
    </Modal>
  );
};

export default PromotionModal;

import './style.css';

interface IBadgeProps {
    status?: string;
    discount?: string;
}

const Badge = (props: IBadgeProps) => {
  return (
    <>
      <div className="bagde">New</div>
    </>
  );
};

export default Badge;

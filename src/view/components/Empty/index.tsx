import { ReactNode } from 'react';
import empty_data from 'assets/images/empty_data.png';

interface IEmptyrops {
  clsName?: string;
  children?: ReactNode;
}

const Empty = (props: IEmptyrops) => {
  return (
    <div className={props.clsName}>
      <img src={empty_data} alt="Empty" />
      {props.children}
    </div>
  );
};

export default Empty;

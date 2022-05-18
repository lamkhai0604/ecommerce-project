import { ReactNode } from 'react';
import empty_data from 'assets/images/empty_data.png';

interface IEmptyrops {
  clsName?: string;
  children?: ReactNode;
}

const Empty = (props: IEmptyrops) => {
  return (
    <div className={props.clsName}>
      {props.children}
      <img src={empty_data} alt="Empty" width="100%" height="100%"/>
    </div>
  );
};

export default Empty;

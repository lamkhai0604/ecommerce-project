import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <Link
        style={{
          borderBottom: match ? '4px solid #ff0055' : 'none',
          borderRadius: match ? '5px' : '',
          color: match ? '#FF0055' : '',
        }}
        className="custom-link"
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;

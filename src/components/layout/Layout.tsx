import React from 'react';
import './Layout.css';

// defining the component props
interface Props {
  children?: React.ReactNode
}

// this component wraps everything, we can put headers or footers here
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="Layout">
      { children }
    </div>
  );
}

export default Layout;

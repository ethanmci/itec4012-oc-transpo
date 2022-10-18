import React from 'react';

// defining the component props
interface Props {
  busName: string
  color: string
  textColor: string
}

const Layout: React.FC<Props> = ({ busName, color, textColor }) => {
  return (
    <div className='p-5 inline-block shadow-sm' style={{ backgroundColor: color, color: textColor }}>
      { busName }
    </div>
  );
}

export default Layout;

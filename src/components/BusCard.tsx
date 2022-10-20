import React from 'react';

// defining the component props
interface Props {
  busName: string
  color: string
  textColor: string
}

const Layout: React.FC<Props> = ({ busName, color, textColor }) => {
  return (
    <div className='p-5 inline-block m-1 rounded-md md:w-1/12 w-1/3 h-14 shadow-sm relative' style={{ backgroundColor: `#${color}`, color: `#${textColor}` }}>
      <p className='text-center absolute'>{ busName }</p>
    </div>
  );
}

export default Layout;

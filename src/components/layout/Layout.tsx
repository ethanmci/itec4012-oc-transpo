import React, { useEffect } from 'react';
import './Layout.css';

// defining the component props
interface Props {
  children?: React.ReactNode
}

// this component wraps everything, we can put headers or footers here
const Layout: React.FC<Props> = ({ children }) => {
  // const [stopData, setStopData] = useState(null);

  // getting a stop summary (temp just so make sure it works)
  console.log(process.env.REACT_APP_OC_API_KEY);
  const res = fetch(`https://api.octranspo1.com/v2.0/GetRouteSummaryForStop?${new URLSearchParams({
    appId: '',
    apiKey: process.env.REACT_APP_OC_APP_ID ?? 'KEY_NOT_FOUND',
    stopNo: '3030'
  }).toString()}`, {
    mode: 'no-cors',
    headers: {
      accepts: 'application/json'
    }
  }
  )
    .then((res) => { console.log(res.json()) })

  console.log(res);
  useEffect(() => {}, [])
  return (
    <div className="Layout">
      { children }
    </div>
  );
}

export default Layout;

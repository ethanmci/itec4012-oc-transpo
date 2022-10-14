import React, { useEffect } from 'react';
import axios from 'axios';
import './Layout.css';

// defining the component props
interface Props {
  children?: React.ReactNode
}

// this component wraps everything, we can put headers or footers here
const Layout: React.FC<Props> = ({ children }) => {
  // const [stopData, setStopData] = useState(null);

  // getting a stop summary (temp just so make sure it works)
  useEffect(() => {
    axios.get('https://api.octranspo1.com/v2.0/GetRouteSummaryForStop', {
      params: {
        appID: 'bc379ec3',
        apiKey: process.env.OC_API_KEY,
        stopNo: '3030'
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => { console.log(err); })
  }, [])
  return (
    <div className="Layout">
      { children }
    </div>
  );
}

export default Layout;

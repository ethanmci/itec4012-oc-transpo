import React from 'react';

// nothing for now, just setting this up for later(?)
interface Props {
  tempProp?: object
};

const BusList: React.FC<Props> = ({ tempProp }) => {
  const res = fetch(`${(process.env.NODE_ENV ?? 'development') === 'development' ? 'https://api.allorigins.win/get?url=' : ''}
    ${encodeURIComponent(`https://api.octranspo1.com/v2.0/GetRouteSummaryForStop?${new URLSearchParams({
      appID: process.env.REACT_APP_OC_APP_ID ?? 'KEY_NOT_FOUND',
      apiKey: process.env.REACT_APP_OC_API_KEY ?? 'KEY_NOT_FOUND',
      stopNo: '3030'
    }).toString()}`)}`)
    .then(async response => {
      if (response.ok) return await response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => console.log(data.contents));

  console.log(res);
  return (
    <>
      The bus list would be here!
    </>
  )
}

export default BusList;

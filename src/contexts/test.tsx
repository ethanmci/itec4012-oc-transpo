// Consume in your app
import React, { useContext } from 'react';
import { AppCtx } from './CardInfoContext'

const PostInfo = (): any => {
  const appContext = useContext(AppCtx);
  if (appContext === undefined) return
  return (
    <div>
        isChecked: {appContext.isChecked}
    </div>
  );
}

export default PostInfo;

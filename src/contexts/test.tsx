// Consume in your app
import React from 'react';
import { useSelectedContext } from './CardInfoContext'

const PostInfo = (): any => {
  const { val } = useSelectedContext();
  return (
    <div>
        Context Checked Value: {val.toString()}
    </div>
  );
}

export default PostInfo;

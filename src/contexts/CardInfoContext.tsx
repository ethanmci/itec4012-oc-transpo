/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { createContext, useState } from 'react';

interface ICardContext {
  isChecked: boolean
  changeValue: (arg: boolean) => void
}

const sampleAppContext: ICardContext = {
  isChecked: false,
  changeValue: arg => console.warn('test'),
}

export const AppCtx = createContext<ICardContext>(sampleAppContext);

// Provider in your app

export const App = () => {
  const [isChecked, setCheckedC] = useState<ICardContext['isChecked']>(false);
  return (
<AppCtx.Provider value={{ isChecked, changeValue: setCheckedC }}>...</AppCtx.Provider>)
}

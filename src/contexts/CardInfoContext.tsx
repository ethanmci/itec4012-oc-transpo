/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext, useContext, useState } from 'react';
import Test from './test'

interface ICardContext {
  val: boolean
  changeValue: React.Dispatch<React.SetStateAction<boolean>>
}

const sampleAppContext: ICardContext = {
  val: false,
  changeValue: () => { console.log('placeholder fn') },
}

const AppCtx = createContext<ICardContext>(sampleAppContext);

// Provider in your app

export const App = () => {
  const [val, setVal] = useState<boolean>(false);
  // the change value should be updated but it's not???
  return (
    <AppCtx.Provider value={{ val, changeValue: setVal }}>
        <Test/>
    </AppCtx.Provider>
  )
}

export const useSelectedContext = () => useContext(AppCtx)

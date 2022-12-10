/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext, useContext, useState } from 'react';
// import Test from './test'
// import BusInfoCard from '../components/BusInfoCard'
import { IBusInfoCard } from '../interfaces'

interface ICardContext {
  isCardOpen: boolean
  setCardOpen: (newVal: boolean) => void
  activeBusCard: IBusInfoCard
  setActiveBusCard: (newVal: IBusInfoCard) => void
}
const CardContext = createContext<ICardContext | null>(null);

export const CardContextProvider = CardContext.Provider
export const CardContextConsumer = CardContext.Consumer
export const useCardContext = () => useContext(CardContext)

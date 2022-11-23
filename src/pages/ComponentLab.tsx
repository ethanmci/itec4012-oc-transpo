import React from 'react';
import BusInfoCard from '../components/BusInfoCard'
import Test from '../contexts/test'
// access at http://localhost:3000/component_lab
//     <div><BusInfoCard busId="40-342" busName="40" color="D74100" textColor='FFFFFF'></BusInfoCard></div>

const ComponentLab: React.FC = () => {
  return (<div>
    <div>Use this space to test out your components!</div>
    <Test></Test>
    <BusInfoCard busId="40-342" busName="40" color="D74100" textColor='FFFFFF'></BusInfoCard>
  </div>);
};

export default ComponentLab;

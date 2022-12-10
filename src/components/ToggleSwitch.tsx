import React from 'react';

interface Props {
  checked: boolean
  onChange: Function
  enabled: boolean
}

const ToggleSwitch: React.FC<Props> = ({ checked, onChange, enabled }) => {
  if (!enabled) {
    return (
      <div>
      <label className='inline-flex relative items-center cursor-pointer'>
        <input
          type="checkbox"
          className="sr-only peer"
        />
        <div className='w-11 h-6 bg-gray rounded-full peer dark:bg-gray-700 after:absolute after:top-[2px] after:left-[2px] after:bg-grey after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray'></div>
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-700'></span>
      </label>
    </div>
    )
  }
  return (
    <div>
      <label className='inline-flex relative items-center cursor-pointer'>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600'></div>
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>{checked}</span>
      </label>
    </div>)
};

export default ToggleSwitch;

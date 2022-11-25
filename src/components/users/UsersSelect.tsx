import { useState } from 'react';

import Select from '../common/Select';

const activeList = [
  ['true', '활성화'],
  ['false', '비활성화'],
];
const staffList = [
  ['true', '임직원'],
  ['false', '일반'],
];

const UsersSelect = () => {
  const [isActive, setIsActive] = useState('');
  const [isStaff, setIsStaff] = useState('');

  return (
    <>
      <Select
        label="계좌 활성화"
        keyword="isActive"
        state={isActive}
        list={activeList}
        handleChange={(e) => setIsActive(e.target.value)}
      />
      <Select
        label="임직원 여부"
        keyword="isStaff"
        state={isStaff}
        list={staffList}
        handleChange={(e) => setIsStaff(e.target.value)}
      />
    </>
  );
};

export default UsersSelect;

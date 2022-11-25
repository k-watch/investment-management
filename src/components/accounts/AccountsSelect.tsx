import { useState } from 'react';

import Select from '../common/Select';
import { brokerMap, statusMap } from './types';

const brokerList = [...brokerMap.entries()];
const statusList = [...statusMap.entries()];
const activeList = [
  ['true', '활성화'],
  ['false', '비활성화'],
];

const AccountsSelect = () => {
  const [broker, setBroker] = useState('');
  const [status, setStatus] = useState('');
  const [isActive, setIsActive] = useState('');

  return (
    <>
      <Select
        label="증권사"
        keyword="broker"
        state={broker}
        list={brokerList}
        handleChange={(e) => setBroker(e.target.value)}
      />
      <Select
        label="계좌 상태"
        keyword="status"
        state={status}
        list={statusList}
        handleChange={(e) => setStatus(e.target.value)}
      />
      <Select
        label="계좌 활성화"
        keyword="isActive"
        state={isActive}
        list={activeList}
        handleChange={(e) => setIsActive(e.target.value)}
      />
    </>
  );
};

export default AccountsSelect;

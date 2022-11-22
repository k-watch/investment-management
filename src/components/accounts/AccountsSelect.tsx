import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import Select from './common/Select';

const _nameMap = new Map([
  [209, '유안타증권'],
  [218, '현대증권'],
  [230, '미래에셋증권'],
  [238, '대우증권'],
  [240, '삼성증권'],
  [243, '한국투자증권'],
  [247, '우리투자증권'],
  [261, '교보증권'],
  [262, '하이투자증권'],
  [263, 'HMC투자증권'],
  [264, '키움증권'],
  [265, '이베스트투자증권'],
  [266, 'SK증권'],
  [267, '대신증권'],
  [268, '아이엠투자증권'],
  [269, '한화투자증권'],
  [270, '하나대투자증권'],
  [279, '동부증권'],
  [280, '유진투자증권'],
  [288, '카카오페이증권'],
  [287, '메리츠종합금융증권'],
  [290, '부국증권'],
  [291, '신영증권'],
  [292, 'LIG투자증권'],
  [271, '토스증권'],
]);

const _statusMap = new Map([
  [9999, '관리자확인필요'],
  [1, '입금대기'],
  [2, '운용중'],
  [3, '투자중지'],
  [4, '해지'],
]);

const brokerList = [..._nameMap.entries()];
const statusList = [..._statusMap.entries()];
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
        state={broker}
        handleChange={(e) => setBroker(e.target.value)}
        list={brokerList}
        keyword="broker"
      />
      <Select
        label="계좌 상태"
        state={status}
        handleChange={(e) => setStatus(e.target.value)}
        list={statusList}
        keyword="status"
      />
      <Select
        label="계좌 활성화"
        state={isActive}
        handleChange={(e) => setIsActive(e.target.value)}
        list={activeList}
        keyword="isActive"
      />
    </>
  );
};

export default AccountsSelect;

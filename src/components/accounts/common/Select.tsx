import { useRouter } from 'next/router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MuiSelect, SelectChangeEvent } from '@mui/material';

import { queryParams } from '@src/utils/common';

interface SelectProps {
  label: string;
  keyword: string;
  state: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[][];
  handleChange: (e: SelectChangeEvent) => void;
}

const Select = ({ label, state, handleChange, list, keyword }: SelectProps) => {
  const router = useRouter();

  const handleClick = (event: SelectChangeEvent) => {
    handleChange(event);

    queryParams(router, keyword, event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 180 }} size="small">
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={state} label="증권사" onChange={handleClick}>
        <MenuItem value="">선택 안함</MenuItem>
        {list.map(([key, value]) => [
          <MenuItem key={key} value={value}>
            {value}
          </MenuItem>,
        ])}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;

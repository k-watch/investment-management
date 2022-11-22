import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as MuiSelect, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';

interface SelectProps {
  label: string;
  state: string;
  handleChange: (e: SelectChangeEvent) => void;
  list: any[][];
  keyword: string;
}

const Select = ({ label, state, handleChange, list, keyword }: SelectProps) => {
  const router = useRouter();

  const handlea = (event: SelectChangeEvent) => {
    handleChange(event);

    const path = router.asPath.split('?')[1];
    const searchParams = new URLSearchParams(path);

    searchParams.delete(keyword);
    if (event.target.value) {
      searchParams.set(keyword, event.target.value);
    }
    router.push(`${router.pathname}?${searchParams}`);
  };

  return (
    <FormControl sx={{ minWidth: 180 }} size="small">
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={state} label="증권사" onChange={handlea}>
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

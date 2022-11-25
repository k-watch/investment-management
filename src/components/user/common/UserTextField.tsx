import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface UserTextFieldProps {
  name: string;
  value: string | number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserTextField = ({ name, value, handleChange }: UserTextFieldProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      margin="dense"
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

export default UserTextField;

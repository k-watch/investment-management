import { useEffect, useState } from 'react';

import useUpdateUserQuery from '../api/useUpdateUserQuery';

export interface UserDialogProps {
  id: number;
  name: string;
  email: string;
  age: number;
  birthDate: string;
  phoneNumber: string;
}

export interface UserFormProps {
  [index: string]: string | number | undefined;
  name: string;
  email: string;
  age: number;
  birthDate: string;
  phoneNumber: string;
}

const useUserDialog = ({ user }: { user: UserDialogProps }) => {
  const [open, setOpen] = useState(false);
  const [userForm, setUserForm] = useState<UserFormProps>({
    name: '',
    email: '',
    age: 0,
    birthDate: '',
    phoneNumber: '',
  });

  const { updateUserMutation } = useUpdateUserQuery(user.id);

  useEffect(() => {
    if (open && user) {
      setUserForm({
        name: user.name,
        email: user.email,
        age: user.age,
        birthDate: user.birthDate,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [open, user]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserForm({ ...userForm, [name]: value });
  };

  const handleModify = () => {
    const isDisabled = Object.entries(userForm).every(([v]) =>
      v !== '' ? true : false
    );

    if (!isDisabled) {
      alert('빈 칸을 입력해주세요.');
      return;
    }

    if (user.id) {
      updateUserMutation.mutate({ id: user.id, params: userForm });
    }

    setOpen(false);
  };

  return {
    open,
    userForm,
    handleOpen,
    handleClose,
    handleChange,
    handleModify,
  };
};

export default useUserDialog;

import { useState, useCallback } from 'react';

const useToggle = (initialValue = false) => {
  const [isOpen, setOpen] = useState(initialValue);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return { isOpen, onOpen, onClose, toggle };
};

export default useToggle;
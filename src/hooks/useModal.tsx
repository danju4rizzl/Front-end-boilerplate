import { useRouter } from 'next/router';
import * as React from 'react';

import RootModal, { ModalProps } from '@components/Modal';

interface Props extends Omit<ModalProps, 'isOpen' | 'modal'> {
  onBeforeClose?(): boolean | void;
}

const useModal = (
  component: React.ReactElement,
  { onBeforeClose, ...props }: Props = {},
) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const showModal = React.useCallback(() => {
    setOpen(true);
  }, []);

  const forceClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const hideModal = React.useCallback(() => {
    const stopClose = onBeforeClose?.();
    if (stopClose) {
      return false;
    }
    setOpen(false);
  }, [onBeforeClose]);

  React.useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  const modal = React.useCallback(
    () => (
      <RootModal
        {...props}
        modal={component}
        onRequestClose={hideModal}
        isOpen={open}
      />
    ),
    [component, open, props, hideModal],
  );

  return {
    showModal,
    hideModal,
    modal,
    forceClose,
  };
};

export default useModal;

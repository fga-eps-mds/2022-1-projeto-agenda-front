import { ReactNode } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { AxiosInstance } from 'axios';

import { DataCity } from '@components/DataType';

import { ModalCadEdit } from './ModalCad&Edit';
import { ModalDel } from './ModalDel';

interface ListIconProps {
  noAdd?: boolean;
  children: ReactNode;
  edit?: {
    modalHeader: string;
    buttonModal: ReactNode;
    callBack: (data: DataCity) => void;
    id: number;
    name: string;
  };
  add?: {
    modalHeader: string;
    buttonModal: ReactNode;
    callBack: (data: DataCity) => void;
    parentId?: number;
  };
  delete?: {
    modalHeader: string;
    callBack: (id: number) => void;
    id: number;
    name: string;
    fistText: string;
    secondText: string;
  };
  api: AxiosInstance;
  errorMessage: string;
  successMessage: string;
  tag: string;
}

export const ListIcon = ({ ...prop }: ListIconProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function ModalType() {
    if (prop.edit) {
      return (
        <ModalCadEdit
          isOpen={isOpen}
          onClose={onClose}
          type='edit'
          {...prop}
          {...prop.edit}
        />
      );
    } else if (prop.add) {
      return (
        <ModalCadEdit
          isOpen={isOpen}
          onClose={onClose}
          type='add'
          {...prop}
          {...prop.add}
        />
      );
    } else if (prop.delete) {
      return (
        <ModalDel
          isOpen={isOpen}
          onClose={onClose}
          {...prop}
          {...prop.delete}
        />
      );
    }
  }

  return prop.noAdd ? (
    <></>
  ) : (
    <>
      <Box
        m='0 auto'
        mt='1em'
        maxH={'20px'}
        fontSize={'xl'}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
        _hover={{ boxShadow: 'dark-lg' }}
        onClick={onOpen}
      >
        {prop.children}
      </Box>
      {ModalType()}
    </>
  );
};

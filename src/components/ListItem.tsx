import React, { useCallback } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

type ListItemProps = {
  title: string;
  description: string;
  Actions?: typeof Actions;
  children?: React.ReactNode;
};

const Divider = {
  content: "''",
  position: 'absolute',
  bottom: 0,
  width: '40%',
  height: '1px',
  backgroundColor: '#e6e6e6',
};

export const ListItem = ({ title, description, children }: ListItemProps) => {
  return (
    <>
      <Flex
        w='100%'
        justifyContent='space-between'
        align='center'
        position='relative'
        _after={Divider}
      >
        <Box>
          <Text fontWeight='semibold' mb={1}>
            {title}
          </Text>
          <Text color='GrayText'>{description}</Text>
        </Box>

        <Box alignSelf='end'>{children}</Box>
      </Flex>
    </>
  );
};

interface ActionsProps {
  itemName: string;
  onEdit: () => void;
  onDelete: () => void;
  onAdd?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({
  itemName,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = useCallback(() => {
    onDelete?.();
    onClose?.();
  }, [onClose, onDelete]);

  return (
    <HStack spacing={4}>
      {onAdd && (
        <IconButton
          aria-label='Delete'
          icon={<MdLibraryAdd onClick={onAdd} cursor='pointer' size={24} />}
          variant='solid'
        />
      )}

      <IconButton
        aria-label='Delete'
        icon={<BiEditAlt onClick={onEdit} cursor='pointer' size={24} />}
        variant='solid'
      />

      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement='auto'
      >
        <PopoverTrigger>
          <IconButton
            aria-label='Delete'
            icon={<FaTrash />}
            color='red.600'
            variant='solid'
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Você tem certeza?</PopoverHeader>
          <PopoverBody>
            Você realmente deseja excluir <strong>{itemName}</strong>?
          </PopoverBody>
          <PopoverFooter>
            <Flex justifyContent='space-between'>
              <Button onClick={onClose} variant='outline'>
                Cancelar
              </Button>
              <Button onClick={handleDelete} colorScheme='red' variant='solid'>
                Apagar
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

ListItem.Actions = Actions;
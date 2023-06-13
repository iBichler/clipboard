import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Logout } from './Logout';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'deeporange.800')}
        color={useColorModeValue('deeporange.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('deeporange.200', 'deeporange.900')}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Text
            as="span"
            bgGradient="linear(to-l, #aa915a, #e1bf43)"
            bgClip="text"
            fontWeight="bold"
            fontFamily="heading"
            textAlign="left"
          >
            clipboard
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Logout />
        </Stack>
      </Flex>
    </Box>
  );
};

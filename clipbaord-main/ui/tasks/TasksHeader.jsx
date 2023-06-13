import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

export const TasksHeader = () => (
  <Stack as={Box} textAlign="center" spacing={{ base: 8 }} py={{ base: 10 }}>
    <Heading fontWeight={600}>
      <Text as="span" bgGradient="linear(to-l, #aa915a, #e1bf43)" bgClip="text">
        clipboard
      </Text>
    </Heading>
  </Stack>
);

import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../lib/RoutePaths';

export const SignedIn = () => {
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            bgGradient="linear(to-l, #aa915a,#e1bf43)"
            bgClip="text"
          >
            You are already signed in
          </Heading>
          <Text fontSize="lg" color="deeporange.400">
            to start creating your simple tasks
          </Text>
        </Stack>
        <Stack spacing={10}>
          <Button
            onClick={() => navigate(RoutePaths.TASKS)}
            bg="orange.600"
            color="black"
            _hover={{
              bg: 'orange.500',
            }}
          >
            Go to your tasks
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

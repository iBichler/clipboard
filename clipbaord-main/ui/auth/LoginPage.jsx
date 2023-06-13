import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ErrorStatus } from '../lib/ErrorStatus';
import { Accounts } from 'meteor/accounts-base';
import { SignedIn } from './SignedIn';
import { RoutePaths } from '../lib/RoutePaths';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUserId } from 'meteor/react-meteor-accounts';

/* eslint-disable import/no-default-export */
export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = useUserId();
  const navigate = useNavigate();

  const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  });

  const defaultValues = {
    username: 'idabichler',
    password: 'fhb987',
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const handleError = error => {
    if (error) {
      const reason = error?.reason || 'Sorry, please try again.';
      setErrorMessage(reason);
      return;
    }
    navigate(RoutePaths.TASKS);
  };

  const onSubmit = values => {
    const { username, password } = values;
    if (isSignup) {
      Accounts.createUser({ username, password }, error => {
        handleError(error);
      });
    } else {
      Meteor.loginWithPassword(username, password, error => {
        handleError(error);
      });
    }
  };

  if (userId) {
    return <SignedIn />;
  }
  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading
            fontSize="4xl"
            bgGradient="linear(to-l, #aa915a,#e1bf43)"
            bgClip="text"
          >
            Sign in to your account
          </Heading>
          <Text fontSize="lg" color={useColorModeValue('deeporange.600', 'deeporange.400')}>
            to start creating your simple tasks
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'deeporange.700')}
          boxShadow="lg"
          p={8}
        >
          <ErrorStatus status={errorMessage} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  {...register('username')}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <InputGroup size="md">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register('password')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              {!isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg="orange.600"
                      color="black"
                      _hover={{
                        bg: 'orange.500',
                      }}
                      isLoading={isSubmitting}
                    >
                      Sign in
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(true)}>
                      Create a new account
                    </Button>
                  </Stack>
                </>
              )}

              {isSignup && (
                <>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg="lime.600"
                      color="white"
                      _hover={{
                        bg: 'lime.500',
                      }}
                      isLoading={isSubmitting}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack spacing={10}>
                    <Button onClick={() => setIsSignup(false)}>
                      I have an account
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

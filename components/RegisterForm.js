
import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {checkUsername, registerUser, userCheck} from '../hook/apiHooks';
import { Card, Input,Button,Text } from '@rneui/themed';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

const RegisterForm = ({setToggleRegister}) => {
  const {postUser} = registerUser();
  const {userCheck} = checkUsername();
  const register = async (data) => {
    try {
      delete data.Confirm_password;
      const loginResponse = await postUser(data);
      console.log('postRegister', loginResponse);
      Alert.alert('Succ-ess', loginResponse.message);
      setToggleRegister(false);
    } catch (error) {
      //console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });
  const onSubmit = (data) => register(data);
  return (
    <Card>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          validate: async (value) => {
            try {
              const isAvailable = await userCheck(value);
              console.log('Username Available? ', value, isAvailable);
              return isAvailable ? isAvailable : 'Username taken';
            } catch (error) {
              console.log(error);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>This is required.</Text>}
      {errors.username?.type === 'minLength' && <Text>botti</Text>}
      <Text>{errors.username?.message}</Text>

      <Controller
        control={control}
        rules={{ required:true,
          minLength: {value: 3, message: 'This is required.and 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          validate: (value) => {
            const {password} = getValues();
           console.log('getValues: password:', password , value);
            return value === password ? true : 'Passwords dont match!';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm_password"
            autoCapitalize="none"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.Confirm_password?.message}
          />
        )}
        name="Confirm_password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: 3,
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'This is required.and 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="full_name"
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </Card>
  );
};
RegisterForm.propTypes ={
  setToggleRegister: PropTypes.func,
};
export default RegisterForm;

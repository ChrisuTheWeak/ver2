import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {checkUsername, putUser,registerUser, userCheck, useUser} from '../hook/apiHooks';
import {Card, Input, Button, Text} from '@rneui/themed';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../contexts/MainContext';

const ProfileFrom = ({user}) => {
  const {postUser} = registerUser();
  const {userCheck} = checkUsername();
  const {puteUser} = putUser();
  const {getUserByToken} = useUser();
  const {setUser} = useContext(MainContext);

  const update = async (dataUpdate) => {
    try {
      delete dataUpdate.Confirm_password;
      for (const [i, value] of Object.entries(dataUpdate)) {
        console.log(i, value);
        if (value === '') {
          delete dataUpdate[i];
        }
      }
      console.log('ei salee toimi', dataUpdate,);
      const token = await AsyncStorage.getItem('userToken');
      console.log(token);
      const updateResponse = await puteUser(dataUpdate, token);
      console.log('postRegister', updateResponse);
      Alert.alert('Succ-ess', updateResponse.message);
      //setToggleRegister(false);
      const userData = await getUserByToken (token);
      setUser(userData);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {...user, password:'',Confirm_password: '',},
    mode: 'onBlur',
  });
  const onSubmit = (dataUpdate) => update(dataUpdate);
  return (
    <Card>
      <Controller
        control={control}
        rules={{
          minLength: 3,
          validate: async (value) => {
            try {
              if (value.length < 3) {
                return;
              }
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
        rules={{
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
          validate: (value) => {
            const {password} = getValues();
            console.log('getValues: password:', password, value);
            if (password.length === 0) {
              return;
            }
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

      <Button title="Update !!" onPress={handleSubmit(onSubmit)} />
    </Card>
  );
};
ProfileFrom.propTypes = {
  user: PropTypes.object,
};
export default ProfileFrom;

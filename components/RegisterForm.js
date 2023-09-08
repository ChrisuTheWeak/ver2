import {View, Text, TextInput, Button} from 'react-native';
import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {checkUsername, registerUser, userCheck} from '../hook/apiHooks';

const RegisterForm = () => {
  const {postUser} = registerUser();
  const {userCheck} = checkUsername();
  const register = async (data) => {
    try {
      const loginResponse = await postUser(data);
      console.log('postRegister', loginResponse);
    } catch (error) {
      console.error(error);
    }
  };
  const {
    control,
    handleSubmit,
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
    <View>
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
          <TextInput
            placeholder="username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            //errorMessage={errors.username?.message}
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
          maxLength: 100,
          minLength: 4,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Fullname"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="full_name"
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
//comment
export default RegisterForm;

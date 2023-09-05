import { View, Text, TextInput, Button } from 'react-native'
import React, { useContext } from 'react'
import { useForm, Controller } from "react-hook-form";
import { registerUser, } from '../hook/apiHooks';




const RegisterForm = () => {
  const {postUser} = registerUser();
const register = async (data) => {
    try{
    const loginResponse = await postUser(data);
    console.log('postRegister', loginResponse);
  }catch (error) {
    console.error(error);
  }};
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      full_name: "",
    },
  });
const onSubmit = (data) => register(data);
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="password"
            autoCapitalize='none'
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
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Fullname"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
          />
        )}
        name="full_name"
      />


      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
};
//comment
export default RegisterForm

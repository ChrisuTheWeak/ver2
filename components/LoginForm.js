import { View, Text, TextInput, Button } from 'react-native'
import React, { useContext } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useAuthentication } from '../hook/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../contexts/MainContext';



const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })

const {setIsLoggedIn} = useContext(MainContext);
const {postLogin} = useAuthentication();

  const logIn = async (loginData) => {
    console.log('Button pressed');
    try{
    const loginResponse = await postLogin(loginData);
    console.log('postLogin', loginResponse);
    await AsyncStorage.setItem('userToken', loginResponse.token);
    setIsLoggedIn(true);
  }catch (error) {
    console.error(error);
  }
};
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
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(logIn)} />
    </View>
  )
}

export default LoginForm
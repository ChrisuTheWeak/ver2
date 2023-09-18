import { View, Text, TextInput, Button, Alert } from 'react-native'
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

const {setIsLoggedIn, setUser} = useContext(MainContext);
const {postLogin} = useAuthentication();

  const logIn = async (loginData) => {
    console.log('Button pressed');
    try{
    const loginResponse = await postLogin(loginData);
    console.log('postLogin', loginResponse);
    await AsyncStorage.setItem('userToken', loginResponse.token);
    setIsLoggedIn(true);
    setUser(loginResponse.user);
  }catch (error) {
    Alert.alert('Error: ', error.message);
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
            autoCapitalize='none'
            errorMessage= {errors.username?.message}
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required:{value:true, message: 'is required.'},
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="password"
            autoCapitalize='none'
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage= {errors.password?.message}
          />
        )}
        name="password"
      />

      <Button title="Login" onPress={handleSubmit(logIn)} />
    </View>
  )
}

export default LoginForm;

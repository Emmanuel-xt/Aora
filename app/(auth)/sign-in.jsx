import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser , setIsLoggedIn} = useGlobalContext()
  // console.log('Is it Loading and logged in Values' , isLoading , isLoggedIn )


  const submit = async () => {
    console.log("submitted");
    if (!form.email || !form.password) {
      Alert.alert("Error => All fields are required");
      }
    // Alert.alert('submitted');
    setIsSubmitting(true)
    try {
      const result = await signIn(form.email , form.password)
      Alert.alert('logged in succesfully')
      setUser(result)
      setIsLoggedIn(true)
      router.replace('/home')
    } catch (error) {
      Alert.alert(`Error` , error.message, 'j' )
    }finally{
      Alert.alert('finally')
      setIsSubmitting(false)
    }
  };  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMethod="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="my-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account ?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary-100">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

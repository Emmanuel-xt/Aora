import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";

const EmptyState = ({ subtitle, title }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">j{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white">
        j{subtitle}
      </Text>
      <CustomButton
        containerStyles="w-full my-5"
        title="Create Video"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;

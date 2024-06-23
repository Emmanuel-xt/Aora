import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useApprite from "../../lib/useAppwrite";
import { icons, images } from "../../constants";
import { getUserPost, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile =  () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  console.log("user", user?.email);
  const { data: posts, refetch } = useApprite(() => getUserPost(user.$id));
  const logOut = async () => {
    console.log('sign out clicked')
    await signOut()
    console.log('signed out')
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          // <Text className="text-3xl text-white">
            <VideoCard video={item} />
          // </Text>
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 bg-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10 border p-5"
              onPress={logOut}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
              
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className="w-[90%] h-[90%] rounded-lg "
              />
            </View>
            <InfoBox
              title={user?.username || 'Emma-Js'}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="flex-row mt-5 border">
              <InfoBox
                title={posts?.length || 0}
                containerStyles="mr-5"
                titleStyles="text-xl"
                subtitle='Posts'
                />
              <InfoBox
                title='1.2k'
                containerStyles=""
                titleStyles="text-xl"
                subtitle='Followers'
                />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Search result not found"
            subtitle="Be the fiirst to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

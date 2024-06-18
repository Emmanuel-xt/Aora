import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getALlPosts } from "../../lib/appwrite";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData =async () => {
      setIsLoading(true)
        try {
          const response = await getALlPosts()
          console.log('response ==> ' , response)
          setData(response)
        } catch (error) {
          Alert.alert('Error' , error.message)
        }finally{
          setIsLoading(false)
        }
    }
    fetchData()

  }, [])

  console.log('Data ==> ' , data)
  

  const onRefresh = async () => {
    setRefreshing(true)
    setRefreshing(false)

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-medium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Emma-Js
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='font-pregular text-lg text-gray-100 mb-3'>Laterst Videos</Text>
              <Trending post={[{id:1} ,{id:2}, {id:3}] ?? []} />

            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No Videos found' subtitle='Be the fiirst to upload a video' />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;

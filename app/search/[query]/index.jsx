import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { searchPosts } from "../../../lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import SearchInput from "../../../components/SearchInput";
import EmptyState from "../../../components/EmptyState";
import useApprite from "../../../lib/useAppwrite";
import VideoCard from "../../../components/VideoCard";
import { images } from "../../../constants";

const search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useApprite(() => searchPosts(query));
  console.log(`query= ${query} , post = ${posts}`)
  useEffect(() => {refetch()}, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">
            <VideoCard video={item} />
          </Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-medium text-sm text-gray-100">
              Search Results for
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6">
              <SearchInput initialQuery={query} />
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

export default search;

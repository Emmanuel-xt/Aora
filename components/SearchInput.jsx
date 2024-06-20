import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({initialQuery}) => {
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  return (
    <View className="border-2 border-black-200 w-full h-16  px-4 bg-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white mt-0.5  font-pregular text-base "
        value={query}
        placeholder='Search for a Video'
        placeholderTextColor="#CDCDE0"
        onChange={(e) => setQuery(e.target.value)}
      />
      <TouchableOpacity className='' onPress={() => {
        if(!query){
          return Alert.alert('Missing Query , Input search result')
        }

        if(pathname.startsWith('/search')) router.setParams({query})
          else router.push(`/search/${query}`)
      }}>
        <Image source={icons.search} className='w-5 h-5' resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View className='flex items-center justify-center'>
      <Text className='text-3xl'>index</Text>
      <Link href='/profile'>Go to Profile</Link>
    </View>
  )
}

export default index

// const styles = StyleSheet.create({})
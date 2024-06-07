import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

const RootLayout = () => {
  return (
    <>
    <Text className="bg-black" >Header</Text>
   <Slot />
    <Text >Footer</Text>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})
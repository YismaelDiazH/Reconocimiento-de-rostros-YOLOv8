import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../../../../kernel/components/Loading'
import UserGuest from './UserGuest'
import { useNavigation } from '@react-navigation/native'

export default function Profile() {
    const navigation = useNavigation()

  
   // if (session == null) return <Loading show={true} text='Cargando'/>
    return  <UserGuest navigation={navigation} />
}

const styles = StyleSheet.create({})
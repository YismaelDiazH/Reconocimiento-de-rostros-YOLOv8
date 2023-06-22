import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../../modules/profile/adapters/screens/Profile'
import UserGuest from '../../modules/profile/adapters/screens/UserGuest'
import CameraComponent from '../../modules/profile/adapters/screens/components/Camera'
const Stack = createNativeStackNavigator()

export default function ProfileStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#84baec' }
            }}>
            <Stack.Screen
                name='profileStack'
                options={{ title: 'Asistencia' }}
                component={Profile}
            />
            <Stack.Screen
                name='userGuestStack'
                options={{ title: 'Bienvenido' }}
                component={UserGuest}
            />
            <Stack.Screen
                name='loginStack'
                options={{ title: 'Cámara' }}
                component={CameraComponent} 
            />
           
        </Stack.Navigator>
    )
}
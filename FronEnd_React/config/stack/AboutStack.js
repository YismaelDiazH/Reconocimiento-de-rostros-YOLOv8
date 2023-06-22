import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import About from '../../modules/about/adapters/screens/About'
const Stack = createNativeStackNavigator()

export default function AboutStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#84baec' }
            }}>
            <Stack.Screen
                name='aboutStack'
                options={{ title: 'Acerca de nosotros' }}
                component={About}
            />
        </Stack.Navigator>
    )
}
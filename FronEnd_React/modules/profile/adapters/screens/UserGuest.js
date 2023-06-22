import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Image, Button } from '@rneui/base'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Alert from '../../../../kernel/components/Alert'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.mx}
                centerContent={true}>
                <Image
                    source={require('../../../../assets/icon.png')}
                    resizeMode='contain'
                    style={styles.img} />
                <Text style={styles.title}>Bienvenido a SACAE</Text>
                <Text style={styles.description}>
                Sistema Automatizado para Control de Asistencia Escolar
                </Text>
                <View style={styles.viewBtnContainer}>
                    <Button
                        title='Comenzar'
                        icon={{
                            name: 'login-variant',
                            type: 'material-community',
                            size: 15,
                            color: 'white'
                        }}
                        buttonStyle={styles.btn}
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate('loginStack')}
                    />
                </View>
                {/* <Alert show={true} text='Hola' type='success'/>                 */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mx: {
        marginLeft: 32,
        marginRight: 32
    },
    img: {
        marginTop: 20,
        width: '100%',
        height: 150
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'monospace',
        margin: 10
    },
    description: {
        textAlign: 'center',
        marginBottom: 10
    },
    viewBtnContainer: {
        flex: 1,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#84baec',
        color: '#fff'
    },
    btnContainer: {
        width: '70%'
    },
})
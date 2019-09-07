import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import NavigationHeader from '../navigation/NavigationHeader'

export default (props) => (
    <React.Fragment>
        <SafeAreaView>
            <NavigationHeader title={'About Akasa Bookstore App'}/>
            <ScrollView>


                <View>
                    <View style={styles.center}>
                        <Text h4>About</Text>
                    </View>
                </View>

                <View style={styles.textSection}>
                    <Text style={styles.text}>Created for Akasa Bookstore by :</Text>
                    <Text style={styles.text}>https://www.csatrio.com</Text>

                    <Text style={{...styles.text, marginTop: 10}}>Mail to :</Text>
                    <Text style={styles.text}>constantinus.satrio@gmail.com</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    </React.Fragment>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSection: {
        marginTop: 20,
        marginLeft: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    review: {
        fontSize: 16,
    },
});

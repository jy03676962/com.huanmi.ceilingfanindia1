import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button, Alert, Image,Animated,Easing} from 'react-native'
import {API_LEVEL, Package, Device, Service, Host} from 'miot';
import {View, Text, default as RRCAlert} from 'react-native';
import {TitleBarBlack, TitleBarWhite} from 'miot/ui';
import {LocalizedStrings} from '../Config/MHLocalizableString'
import FanLogoView from "../View/FanLogoView";

let projectModel = require('../../project');
let fanStatus = 0;

export default class MainPage extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            header:
                <View>
                    <TitleBarBlack
                        title={navigation.state["params"] ? navigation.state.params.name : Device.name}
                        style={{backgroundColor: 'transparent'}}
                        onPressLeft={() => {
                            Package.exit()
                        }}
                        onPressRight={() => {
                            navigation.navigate('SettingPage', {'title': LocalizedStrings.setting});
                        }}
                        onPressTitle={() => {
                            RRCAlert.alert('plugin version_code:' + projectModel.version_code, '',
                                [{text: LocalizedStrings.ir_confirm, style: {color: '#fd521d', fontWeight: 'bold'}}
                                ]
                            )
                        }}
                    />
                </View>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            did: Device.deviceID,
            model: Device.model,
            pkgName: Package.packageName,
            api: API_LEVEL,
            rn_api: Host.apiLevel,
            welcomeString: "Hello this is a HOLOMI india demo",
            hasError: false,
        };
        this.spinValue = new Animated.Value(0)
    }

    componentDidCatch(error, errorInfo) {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        console.error("error:", error, "errorInfo:", errorInfo.componentStack);
    }

    componentWillMount() {

    }

    _onPressButton() {
        Alert.alert('Start fan!')
    }

    render() {
        // 利用 interpolate 方法将数值 0~1 映射到了 0deg~360deg
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return (
            <ScrollView style={styles.mainView}>
                <FanLogoView></FanLogoView>
                <Button
                    onPress={this._onPressButton}
                    title="Press Me"
                />
                <View style={styles.logoView}>
                    <Animated.Image
                        style={{
                            width: 227,
                            height: 200,
                            transform: [{rotate: spin}] }}
                        source={require('../../Resources/fan.png')}
                    />
                </View>

                <View style={styles.logoView}>
                    <Text>hello, this is a tiny plugin project of MIOT</Text>
                    <Text>API_LEVEL:{API_LEVEL}</Text>
                    <Text>NATIVE_API_LEVEL:{Host.apiLevel}</Text>
                    <Text>{Package.packageName}</Text>
                    <Text>models:{Package.models}</Text>
                    <Text>Package.entrance:{Package.entrance}</Text>
                    <Text>state did:{this.state.did}</Text>
                    <Text>state model:{this.state.model}</Text>
                    <Text>state pkgName:{this.state.pkgName}</Text>
                    <Text>state api:{this.state.api}</Text>
                    <Text>state rn_api:{this.state.rn_api}</Text>
                    <Text>welcomeString:{this.state.welcomeString}</Text>
                    <Text>hasError:{this.state.hasError}</Text>
                </View>
                <View style={styles.selectView}>
                    <View style={styles.historyData}>
                        <Text>historyData</Text>
                    </View>
                    <View style={styles.fanSwitch}>
                        <Text>fanSwitch</Text>
                    </View>
                    <View style={styles.modeSwitch}>
                        <Text>modeSwitch</Text>
                    </View>
                    <View style={styles.userCustomize}>
                        <Text>userCustomize</Text>
                    </View>
                    <View style={styles.otherSwitch}>
                        <Text>otherSwitch</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

    componentDidMount () {
        this.spin()
    }
    spin () {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.spin()) // 一轮动画完成后的回调，这里传spin可以形成无限动画
    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

    }

    componentWillUpdate(nextProps, nextState, nextContext) {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentWillUnmount() {

    }
}
let width = 240;
let height = 160;

const styles = StyleSheet.create({
    imagesStyle: {
        width: 300,
        height: 300,
    },
    mainView: {
        backgroundColor: '#87CEEB',
    },
    logoView: {
        alignItems: 'center',
    },
    selectView: {
        alignItems: 'center',
    },
    historyData: {
        backgroundColor: '#D8BFD8',
        height: height,
        width: width,
    },
    fanSwitch: {
        backgroundColor: '#E6E6FA',
        height: height,
        width: width,
    },
    modeSwitch: {
        backgroundColor: '#708090',
        height: height,
        width: width,
    },
    fanControl: {
        backgroundColor: '#FFEFD5',
        height: height,
        width: width,
    },
    userCustomize: {
        backgroundColor: '#D8BFD8',
        height: height,
        width: width,
    },
    otherSwitch: {
        backgroundColor: '#FFEFD5',
        height: height,
        width: width,
    }
});
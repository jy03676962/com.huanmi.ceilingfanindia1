import React, {Component} from "react";
import {API_LEVEL, Package, Device, Service, Host} from 'miot';
import {View, Text, default as RRCAlert} from 'react-native';
import {TitleBarBlack, TitleBarWhite} from 'miot/ui';
import {LocalizedStrings} from '../Config/MHLocalizableString'

let projectModel = require('../../project');

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
                            navigation.navigate('Setting', {'title': LocalizedStrings.setting});
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


    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'powderblue'}}>
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
        );
    }

    componentDidMount() {

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
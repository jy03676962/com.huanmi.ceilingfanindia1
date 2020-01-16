import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native"
import {createStackNavigator} from 'react-navigation';
import {TitleBarBlack, TitleBarWhite} from 'miot/ui';

import SceneMain from './Page/SceneMain';
import MainPage from './Page/MainPage';
import TimedTaskPage from "./Page/TimedTaskPage";
import MHSetting from "./Page/MHSetting";
import {API_LEVEL, Package, Device, Service, Host} from 'miot';


const RootStack = createStackNavigator(
    {
        MainPage: MainPage,
        SceneMain: SceneMain,
        SettingPage:MHSetting,
        TimedTaskPage:TimedTaskPage,
    },
    {
        initialRouteName: 'MainPage',
        navigationOptions: ({navigation}) => {
            return {
                header: <TitleBarBlack title={navigation.state.params ? navigation.state.params.title : ''}
                                       style={{backgroundColor: '#fff'}}
                                       onPressLeft={() => {
                                           navigation.goBack();
                                       }}/>,
            };
        },
    }
);

//解决Android字串显示不全问题
const styles = StyleSheet.create({
    defaultFontFamily: {
        fontFamily: 'lucida grande',    // 可以试试 fontFamily: '',
    }
});

const oldRender = Text.prototype.render;
Text.prototype.render = function (...args) {
    const origin = oldRender.call(this, ...args);

    if (Host.isIOS) {
        return React.cloneElement(origin, {
            style: [origin.props.style]
        });
    } else {
        return React.cloneElement(origin, {
            style: [origin.props.style, styles.defaultFontFamily]
        });
    }
};

export default class App extends React.Component {
    render() {
        return <RootStack/>;
    }
}

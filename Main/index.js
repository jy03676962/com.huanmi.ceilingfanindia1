import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {TitleBarBlack, TitleBarWhite} from 'miot/ui';
import SceneMain from './Page/SceneMain';
import MainPage from './Page/MainPage';
import MHSetting from "./Page/MHSetting";
import {API_LEVEL, Package, Device, Service, Host, Entrance} from 'miot';

function createRootStack(initPage) {
    return createStackNavigator({
            Home: MainPage,
            SceneMain: SceneMain,
            SettingPage: MHSetting,
        },
        {
            initialRouteName: initPage,
            navigationOptions: ({navigation}) => {
                return {
                    header: <TitleBarBlack title={navigation.state.params ? navigation.state.params.title : ''}
                                           style={{backgroundColor: '#fff'}}
                                           onPressLeft={() => {
                                               navigation.goBack();
                                           }}/>,
                };
            },
        });
}

// //解决Android字串显示不全问题
// const styles = StyleSheet.create({
//     defaultFontFamily: {
//         fontFamily: 'lucida grande',    // 可以试试 fontFamily: '',
//     }
// });
//
// const oldRender = Text.prototype.render;
// Text.prototype.render = function (...args) {
//     const origin = oldRender.call(this, ...args);
//
//     if (Host.isIOS) {
//         return React.cloneElement(origin, {
//             style: [origin.props.style]
//         });
//     } else {
//         return React.cloneElement(origin, {
//             style: [origin.props.style, styles.defaultFontFamily]
//         });
//     }
// };
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.initData()
    }

    /**
     * 也可以在此判断，需要进入插件哪个页面
     */
    initData() {
        this.initPage = "Home";
        switch (Package.entrance) {
            case Entrance.Scene:
                this.initPage = "SceneMain";
                break;
            default:
                this.initPage = "Home";
                break;
        }
        if (Package.pageParams && Package.pageParams.isBackToMainPage) {
            // 需要返回到首页，则首先进入到插件首页，然后插件首页中跳转到真正需要跳转到的page页面
            this.initPage = "Home";
        }
    }

    render() {
        let RootStack = createRootStack(this.initPage);
        return <RootStack />
    }
}

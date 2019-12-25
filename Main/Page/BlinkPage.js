import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Blink extends Component {
    // 声明state对象
    state = {isShowingText: true};

    componentDidMount() {
        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState({
                isShowingText: !this.state.isShowingText
            });
        }, 1000);
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        if (!this.state.isShowingText) {
            return null;
        }

        return (
            <Text style={[
                styles.bigBlue,
                {
                    backgroundColor: this.props.color,
                    alignSelf:'center',
                }
                // {flex: 1}
                ]}
            >{this.props.text}
            </Text>
        );
    }
}

export default class BlinkPage extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                //alignContent:'flex-start',
                flexWrap:'wrap',

            }}>
                <Blink text='I love to blink' color='powderblue'/>
                <Blink text='Yes blinking is so great' color='red'/>
                <Blink text='Why did they ever take this out of HTML' color={'yellow'}/>
                <Blink text='Look at me look at me look at me' color={'orange'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});

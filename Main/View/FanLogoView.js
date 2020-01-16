import React, {Component} from 'react';
import {StyleSheet, Button, Alert, Animated, Easing} from 'react-native'
import {View, Text,} from 'react-native';

let timeFanSpin = 2000;

export default class FanLogoView extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.isPlaying = false;
        this.spinValue = new Animated.Value(0);
        this.spinAnimated = Animated.timing(this.spinValue, {
            toValue: 1, //角度从0变1
            duration: timeFanSpin, //从0到1的时间
            easing: Easing.inOut(Easing.linear), //线性变化，匀速旋转
        });
    }

    rotating() {
        if (this.isPlaying) {
            this.spinValue.setValue(0);
            this.spinAnimated.start(() => {
                this.rotating()
            })
        }
    };

    startPlay() {
        this.spinAnimated.start(() => {
            this.spinAnimated = Animated.timing(this.spinValue, {
                toValue: 1, //角度从0变1
                duration: timeFanSpin, //从0到1的时间
                easing: Easing.inOut(Easing.linear), //线性变化，匀速旋转
            });
            this.rotating();
        });
    }

    stopPlay() {
        this.spinValue.stopAnimation((oneTimeRotate) => {
            console.log('rotateValue:' + oneTimeRotate);
            //计算角度比例
            this.spinAnimated = Animated.timing(this.spinValue, {
                toValue: 1,
                duration: (1 - oneTimeRotate) * timeFanSpin,
                easing: Easing.inOut(Easing.linear),
            });
        });
    }

    _onPressButton() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying === true) {
            // this.setState({
            //     playImage: require('./resources/images/pause.png'),
            // });
            this.startPlay();
            Alert.alert('Start fan!')
        } else {
            // this.setState({
            //     playImage: require('./resources/images/play.png'),
            // });
            this.stopPlay();
            Alert.alert('Stop fan!')
        }
    }

    render() {
        // 利用 interpolate 方法将数值 0~1 映射到了 0deg~360deg
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View style={styles.mainView}>
                <View style={styles.logoView}>
                    <Animated.Image
                        style={{
                            width: 227,
                            height: 200,
                            transform: [{rotate: spin}] }}
                        source={require('../../Resources/fan.png')}
                    />
                </View>
                <Button
                    onPress={this._onPressButton.bind(this)}
                    title="Press Me"
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    imagesStyle: {
        width: 300,
        height: 300,
    },
});
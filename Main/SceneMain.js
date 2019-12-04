import React ,{Component}from "react";
import { Package } from 'miot';
import { View, Button } from 'react-native';
import { TitleBar } from 'miot/ui';

export default class SceneMain extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log("native传过来的参数为：", JSON.stringify(Package.entryInfo));
    }

    render() {
        return (<View style={styles.pageContanier}>
            <TitleBar
                type="dark"
                style={{ marginBottom: 25 }}
                leftText="返回"
                onPressLeft={() => this._cancel()}
                title="if测试"
            />
            <Button color="#f7632a" onPress={() => { this._save() }} title="点我保存" ></Button>
        </View>);
    }
}
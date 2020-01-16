import App from './Main/index'
import SceneMain from './Main/Page/SceneMain'
import { Package,Device, Entrance, PackageEvent,Host } from "miot";

PackageEvent.packageAuthorizationCancel.addListener(()=>{
    console.log("packageAuthorizationCancel");
    let licenseKey = "license-"+Device.deviceID;
    Host.storage.set(licenseKey, false);
    Package.exit();
})


// console.log('Package:'+Package.models);

switch (Package.entrance) {
    case Entrance.Scene:
        Package.entry(SceneMain, _ => {
        });
        break;
    default:
        Package.entry(App, _ => {
        });
        break;
}
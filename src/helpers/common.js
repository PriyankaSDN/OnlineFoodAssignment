import Toast from 'react-native-simple-toast';
import NetInfo from '@react-native-community/netinfo';
import store,{storeObj} from '@store/setup'
const toast = args => Toast.show(args)
const isInternet=async() =>await NetInfo.isConnected.fetch().then(isConnected => isConnected)
let accessToken=()=>storeObj.store.getState().authReducer.loginToken
export { toast, isInternet,accessToken }
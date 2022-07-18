import http from './httpService'
import config from '../config.json'

// const apiEndpoint = config.apiUrl + '/wallet/stake1u8nlkz48sph4mtcddes4k2kdw776qcvszrqpvxuyy2jsn0s2hf7yp'
const apiEndpoint = config.apiUrl_dev
export function getAssets(path) {
    // console.log(path)
    // return http.get(apiEndpoint);
    return http.get(apiEndpoint + '/wallets' + path);
}

export async function addWalletAssets(path) {    
    return await http.get(apiEndpoint + '/wallets/insert' + path);
    // return http.get(apiEndpoint + '/wallet' + path);
}
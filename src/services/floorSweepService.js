import http from './httpService'
import config from '../config.json'

// const apiEndpoint = config.apiUrl + '/wallet/stake1u8nlkz48sph4mtcddes4k2kdw776qcvszrqpvxuyy2jsn0s2hf7yp'
// const apiEndpoint = config.apiUrl_prod
export async function getFloorSweeps(policyId, perPage) {
    // console.log(path)
    // return http.get(apiEndpoint);
    // return http.get(apiEndpoint + '/wallets' + path);
    const data = await http.get(`https://api.cnftjungle.app/collections/${policyId}?page=1&perPage=${perPage}&sort=price&sortDirection=asc&traitFilterLogic=union&onSale=true`);
    return data.data.assets
}
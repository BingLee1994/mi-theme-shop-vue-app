import axios from 'axios'

let Env = {
    host: '192.168.3.8',
    port: '4201',
    serviceName: 'api'
}

let { host, port, serviceName } = Env
const timeout = 5 * 1000
const baseURL = `http://${host}:${port}`

let service = {
    search: {
        type: 'search',
        recommend: 'search/recommend',
        style: 'search/style',
        adv: 'search/adviertisement',
        index: 'search/index'
    }
}

const api = axios.create({
    baseURL: [baseURL, serviceName].join('/'),
    timeout: timeout
})

const server = {
    fetchSearchScreenData(category) {
        return api.get(service.search.index, { params: { category } })
    },
    getSearchRecommend(type = 'theme') {
        return api.get(service.search.recommend, { params: { type } })
    },
    getSearchStyle(type = 'theme') {
        return api.get(service.search.style, { params: { type } })
    },
    getSearchAdv(type = 'theme') {
        return api.get(service.search.adv, { params: { type } })
    }
}

window.server = server

export { api, service, baseURL }
export default server

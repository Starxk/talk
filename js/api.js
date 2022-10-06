const API = (() => {
    const BAST_URL = 'https://study.duyiedu.com';
    const TOKEN_KEY = 'token';

    /**
     * 获取数据
     * @param {string} url 一个url地址
     * @returns Pomise
     */
    function get(url) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BAST_URL + url, { headers })
    }

    /**
     * 接收数据
     * @param {string} url url地址
     * @param {object} bodyObj 请求体 对象
     * @returns Pomise
     */
    function post(url, bodyObj) {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BAST_URL + url, { headers, method: 'POST', body: JSON.stringify(bodyObj) })
    }

    /**
     * 注册
     * @param {object} userInfo 
     * @returns Pomise
     */
    async function reg(userInfo) {
        const data = await post(`/api/user/reg`, userInfo)
        return await data.json();
    };

    /**
     * 登录
     * @param {object} loginInfo 
     * @returns Pomise
     */
    async function login(loginInfo) {
        const data = await post(`/api/user/login`, loginInfo)

        const result = await data.json();

        if (result.code === 0) {
            const token = data.headers.get('authorization');
            localStorage.setItem(TOKEN_KEY, token);
        }

        return result;
    };

    /**
     * 查询账号是否存在
     * @param {object} loginId 
     * @returns Pomise
     */
    async function exists(loginId) {
        const data = await get(`/api/user/exists?loginId=${loginId}`);
        return await data.json();
    };

    /**
     * 当前登录的用户信息
     * @returns Pomise
     */
    async function profile() {
        const data = await get(`/api/user/profile`);
        return await data.json();
    };

    /**
     * 发送聊天记录
     * @param {object} content 
     * @returns Pomise
     */
    async function sendChat(content) {
        const data = await post(`/api/chat`, content);
        return await data.json();
    };

    /**
     * 获取聊天记录
     * @returns Pomise
     */
    async function getHistory() {
        const data = await get(`/api/chat/history`);
        return await data.json();
    };

    /**
     * 取消登录
     */
    function loginOut() {
        localStorage.removeItem(TOKEN_KEY);
    }

    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut
    }
})();
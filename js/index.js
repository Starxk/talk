(() => {
    const doms = {
        nickname: $('#nickname'),
        loginId: $('#loginId'),
        chatContainer: $('.chat-container'),
        msgContainer: $('.msg-container'),
        close: $('.close'),
        txtMsg: $('#txtMsg')
    }

    /**
     * 初始化函数
     */
    async function init() {
        const n = await API.profile();
        if (n.code) {
            alert('请先进行登录');
            location.href = 'login.html'
        }
        doms.loginId.innerText = n.data.loginId;
        doms.nickname.innerText = n.data.nickname;
        creatChatHistory()
    }

    /**
     * 初始化最开始的聊天记录
     */

    async function creatChatHistory() {
        const chatHistory = await API.getHistory();
        console.log(chatHistory);
        for (const item of chatHistory.data) {
            const n = createDoms(item);
            doms.chatContainer.appendChild(n);
        }
    }

    /**
     * 创建dom对象
     * @param {Object} obj 
     */
    function createDoms(obj) {
        const createDoms = {
            chatItem: $$$('div'),
            chatAvatar: $$$('img'),
            chatContent: $$$('div'),
            chatDate: $$$('div')
        }
        createDoms.chatItem.classList.add('chat-item');
        createDoms.chatAvatar.classList.add('chat-avatar');
        createDoms.chatContent.classList.add('chat-content');
        createDoms.chatDate.classList.add('chat-date');
        createDoms.chatContent.innerText = obj.content;
        createDoms.chatDate.innerText = CalculationTime(obj.createdAt);
        if (obj.to === null) {
            createDoms.chatItem.classList.add('me');
            createDoms.chatAvatar.src = './asset/avatar.png';
        } else {
            createDoms.chatAvatar.src = './asset/robot-avatar.jpg';
        }
        createDoms.chatItem.appendChild(createDoms.chatAvatar);
        createDoms.chatItem.appendChild(createDoms.chatContent);
        createDoms.chatItem.appendChild(createDoms.chatDate);
        return createDoms.chatItem;
    }

    /**
     * 时间的计算
     * @param {Number} time 
     */
    function CalculationTime(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, 0);
        const day = date.getDate().toString().padStart(2, 0);
        const hour = date.getHours().toString().padStart(2, 0);
        const minute = date.getMinutes().toString().padStart(2, 0);
        const m = date.getSeconds().toString().padStart(2, 0);
        return `${year}-${month}-${day} ${hour}:${minute}:${m}`;
    }

    /**
     * 主程序
     */
    function main() {
        init();
        bindEvent();
    }

    function bindEvent() {
        doms.close.addEventListener('click', function() {
            API.loginOut();
            location.href = 'login.html';
        })
        doms.msgContainer.addEventListener('submit', async function(e) {
            e.preventDefault();
            const time = Date.now();
            const div = createDoms({
                content: doms.txtMsg.value,
                createdAt: time,
                to: null,
            })
            doms.chatContainer.appendChild(div);
            const n = await API.sendChat({
                content: doms.txtMsg.value
            });
            const div_ = createDoms({
                content: n.data.content,
                createdAt: n.data.createdAt,
            })
            doms.chatContainer.appendChild(div_);
        })
    }

    main();
})();
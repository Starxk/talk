const txtLoginId = new FieldValidator('txtLoginId', function(val) {
    if (!val) {
        return '请填写登录账号';
    }
})

const txtLoginPwd = new FieldValidator('txtLoginPwd', function(val) {
    if (!val) {
        return '请填写登录密码';
    }
})

const userForm = document.querySelector('.user-form');
userForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const result = await FieldValidator.validata(txtLoginId, txtLoginPwd);
    if (result) {
        const result = await API.login({
            loginId: txtLoginId.input.value,
            loginPwd: txtLoginPwd.input.value
        });
        if (result.code) {
            txtLoginId.p.innerText = result.msg;
            return;
        } else {
            alert('登录成功');
            location.href = 'index.html';
        }
    }
})
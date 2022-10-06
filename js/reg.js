const txtLoginId = new FieldValidator('txtLoginId', async function(val) {
    if (!val) {
        return '请填写注册账号';
    } else {
        const result = await API.exists(val);
        if (result.data) {
            return '账号已经被注册'
        }
    }
});

const txtNickname = new FieldValidator('txtNickname', function(val) {
    if (!val) {
        return '请填写注册昵称';
    }
})

const txtLoginPwd = new FieldValidator('txtLoginPwd', function(val) {
    if (!val) {
        return '请填写注册密码';
    }
})

const txtLoginPwdConfirm = new FieldValidator('txtLoginPwdConfirm', function(val) {
    if (!val) {
        return '请输入确认密码'
    } else {
        if (val !== txtLoginPwd.input.value) {
            return '确认密码必须与密码一致';
        }
    }
})

const userForm = document.querySelector('.user-form');
userForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const result = await FieldValidator.validata(txtLoginId, txtNickname, txtLoginPwd, txtLoginPwdConfirm);
    if (result) {
        alert('注册成功,点击确认,返回登录页')
        const result = await API.reg({
            loginId: txtLoginId.input.value,
            nickname: txtNickname.input.value,
            loginPwd: txtLoginPwd.input.value
        });
        if (!result.code) {
            location.href = 'login.html';
        }
    }
})
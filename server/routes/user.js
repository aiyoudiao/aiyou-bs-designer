/* eslint-disable */
const Router = require('koa-router');
const userModel = require('../models/user');

const router = new Router();
router.prefix('/user');

router.post('/login', async (ctx, next) => {
  const body = ctx.request.body;
  const username = body.username;
  const password = body.password;

  const u = await userModel.findOne().
    where('username').equals(username).
    where('password').equals(password);
  if (u) {
    ctx.body = {
      errno: 0,
      data: {
        uid: u._id,
        name: u.username
      }
    }
  } else {
    ctx.body = {
      errno: 1,
      errmsg: '用户名或密码错误'
    }
  }
});

router.post('/reg', async (ctx, next) => {
  const body = ctx.request.body;

  // 检查是否存在
  const row = await userModel.findOne().
    where('username').equals(body.username);
  if (row) {
    ctx.body = {
      errno: 2,
      errmsg: '用户名已存在',
      row: row
    }
  } else {
    const u = await userModel.create({
      username: body.username,
      password: body.password
    });
    ctx.body = {
      errno: 0,
      data: {
        uid: u._id,
        name: u.username
      }
    }
  }
});


const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

router.get('/info', async (ctx, next) => {

  // const { token } = ctx.query
  const token = 'admin-token'
  const info = users[token]

  ctx.body = {
    ...info
  }
});

router.post('/logout', async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: 'success'
  }
});

module.exports = router;

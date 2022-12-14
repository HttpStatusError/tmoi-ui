import styles from './index.module.css';
import {Button, Form, Input, Modal} from "antd";
import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {changeShowLogin} from "../../../redux/commonSlice";

const Login = () => {
  const { showLogin } = useSelector(state => state.commonSlice)
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <Modal title={'账号登录'} open={showLogin} footer={null} onCancel={() => dispatch(changeShowLogin(false))} style={{ maxWidth: '26rem' }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{ marginTop: '1.6rem' }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" style={{ borderRadius: 2 }}/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
              style={{ borderRadius: 2 }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.btn} block={true}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.agreementBox}>
          注册登录即表示同意 用户协议、隐私政策
        </div>
      </Modal>
    </>
  )
}

export default Login;
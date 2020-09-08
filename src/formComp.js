import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import 'antd/dist/antd.css'

class NormalLoginForm extends Component {
    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <Form.Item>
                        <Input placeholder="Username" prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} />
                    </Form.Item>

                    <Form.Item>
                        <Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} type="password" placeholder="Password" />} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Login</Button>
                    </Form.Item>

                </Form>
            </div>
        )
    }
}


export default NormalLoginForm
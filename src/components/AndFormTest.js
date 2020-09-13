import React, { Component } from 'react'
import { Button} from 'antd'
import {GithubFilled, LockTwoTone} from '@ant-design/icons'
import "antd/dist/antd.css"

// 包裹子组件，展示错误信息
class FormItem extends Component {
    render() {
        return (
            <div className="formItem">
                {this.props.children}
                {this.props.validateStatus === 'error' && (
                    <p style={{ color: 'red' }}>{this.props.message}</p>
                )}
            </div>
        );
    }
}

// KInput 组件
class KInput extends Component {

    render() {
        const { name, onChange, value, prefix, placeholder, type, onFocus } = this.props
        return (<div>
            {prefix}
            <input name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} onFocus={onFocus} />
        </div>);
    }
}


class KForm extends Component {
    handleSubmit = () => {
        const { validateFields } = this.props
        validateFields && validateFields((isValid, data) => {
            if (isValid) {
                console.log('提交数据', data);
            } else {
                console.log('提交失败', data);
                alert('校验失败')
            }
        })
    }
    render() {
        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props
        const userNameError = isFieldTouched('userName') && getFieldError('userName')
        const pwdError = isFieldTouched('password') && getFieldError('password')
        return (
            <div>
                <FormItem validateStatus={userNameError ? 'error' : ''} message={userNameError || ''}>
                    {getFieldDecorator("userName", {
                        rules: [{
                            required: true, message: "Please input your username!"
                        }]
                    })(
                    <KInput type="text" prefix={<GithubFilled /> } />
                        
                    )}

                </FormItem>

                <FormItem validateStatus={pwdError ? 'error' : ''} message={pwdError || ''}>
                    {getFieldDecorator("password", {
                        rules: [{
                            required: true, message: "Please input your password!"
                        }]
                    })(
                        <KInput type="password" prefix={<LockTwoTone /> } />
                    )}

                </FormItem>

                <Button onClick={this.handleSubmit}>登陆</Button>
            </div>
        )
    }
}


function kFormCreate(Comp) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.options = {}
            this.state = {
            }
        }
        handleOnChange = (e) => {

            const { name, value } = e.target
            // 获取input输入框的值存储到state中
            this.setState({
                [name]: value
            }, () => {
                // 进行控件值的校验
                this.validateField(name)
            })
        }

        handleOnFocus = (e) => {
            const { name } = e.target
            this.setState({
                [name + 'Focus']: true
            })
        }

        isFieldTouched = (field) => {
            return !!this.state[field + 'Focus']
        }


        validateField = (field) => {
            const rules = this.options[field].rules // 获取校验规则
            console.log('rules: ', rules);

            const ret = !rules.some((rule) => {
                if (rule.required) {
                    // 校验必填项
                    if (!this.state[field]) {
                        this.setState({
                            // 错误信息设置
                            [field + 'Message']: rule.message
                        })
                        return true
                    }

                }
            })
            // 若校验成功，清除错误信息
            if (ret) {
                this.setState({
                    [field + "Message"]: ''
                })
            }

            return ret

        }

        getFieldDecorator = (field, options) => {
            this.options[field] = options
            return inputComp => (<div>
                {
                    React.cloneElement(inputComp, {
                        name: field,
                        value: this.state[field] || '', // 控件初始值
                        onChange: this.handleOnChange,
                        onFocus: this.handleOnFocus
                    })
                }
            </div>)
        }

        validateFields = (cb) => {
            console.log('提交校验');
            // 对每一项进行校验
            const rets = Object.keys(this.options).map(field => {
                return this.validateField(field)
            })
            const ret = rets.every((v) => v === true)
            cb(ret, this.state)
        }

        getFieldError = (field) => {
            return this.state[field + 'Message']
        }

        render() {
            return (
                <Comp
                    {...this.props}
                    getFieldDecorator={this.getFieldDecorator}
                    validateFields={this.validateFields}
                    getFieldError={this.getFieldError}
                    isFieldTouched={this.isFieldTouched}
                />
            )
        }
    }

}

const withForm = kFormCreate(KForm)

export default withForm

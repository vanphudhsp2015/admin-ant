import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import * as messages from "../../contants/messages";
const FormItem = Form.Item;
class FormLoginComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "",
      password: "",
      confirm_password: "",
      old_password: "",
      confirmDirty: false
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.isLogin) {
          this.props.onLogin(this.state);
        } else {
          this.props.onRegister(this.state);
        }
      }
    });
  };
  handleResetSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onResetPassword(this.state);
      }
    });
  };
  onChanger = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm_password"], { force: true });
    }
    callback();
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const contentMain = () => {
      if (this.props.views === "LOGIN") {
        return (
          <Form onSubmit={this.handleSubmit} className="form">
            <FormItem
              className="form__group"
              hasFeedback
              help={messages.MESSAGES_HELP.replace("{value}", "username")}
            >
              {getFieldDecorator("username", {
                initialValue: this.state.username,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace(
                      "{value}",
                      "username"
                    )
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="Username"
                  className="input"
                  autoComplete="current-username"
                  name="username"
                  onChange={this.onChanger}
                />
              )}
            </FormItem>
            <FormItem
              className="form__group"
              hasFeedback
              help={messages.MESSAGES_HELP_PASSWORD}
            >
              {getFieldDecorator("password", {
                initialValue: this.state.password,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace(
                      "{value}",
                      "password"
                    )
                  }
                ]
              })(
                <Input.Password
                  prefix={<Icon type="lock" />}
                  placeholder="Password"
                  className="input"
                  autoComplete="current-password"
                  name="password"
                  onChange={this.onChanger}
                />
              )}
            </FormItem>
            <FormItem className="form__group">
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
            </FormItem>
            <FormItem className="form__group">
              <Button type="primary" htmlType="submit" className="button">
                Log in
              </Button>
            </FormItem>
          </Form>
        );
      } else if (this.props.views === "RESET") {
        let pattern = /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\\]{8,30}$/;
        return (
          <Form onSubmit={this.handleResetSubmit} className="form">
            <FormItem
              className="form__group"
              hasFeedback
              help={messages.MESSAGES_HELP.replace("{value}", "username")}
            >
              {getFieldDecorator("username", {
                initialValue: this.state.username,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace(
                      "{value}",
                      "username"
                    )
                  },
                  {
                    min: 8,
                    message: messages.MESSAGES_MAX.replace("{value}", 8)
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="Username"
                  className="input"
                  autoComplete="current-username"
                  name="username"
                  onChange={this.onChanger}
                />
              )}
            </FormItem>
            <FormItem className="form__group" hasFeedback>
              {getFieldDecorator("old_password", {
                initialValue: this.state.old_password,
                rules: [
                  {
                    pattern,
                    required: true,
                    message: messages.MESSAGES_PASSWORD_VALIDATE
                  }
                ]
              })(
                <Input.Password
                  prefix={<Icon type="lock" />}
                  placeholder="Old Password"
                  className="input"
                  autoComplete="old-password"
                  name="old_password"
                  onChange={this.onChanger}
                />
              )}
            </FormItem>
            <FormItem className="form__group" hasFeedback>
              {getFieldDecorator("password", {
                initialValue: this.state.password,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_PASSWORD_VALIDATE
                  }
                ]
              })(
                <Input.Password
                  prefix={<Icon type="issues-close" />}
                  placeholder="Please enter the  new password"
                  className="input"
                  autoComplete="new-password"
                  name="password"
                  onChange={this.onChanger}
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </FormItem>
            <FormItem className="form__group">
              <Button type="primary" htmlType="submit" className="button">
                Reset
              </Button>
            </FormItem>
          </Form>
        );
      } else {
        let pattern = /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\\]{8,30}$/;
        return (
          <Form onSubmit={this.handleSubmit} className="form">
            <FormItem
              className="form__group"
              hasFeedback
              help={messages.MESSAGES_HELP.replace("{value}", "username")}
            >
              {getFieldDecorator("username", {
                initialValue: this.state.username,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace(
                      "{value}",
                      "username"
                    )
                  },
                  {
                    min: 8,
                    message: messages.MESSAGES_MAX.replace("{value}", 8)
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="Username"
                  className="input"
                  autoComplete="current-username"
                  name="username"
                  onChange={this.onChanger}
                />
              )}
            </FormItem>
            <FormItem className="form__group" hasFeedback>
              {getFieldDecorator("password", {
                initialValue: this.state.password,
                rules: [
                  {
                    pattern,
                    required: true,
                    message: messages.MESSAGES_PASSWORD_VALIDATE
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={<Icon type="lock" />}
                  placeholder="Password"
                  className="input"
                  autoComplete="current-password"
                  name="password"
                  onChange={this.onChanger}
                />
              )}
            </FormItem>
            <FormItem className="form__group" hasFeedback>
              {getFieldDecorator("confirm_password", {
                initialValue: this.state.confirm_password,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_PASSWORD_VALIDATE
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={<Icon type="issues-close" />}
                  placeholder="Please re-enter the password"
                  className="input"
                  autoComplete="current-password"
                  name="confirm_password"
                  onChange={this.onChanger}
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </FormItem>
            <FormItem className="form__group">
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
            </FormItem>
            <FormItem className="form__group">
              <Button type="primary" htmlType="submit" className="button">
                Register
              </Button>
            </FormItem>
          </Form>
        );
      }
    };
    return <div className="login__main">{contentMain()}</div>;
  }
}

FormLoginComponent.propTypes = {
  title: PropTypes.string,
  onLogin: PropTypes.func,
  views: PropTypes.string,
  isLogin: PropTypes.bool
};

export default Form.create({})(FormLoginComponent);

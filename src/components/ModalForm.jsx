import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button, Input, Upload, Icon } from "antd";
import * as messages from "../contants/messages";
class ModalForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: "",
      images: "",
      author: "",
      categories: "",
      tags: "",
      visibility: ""
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.edit !== prevProps.edit) {
      let { dataEdit, edit } = this.props;
      this.setState({
        id: edit ? dataEdit.id : "",
        title: edit ? dataEdit.title : "",
        author: edit ? dataEdit.author : "",
        categories: edit ? dataEdit.categories : "",
        tags: edit ? dataEdit.tags : "",
        visibility: edit ? dataEdit.visibility : ""
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.edit) {
          values.id = this.state.id;
          this.props.onUpdate(values);
        } else {
          this.props.onAdd(values);
        }
        this.props.form.resetFields();
      }
    });
  };
  hanlderResetData() {
    this.setState({
      title: "",
      images: "",
      author: "",
      categories: "",
      tags: "",
      visibility: ""
    });
  }
  onReset = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };
  handleupload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  render() {
    const { title, handleOk, handleCancel } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={title}
        visible={this.props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        className="modal__content"
      >
        <div className="modal__form">
          <Form className="form" onSubmit={this.handleSubmit}>
            <Form.Item
              label="Title"
              className="form__group"
              hasFeedback
              help={messages.MESSAGES_FORM.replace("{value}", "title")}
            >
              {getFieldDecorator("title", {
                initialValue: this.state.title,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace("{value}", "title"),
                    whitespace: true
                  }
                ]
              })(<Input className="input" />)}
            </Form.Item>
            <Form.Item label="Author" className="form__group" hasFeedback>
              {getFieldDecorator("author", {
                initialValue: this.state.author,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace(
                      "{value}",
                      "author"
                    ),
                    whitespace: true
                  }
                ]
              })(<Input className="input" />)}
            </Form.Item>
            <Form.Item label="Categories" className="form__group" hasFeedback>
              {getFieldDecorator("categories", {
                initialValue: this.state.categories,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace(
                      "{value}",
                      "categories"
                    ),
                    whitespace: true
                  }
                ]
              })(<Input className="input" />)}
            </Form.Item>
            <Form.Item label="tags" className="form__group" hasFeedback>
              {getFieldDecorator("tags", {
                initialValue: this.state.tags,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace("{value}", "tags"),
                    whitespace: true
                  }
                ]
              })(<Input className="input" />)}
            </Form.Item>
            <Form.Item label="visibility" className="form__group" hasFeedback>
              {getFieldDecorator("visibility", {
                initialValue: this.state.visibility,
                rules: [
                  {
                    required: true,
                    message: messages.MESSAGES_FORM.replace(
                      "{value}",
                      "visibility"
                    ),
                    whitespace: true
                  }
                ]
              })(<Input className="input" />)}
            </Form.Item>
            <Form.Item label="Images" className="form__group">
              {getFieldDecorator("images", {
                initialValue: this.state.images
              })(
                <Upload accept=".png" customRequest={this.handleupload}>
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item className="form__group--right p-3">
              <Button
                type="default"
                htmlType="reset"
                className="button"
                onClick={this.onReset}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit" className="button">
                Ok
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
}

ModalForm.propTypes = {
  title: PropTypes.string
};
export default Form.create()(ModalForm);

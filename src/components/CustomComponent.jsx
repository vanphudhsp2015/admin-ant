import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Input,
  Button,
  Table,
  Avatar,
  Dropdown,
  Menu,
  Icon,
  Modal
} from "antd";
import ModalForm from "./ModalForm";
import moment from "moment";
import * as messages from "../contants/messages";
const { confirm } = Modal;
const { Search } = Input;
class CustomComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      selectedRows: [],
      selectedRowKeys: "",
      dataEdit: {},
      edit: false
    };
  }
  handleOk = event => {
    this.setState({
      visible: true
    });
  };
  handleCancel = event => {
    this.setState({
      visible: false,
      edit: false,
      dataEdit: {}
    });
  };
  onCreate = () => {
    this.setState({
      visible: true
    });
  };
  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  };
  getCheckboxProps = record => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  });
  handleButtonClick = event => () => {
    // message.info('Click on left button.');
    this.setState({
      id: event.id
    });
  };
  onDelete = () => {
    var { onDelete } = this.props;
    var { id } = this.state;
    confirm({
      title: "Do you Want to delete these items?",
      content: "Some descriptions",
      onOk() {
        onDelete(id);
      },
      onCancel() {}
    });
  };
  onRemove = () => {
    var { onDeleteAll } = this.props;
    var { selectedRows } = this.state;
    var self = this;
    confirm({
      title: "Do you Want to delete these items?",
      content: "Some descriptions",
      onOk() {
        onDeleteAll(selectedRows);
        self.setState({
          selectedRows: ""
        });
      },
      onCancel() {}
    });
  };
  onAdd = data => {
    this.props.onAdd(data);
    this.setState({
      visible: false
    });
  };
  onUpdate = data => {
    this.props.onUpdate(data);
    this.setState({
      visible: false,
      edit: false,
      dataEdit: {}
    });
  };
  onEdit = () => {
    let { data } = this.props;
    let { id } = this.state;
    let dataEdit = data.filter(item => item.id === id);
    if (dataEdit.length > 0) {
      this.setState({
        dataEdit: dataEdit[0],
        visible: true,
        edit: true
      });
    }
  };
  convertClass = values => {
    if (values % 2 === 0) {
      return "avatar--current";
    } else if (values % 3 === 0) {
      return "avatar--active";
    } else {
      return "avatar";
    }
  };
  onSearch = value => {
    this.props.onFilter(value);
    this.setState({
      isFilter: true
    });
  };
  onResetData = () => {
    this.setState({
      isFilter: false
    });
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Button type="danger" onClick={this.onDelete}>
            Delete
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="primary" onClick={this.onEdit}>
            Edit
          </Button>
        </Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: "ID",
        width: 100,
        dataIndex: "id",
        key: "id",
        fixed: "left"
      },
      {
        title: "Images",
        width: 100,
        dataIndex: "author",
        key: "images",
        fixed: "left",
        render: (text, row, index) => (
          <Avatar className={this.convertClass(index)} size="large">
            {text.charAt(0)}
          </Avatar>
        )
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: 110
      },
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
        width: 150
      },
      {
        title: "Categories",
        dataIndex: "categories",
        key: "categories",
        width: 150
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        width: 150
      },
      {
        title: "Visibility",
        dataIndex: "visibility",
        key: "visibility",
        width: 150
      },
      {
        title: "Commnets",
        dataIndex: "commnets",
        key: "commnets",
        width: 150
      },
      {
        title: "Views",
        dataIndex: "views",
        key: "views",
        width: 150
      },
      {
        title: "Date_create",
        dataIndex: "date_create",
        key: "date_create",
        render: text => <p>{moment(text).format("DD/MM/YYYY HH:mm")}</p>
      },
      {
        title: "Delete",
        key: "operation",
        fixed: "right",
        width: 100,
        render: event => (
          <Dropdown
            onClick={this.handleButtonClick(event)}
            overlay={menu}
            trigger={["click"]}
          >
            <Button type="ghost">
              <Icon type="down-square" />
            </Button>
          </Dropdown>
        )
      }
    ];
    return (
      <div className="custom">
        <ModalForm
          onUpdate={this.onUpdate}
          edit={this.state.edit}
          dataEdit={this.state.dataEdit}
          onAdd={this.onAdd}
          title={messages.MESSAGES_TITLE.replace("{value}", "User")}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
        <div className="custom__heading">
          <div className="row">
            <div className="col-lg-10">
              <Search
                placeholder="input search text"
                onSearch={this.onSearch}
                className="search"
              />
              <Search
                placeholder="input search text"
                // onSearch={value => console.log(value)}
                className="search"
              />
              <Button type="primary" className="button">
                Search
              </Button>
              <Button
                type="default"
                className="button"
                onClick={this.onResetData}
              >
                Reset
              </Button>
            </div>
            <div className="col-lg-2 text-right">
              <Button onClick={this.onCreate}>Create</Button>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-12 text-right">
              <div
                className={
                  this.state.selectedRows.length > 0
                    ? "content"
                    : "content--disable"
                }
              >
                <p className="content__norm">
                  Selected {this.state.selectedRows.length} items
                </p>
                <Button type="primary" onClick={this.onRemove}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="custom__content">
          <Table
            columns={columns}
            rowSelection={{
              onChange: this.onChange,
              getCheckboxProps: this.getCheckboxProps
            }}
            bordered
            dataSource={
              this.state.isFilter ? this.props.filter : this.props.data
            }
            scroll={{
              x: 1700,
              y: 500
            }}
            loading={this.props.fetching}
            className="table"
            hasData
          />
        </div>
      </div>
    );
  }
}
CustomComponent.propTypes = {
  name: PropTypes.string,
  fetching: PropTypes.bool
};
export default CustomComponent;

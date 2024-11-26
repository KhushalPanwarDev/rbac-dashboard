import React, { useState, useRef, useMemo } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Button,
  Tag,
  Dropdown,
  notification,
  Drawer,
  Menu,
  Space,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  LockOutlined,
  MoreOutlined,
  PlusOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Role, User } from "../../types";
import "./RbacDashboard.css";

// Mock data and simulated API
const INITIAL_USERS: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "super_admin",
    status: "active",
  },
  {
    id: "2",
    username: "editor",
    email: "editor@example.com",
    role: "content_editor",
    status: "active",
  },
];

const INITIAL_ROLES: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    permissions: ["read", "write", "delete", "manage_users"],
  },
  {
    id: "2",
    name: "Content Editor",
    permissions: ["read", "write"],
  },
];

const PERMISSION_OPTIONS = [
  "read",
  "write",
  "delete",
  "manage_users",
  "create_content",
  "approve_content",
];

const RbacDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");

  // User Management State
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Role Management State
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Mobile menu state
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  // Search and Filtering State
  const [userSearchText, setUserSearchText] = useState("");
  const [roleSearchText, setRoleSearchText] = useState("");

  // Pagination State
  const [userTableParams, setUserTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [roleTableParams, setRoleTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Refs for form reset
  const userFormRef = useRef<any>(null);
  const roleFormRef = useRef<any>(null);

  // Notification method
  const openNotification = (type: "success", message: string) => {
    notification[type]({
      message: "Notification",
      description: message,
      placement: "topRight",
    });
  };

  // Filtered and Sorted Users
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(userSearchText.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchText.toLowerCase()) ||
        user.role.toLowerCase().includes(userSearchText.toLowerCase())
    );
  }, [users, userSearchText]);

  // Filtered and Sorted Roles
  const filteredRoles = useMemo(() => {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(roleSearchText.toLowerCase()) ||
        role.permissions.some((perm) =>
          perm.toLowerCase().includes(roleSearchText.toLowerCase())
        )
    );
  }, [roles, roleSearchText]);

  // User Management Methods
  const handleAddUser = (values: any) => {
    const newUser: User = {
      id: String(users.length + 1),
      ...values,
      status: values.status || "active",
    };
    setUsers([...users, newUser]);
    setUserModalVisible(false);
    userFormRef.current?.resetFields();
    openNotification("success", "User added successfully");
  };

  const handleEditUser = (values: any) => {
    setUsers(
      users.map((user) =>
        user.id === editingUser?.id ? { ...user, ...values } : user
      )
    );
    setUserModalVisible(false);
    userFormRef.current?.resetFields();
    openNotification("success", "User updated successfully");
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    openNotification("success", "User deleted successfully");
  };

  // Role Management Methods
  const handleAddRole = (values: any) => {
    const newRole: Role = {
      id: String(roles.length + 1),
      ...values,
    };
    setRoles([...roles, newRole]);
    setRoleModalVisible(false);
    roleFormRef.current?.resetFields();
    openNotification("success", "Role added successfully");
  };

  const handleEditRole = (values: any) => {
    setRoles(
      roles.map((role) =>
        role.id === editingRole?.id ? { ...role, ...values } : role
      )
    );
    setRoleModalVisible(false);
    roleFormRef.current?.resetFields();
    openNotification("success", "Role updated successfully");
  };

  // User Table Columns
  const userColumns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a: User, b: User) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a: User, b: User) => a.role.localeCompare(b.role),
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: User) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                onClick: () => {
                  setEditingUser(record);
                  setUserModalVisible(true);
                },
              },
              {
                key: "delete",
                label: "Delete",
                danger: true,
                onClick: () => handleDeleteUser(record.id),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  // Role Table Columns
  const roleColumns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Role, b: Role) => a.name.localeCompare(b.name),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: string[]) => (
        <div className="flex space-x-2">
          {permissions.map((perm) => (
            <Tag key={perm} color="blue">
              {perm}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Role) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                onClick: () => {
                  setEditingRole(record);
                  setRoleModalVisible(true);
                },
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="dashboard flex flex-col h-screen">
      <div className="bg-white p-4 shadow-md flex items-center justify-between md:hidden">
        <h1 className="text-2xl font-bold flex-grow">RBAC Dashboard</h1>
        <Button
          icon={<MenuUnfoldOutlined />}
          onClick={() => setMobileMenuVisible(true)}
          type="text"
        />
      </div>

      <div className="bg-white p-4 shadow-md max-md:hidden">
        <h1 className="text-2xl font-bold">RBAC Dashboard</h1>
      </div>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        className="lg:hidden"
      >
        <Menu
          mode="vertical"
          selectedKeys={[activeTab]}
          onClick={({ key }) => {
            setActiveTab(key as "users" | "roles");
            setMobileMenuVisible(false);
          }}
        >
          <Menu.Item key="users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="roles" icon={<TeamOutlined />}>
            Roles & Permissions
          </Menu.Item>
        </Menu>
      </Drawer>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-gray-100 border-r max-md:hidden">
          <div className="p-4">
            <div
              className={`
                px-4 py-2 cursor-pointer rounded 
                ${
                  activeTab === "users"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }
              `}
              onClick={() => setActiveTab("users")}
            >
              <UserOutlined className="mr-2" /> Users
            </div>
            <div
              className={`
                mt-2 px-4 py-2 cursor-pointer rounded 
                ${
                  activeTab === "roles"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }
              `}
              onClick={() => setActiveTab("roles")}
            >
              <TeamOutlined className="mr-2" /> Roles & Permissions
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          {activeTab === "users" && (
            <div>
              <Space style={{ marginBottom: 16 }}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Search users"
                  allowClear
                  onChange={(e) => setUserSearchText(e.target.value)}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setEditingUser(null);
                    setUserModalVisible(true);
                  }}
                >
                  Add User
                </Button>
              </Space>
              <Table
                columns={userColumns}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{
                  ...userTableParams.pagination,
                  total: filteredUsers.length,
                  onChange: (page, pageSize) => {
                    setUserTableParams({
                      pagination: { current: page, pageSize },
                    });
                  },
                }}
                scroll={{ x: true }}
                size="small"
                // className="w-full"
              />
            </div>
          )}

          {activeTab === "roles" && (
            <div>
              <Space style={{ marginBottom: 16 }}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Search roles"
                  allowClear
                  onChange={(e) => setRoleSearchText(e.target.value)}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setEditingRole(null);
                    setRoleModalVisible(true);
                  }}
                >
                  Add Role
                </Button>
              </Space>
              <Table
                columns={roleColumns}
                dataSource={filteredRoles}
                rowKey="id"
                pagination={{
                  ...roleTableParams.pagination,
                  total: filteredRoles.length,
                  onChange: (page, pageSize) => {
                    setRoleTableParams({
                      pagination: { current: page, pageSize },
                    });
                  },
                }}
                scroll={{ x: true }}
                size="small"
              />
            </div>
          )}

          {/* User Modal */}
          <Modal
            title={editingUser ? "Edit User" : "Add User"}
            open={userModalVisible}
            onCancel={() => setUserModalVisible(false)}
            footer={null}
          >
            <Form
              ref={userFormRef}
              initialValues={editingUser || { status: "active" }}
              onFinish={editingUser ? handleEditUser : handleAddUser}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Role is required" }]}
              >
                <Select>
                  {roles.map((role) => (
                    <Select.Option key={role.id} value={role.name}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="status" label="Status" valuePropName="checked">
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingUser ? "Update User" : "Add User"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* Role Modal */}
          <Modal
            title={editingRole ? "Edit Role" : "Add Role"}
            open={roleModalVisible}
            onCancel={() => setRoleModalVisible(false)}
            footer={null}
          >
            <Form
              ref={roleFormRef}
              initialValues={editingRole || {}}
              onFinish={editingRole ? handleEditRole : handleAddRole}
            >
              <Form.Item
                name="name"
                label="Role Name"
                rules={[{ required: true, message: "Role name is required" }]}
              >
                <Input prefix={<TeamOutlined />} />
              </Form.Item>
              <Form.Item
                name="permissions"
                label="Permissions"
                rules={[
                  { required: true, message: "Select at least one permission" },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select permissions"
                >
                  {PERMISSION_OPTIONS.map((perm) => (
                    <Select.Option key={perm} value={perm}>
                      {perm}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingRole ? "Update Role" : "Add Role"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RbacDashboard;

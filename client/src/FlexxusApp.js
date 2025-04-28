import { useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useMyFlexxusContext } from "./Provider/MyProvider";
import ModalAddEdit from "./modals/ModalAddEdit";
import ModalDelete from "./modals/ModalDelete";
import LayoutCustom from "./Layout/Layout";
import "./styles/FlexxusApp.css";

function FlexxusApp() {
  const {
    loading,
    formFilters,
    dataUsers,
    handleGetUsuarios,
    handleAddEdit,
    handleDelete,
    pagination,
    setPagination,
  } = useMyFlexxusContext();
  const { Search } = Input;
  const columnsUsuarios = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "usuario",
      width: "25%",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "nombre",
      width: "25%",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "apellido",
      width: "25%",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "estado",
      render: (_, { status }) => (
        <Tag color={status === "inactive" ? "red" : "green"} key={status}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, rowData) => (
        <Space size="middle">
          <button
            onClick={() => handleAddEdit(rowData)}
            style={{
              background: "none",
              border: "none",
              color: "#1677ff",
              cursor: "pointer",
            }}
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(rowData)}
            style={{
              background: "none",
              border: "none",
              color: "#1677ff",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetUsuarios();
  }, [pagination.current]);

  return (
    <>
      <LayoutCustom>
        <Flex gap={16} vertical>
          <Breadcrumb>
            <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
            <Breadcrumb.Item>Listado de Usuarios</Breadcrumb.Item>
          </Breadcrumb>
          <Flex justify="space-between">
            <Form
              form={formFilters}
              layout="inline"
              disabled={loading}
              onFinish={(values) => handleGetUsuarios(values)}
              initialValues={{
                name: "",
                status: null,
              }}
            >
              <Form.Item name="name_like">
                <Search
                  placeholder="Busca usuarios"
                  size="large"
                  allowClear
                  style={{ width: 400 }}
                  onSearch={() => formFilters.submit()}
                />
              </Form.Item>
              <Form.Item name="status">
                <Select
                  placeholder="Filtrar por estado"
                  size="large"
                  allowClear
                  style={{ width: 300 }}
                  onChange={() => formFilters.submit()}
                >
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Form>
            <Button
              type="primary"
              size="large"
              onClick={() => handleAddEdit()}
              disabled={loading}
            >
              Agregar usuario
            </Button>
          </Flex>
          <Table
            rowKey="id"
            dataSource={dataUsers}
            columns={columnsUsuarios}
            loading={loading}
            className="table-usuarios"
            pagination={pagination}
            onChange={(pagination) => setPagination(pagination)}
          />
        </Flex>
      </LayoutCustom>
      <ModalAddEdit />
      <ModalDelete />
    </>
  );
}

export default FlexxusApp;

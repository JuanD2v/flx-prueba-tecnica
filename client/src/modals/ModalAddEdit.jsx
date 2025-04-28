import { Button, Col, Flex, Form, Input, Modal, Row, Select } from "antd";
import "./styles/Modal.css";
import { patchUsuario, postUsuario } from "../api/apis";
import { useEffect } from "react";
import { useMyFlexxusContext } from "../Provider/MyProvider";

const ModalAddEdit = () => {
  const { openModal, selectedRow, handleClose, formModal, loading, setLoading, handleGetUsuarios, handleMessage } = useMyFlexxusContext();
  const actionName = selectedRow ? "Editar usuario" : "Agregar usuario";
  const rules = [{ required: true, message: "Campo requerido." }];

  const handlePostPatchUsuario = async (values) => {
    setLoading(true);
    handleClose();
    selectedRow
    ? await patchUsuario(values, selectedRow.id, handleMessage)
    : await postUsuario(values, handleMessage);
    await handleGetUsuarios();
    setLoading(false);
  };

  const handleSubmit = () => {
    formModal.validateFields()
      .then((values) => {
        handlePostPatchUsuario(values);
      })
      .catch(errorInfo => errorInfo);
  }

  useEffect(() => {
    if (selectedRow && formModal) {
      formModal.setFieldsValue({
        username: selectedRow.username,
        email: selectedRow.email,
        name: selectedRow.name,
        lastname: selectedRow.lastname,
        status: selectedRow.status,
        age: selectedRow.age
      });
    }
  }, [selectedRow]);

  return (
    <Modal 
    centered 
    width={700}
    title={actionName} 
    open={openModal === "modalAddEdit"}
    onCancel={handleClose}
    footer={false}
    >
      <Form layout="vertical" size="large" className="form-container" form={formModal} disabled={loading}>
        <Row gutter={26}>
          <Col span={12}>
            <Form.Item name="username" label="Usuario" rules={rules}>
              <Input placeholder="john doe" allowClear/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email" rules={rules}>
              <Input placeholder="johndoe@domain.com" allowClear/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={26}>
          <Col span={12}>
            <Form.Item name="name" label="Nombre" rules={rules}>
              <Input placeholder="John" allowClear/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastname" label="Apellido" rules={rules}>
              <Input placeholder="Doe" allowClear/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={26}>
          <Col span={12}>
            <Form.Item name="status" label="Estado" rules={rules}>
              <Select
                placeholder="Seleccione un estado"
                allowClear
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="age" label="Edad" rules={rules}>
              <Input placeholder="43" type="number" allowClear/>
            </Form.Item>
          </Col>
        </Row>
        <Flex className="button-container">
          <Button type="primary" size="large" htmlType="submit" onClick={handleSubmit}>{actionName}</Button>
        </Flex>
      </Form>
    </Modal>
  )
};

export default ModalAddEdit;
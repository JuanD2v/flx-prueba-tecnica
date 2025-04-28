import { Button, Flex, Modal, Typography } from "antd";
import "./styles/Modal.css";
import { deleteUsuario } from "../api/apis";
import { useMyFlexxusContext } from "../Provider/MyProvider";

const ModalDelete = () => {
  const { openModal, selectedRow, setLoading, handleGetUsuarios, handleClose, handleMessage } = useMyFlexxusContext();
  const { Text } = Typography;

  const handleDelete = async () => {
    setLoading(true);
    handleClose();
    await deleteUsuario(selectedRow.id, handleMessage);
    await handleGetUsuarios();
    setLoading(false);
  }

  return (
    <Modal
    centered
    title="Eliminar usuario"
    open={openModal === "modalDelete"}
    onCancel={handleClose}
    footer={[
      <Button key="cancelar" variant="outlined" size="large" onClick={handleClose}>Cancelar</Button>,
      <Button key="eliminar" variant="solid" color="danger" size="large" onClick={handleDelete}>Eliminar</Button>
    ]}
    >
      <Flex justify="center" align="center" className="text-container">
        <Text>¿Estás seguro de que deseas eliminar el usuario {<Text type="danger">{`${selectedRow?.name} ${selectedRow?.lastname}`}</Text>}?</Text>
      </Flex>
    </Modal>
  )
};

export default ModalDelete;
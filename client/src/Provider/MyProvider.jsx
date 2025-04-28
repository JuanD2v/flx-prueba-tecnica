import { Form, message } from 'antd';
import { createContext, useContext, useMemo, useState } from 'react';
import { cleanParams } from '../helpers/cleanParams';
import { getUsuarios } from '../api/apis';

export const MyFlexxusContext = createContext();

export function MyFlexxusProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [handleMessage, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState("");
  const [dataUsers, setDataUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: false,
  });
  const [formModal] = Form.useForm();
  const [formFilters] = Form.useForm();

   // El filtro "Busca usuarios" no se puede filtrar por nombre o apellido debido a limitaciones del json-server.json-server no 
   // soporta consultas tipo OR en un solo request como ?nombre_like=John||apellido_like=John. Solo soporta AND 
   // (es decir, nombre_like=John&apellido_like=John → busca los que cumplan ambas condiciones al mismo tiempo).
  const handleGetUsuarios = async () => {
    const clean = cleanParams(formFilters.getFieldsValue());
    const searchParams = new URLSearchParams(clean);    
    setLoading(true);
    const {data, total} = await getUsuarios(searchParams, pagination, handleMessage);
    setDataUsers(data);
    setPagination((prev) => ({
      ...prev,
      total: total,
    }));
    setLoading(false);
  };

  const handleClose = () => {
    setOpenModal("");
    setSelectedRow(null);
    formModal.resetFields();
  };

  const handleAddEdit = (rowData) => {
    setOpenModal("modalAddEdit");
    setSelectedRow(rowData);
  };

  const handleDelete = (rowData) => {
    setOpenModal("modalDelete");
    setSelectedRow(rowData);
  }

  const contextValue = useMemo(() => ({ 
    loading, 
    setLoading, 
    handleMessage,
    formFilters,
    formModal,
    dataUsers,
    handleGetUsuarios,
    openModal,
    handleAddEdit,
    handleDelete,
    handleClose,
    selectedRow,
    pagination,
    setPagination
  }), [loading, handleMessage, dataUsers, openModal, selectedRow, formFilters, formModal, pagination]);

  return (
    <MyFlexxusContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </MyFlexxusContext.Provider>
  );
};

export function useMyFlexxusContext() {
  const context = useContext(MyFlexxusContext);
  if (!context) {
    throw new Error("useMyFlexxusContex no debe ser usado sin el MyFlexxusProvider");
  }
  return context;
}
export const getUsuarios = async (searchParam, pagination, handleMessage) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simular un tiempo de carga de 2 segundos
    const response = await fetch(
      `http://localhost:4000/users?${searchParam}&_page=${pagination.current}&_per_page=${pagination.pageSize}`
    );
    const total = response.headers.get("X-Total-Count");
    const data = await response.json();
    if (!data.length) {
      handleMessage.open({
        type: "info",
        content: "No se encontraron resultados.",
        duration: 3,
      });
    }
    return { data, total };
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postUsuario = async (usuario, handleMessage) => {
  try {
    await handleMessage.open({
      type: "loading",
      content: "Cargando usuario...",
      duration: 3,
    });
    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then(() => {
        handleMessage.open({
          type: "success",
          content: "Usuario creado correctamente.",
          duration: 3,
        });
      })
      .catch(() => {
        handleMessage.open({
          type: "error",
          content: "Error al crear el usuario.",
          duration: 3,
        });
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const patchUsuario = async (user, userId, handleMessage) => {
  try {
    await handleMessage.open({
      type: "loading",
      content: "Editando usuario...",
      duration: 3,
    });
    await fetch(`http://localhost:4000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        handleMessage.open({
          type: "success",
          content: "Usuario editado correctamente.",
          duration: 3,
        });
      })
      .catch(() => {
        handleMessage.open({
          type: "error",
          content: "Error al editar el usuario.",
          duration: 3,
        });
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteUsuario = async (userId, handleMessage) => {
  try {
    await handleMessage.open({
      type: "loading",
      content: "Eliminando usuario...",
      duration: 3,
    });
    await fetch(`http://localhost:4000/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        handleMessage.open({
          type: "success",
          content: "Usuario eliminado correctamente.",
          duration: 3,
        });
      })
      .catch(() => {
        handleMessage.open({
          type: "error",
          content: "Error al eliminar el usuario.",
          duration: 3,
        });
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

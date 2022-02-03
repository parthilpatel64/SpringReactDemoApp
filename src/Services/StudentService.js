import http from "../http-common";

  const getAll = () => {
    return http.get("/viewStudent");
  };

  const put = studentId => {
    return http.put(`/editStudent/${studentId}`);
  };
  
  const create = student => {
    return http.post("/addStudent", student);
  };
  
  const remove = studentId => {
    return http.delete(`/deleteStudent/${studentId}`);
  };

  export default {
    getAll,
    put,
    create,
    remove,
  };
  
 
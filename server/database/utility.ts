import connection from "./config";
const query: any = (sql: any, params: any) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err: any, result: any) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
export default query;

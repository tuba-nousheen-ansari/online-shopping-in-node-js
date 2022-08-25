const pool = require("../connection/GetConnection");
const {
  allQueryPage,
} = require("../controller/querycontroller/QueryController");

module.exports = class Query {
  constructor(name, email, mobile, subject, query) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.subject = subject;
    this.query = query;
  }
  static save() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        else {
          var sql =
            "insert into customersupport(name,email,mobile,subject,query) values(?,?,?,?,?)";
          connection.query(
            sql,
            [this.name, this.email, this.mobile, this.subject, this.query],
            (err, result) => {
              connection.release();
              err ? reject(err) : resolve(result);
            }
          );
        }
      });
    });
  }

  checkQuery() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        else {
          var sql =
            "select * from customersupport where email=? and password=?";
          connection.query(sql, [this.email, this.password], (err, result) => {
            connection.release();
            err ? reject(err) : resolve(result);
          });
        }
      });
    });
  }

  static allQuery() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        else {
          var sql = "select * from customersupport";
          connection.query(sql, [], (err, result) => {
            connection.release();
            err ? reject(err) : resolve(result);
          });
        }
      });
    });
  }

  static viewAllQuery() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        else {
          var sql = "select * from customersupport order by query desc";
          connection.query(sql, [], (err, result) => {
            connection.release();
            err ? reject(err) : resolve(result);
          });
        }
      });
    });
  }

  static saveQuery(query, cust_id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        else {
          console.log("CustomerId : " + cust_id + "query : " + query);
          let sql = "insert into customersupport(cust_id,query) values (?,?)";
          connection.query(sql, [cust_id, query], (err, result) => {
            connection.release();
            err ? reject(err) : resolve(result);
          });
        }
      });
    });
  }

  static allQuery(cust_id) {
    return new Promise((resolve, reject) => {
      var arr = [];
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        else {
          console.log("Insert query :");
          let sql = "select * from customersupport where query=?";
          if (err) reject(err);
          else {
            connection.query(sql, [query], (err, result) => {
              for (let i = 0; i < result.length; i++) {
                let sql = "select * from customersupport where query=?";
                connection.query(sql, [result[i].query], (err, answer) => {
                  arr[i] = answer[0];
                });
              }
              setTimeout(() => {
                connection.release();
                resolve(arr);
              }, 6000);
            });
          }
        }
      });
    });
  }
};

const pool=require("../connection/GetConnection");

module.exports=class Customer
{ 
    constructor(name,email,mobile,address,gender,password)
    { 
        this.name=name;
        this.email=email;
        this.mobile=mobile;
        this.address=address;
        this.gender=gender;
        this.password=password;
    }


    save()
    { 
        return new Promise((resolve,reject) => {
           pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="insert into customer(name,email,mobile,address,gender,password) values(?,?,?,?,?,?)";
                    connection.query(sql,[this.name,this.email,this.mobile,this.address,this.gender,this.password],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
           });
        });
    }


    checkCustomerLogin()
    { 
        return new Promise((resolve, reject)=>{
        pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql="select * from customer where email=? and password=?";
                    connection.query(sql, [this.email, this.password],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
    }

   static allCategory() {
       return new Promise((resolve, reject)=>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql ="select * from category"
                        connection.query(sql,[],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
       });
   }

   static viewAllProduct() 
   {
        return new Promise((resolve, reject)=>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    var sql ="select * from product order by pro_date desc"
                        connection.query(sql,[],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
        });
   }

   static allProductByCategory(id) {
    return new Promise((resolve, reject)=>{
        pool.getConnection((err,connection)=>{
            if(err)
                reject(err);
            else
            {
                var sql ="select * from product where cat_id=? "
                    connection.query(sql,[id],(err,result)=>{
                    connection.release();
                    err?reject(err):resolve(result);
                });
            }
        });
    });
   }

   static saveCart(pro_id,cust_id)
   { 
       return new Promise((resolve, reject)=>{
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    console.log("CustomerId : "+cust_id+" ProductId : "+pro_id);
                    let sql="insert into cart(cust_id,pro_id) values(?,?)";
                    connection.query(sql,[cust_id,pro_id],(err,result)=>{
                        connection.release();
                        err?reject(err):resolve(result);
                    });
                }
            });
       });
   }


   static allCart(cust_id) {
       return new Promise((resolve, reject) => {
            var arr=[];
            pool.getConnection((err,connection)=>{
                if(err)
                    reject(err);
                else
                {
                    console.log("Inside cart :");
                    let sql="select * from cart where cust_id=?";
                    if(err)
                        reject(err);
                    else
                    { 
                        connection.query(sql, [cust_id],(err,result)=>{
                            for(let i=0; i<result.length; i++)
                            {
                                let sql="select * from product where id=?";
                                connection.query(sql,[result[i].pro_id],(err,answer)=>{
                                    arr[i] = answer[0];
                                });
                            }
                            setTimeout(() => {
                                connection.release();
                                resolve(arr);
                            },6000)
                            
                        });
                    }
                }
            });
       });
   }
}
const res = require("express/lib/response");
const Customer = require("../../model/Customer.js");


exports.homepage=(request,response)=>{
    Customer.viewAllProduct()
    .then((result)=>{
        response.render("./customer/index.ejs",{result});
    })
    .catch((error)=>{

    })
}

exports.registerPage=(request,response)=>{
    response.render("./customer/Register.ejs");
}


exports.registerPost=(request,response)=>{
    console.log(request.body);
    var customer = new Customer(request.body.name,request.body.email,request.body.mobile,request.body.address,request.body.gender,request.body.password);
    customer.save()
    .then((result)=>{
        response.redirect("/");
    })
    .catch((err)=>{
        response.send(err);
    });
}


exports.contactpage=(request,response)=>{
    response.render("./customer/ContactUs.ejs");
}

exports.categorypage=(request,response)=>{
    Customer.allCategory()
    .then((result)=>{
        response.render("./customer/Category.ejs",{result});
    })
    .catch((error)=>{

    });
}

exports.aboutpage=(request,response)=>{
    response.render("./customer/AboutUs.ejs");
}

exports.viewAllPage=(request,response)=>{
    Customer.viewAllProduct()
    .then((result)=>{
        response.render("./customer/ViewAllProduct.ejs",{result});
    })
    .catch((error)=>{

    });
}


exports.shopNowPage=(request,response)=>{
    Customer.allProductByCategory(request.params.id)
    .then((result)=>{
        response.render("./customer/ShopNow.ejs",{result});
    })
    .catch((error)=>{

    });
}
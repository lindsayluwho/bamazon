var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    menu();
});

function menu() {
    inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "MENU",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
    }]).then(function(response) {
        switch (response.menu) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addNewProduct();
                break;

            case "EXIT":
                connection.end(function(err) {
                    if (err) console.log(err);
                });
                break;
        }
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, display the id, name, price, and quantity of all items
        console.log("ID | Product | Price | Stock Quantity");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
    menu();
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
        if (err) throw err;
        // once you have the items, display the id, name, price, and quantity of all items
        console.log("ID | Product | Price | Stock Quantity");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity);
        }
        console.log("-----------------------------------");
        menu();
    })

};

function addInventory() {
	connection.query("SELECT * FROM products", function(err, results) {
	  if (err) throw err;
	
	  // once you have the items, display the id, name, price, and quantity of all items
	  console.log("ID | Product | Price | Stock Quantity");
	
	  for (var i = 0; i < results.length; i++) {
	   console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity);
	  }
	  
	  console.log("-----------------------------------");
  
	  inquirer.prompt([
	  {
	    type: "input",
	    name: "productId",
	    message: "Which product ID would you like to update?"
		},
	  {
	    type: "input",
	    name: "quantity",
	    message: "How many items would you like to add to inventory?"
		}
	 ]).then(function(results) {
	 	var query = connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: results.quantity},{item_id: results.productId}],function(err, res) {
	          console.log(res.affectedRows + " inventory updated!\n");
	      }
	  	);
	 		menu();

		}); 
	}); 
};

function addNewProduct() {
	inquirer.prompt([
		{
			type: "input",
			name:"productName",
			message: "Product Name: "
		},
		{
			type: "input",
			name: "department",
			message: "Product Department: "
		},
		{
			type: "input",
			name: "price",
			message: "Price: "
		},
		{
			type: "input",
			name: "quantity",
			message: "Stock Quantity: "
		}
	]).then(function(response){
		var query = connection.query("INSERT INTO products SET ?",{product_name: response.productName, department_name: response.department, price: response.price,stock_quantity: response.quantity}, function(err, res) {
			if(err) console.log(err);
      console.log(res.affectedRows + " product added!\n");
      menu();
    });
   });
};
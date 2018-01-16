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
  // run the start function after the connection is made to prompt the user
  purchase();
});

function purchase() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, display the id, name, price, and quantity of all items
    console.log("ID | Product | Price | Stock Quantity");
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price + " | " + results[i].stock_quantity);
    }
    console.log("-----------------------------------");
    inquirer
      .prompt([
        {
          name: "productId",
          type: "input",
          message: "Please enter the ID of the product you would like to purchase."
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem = answer.productId;
        var amountChosen = parseInt(answer.quantity);
        var amountInStock = parseInt(results[parseInt(chosenItem) - 1].stock_quantity);
        var price = parseFloat(results[parseInt(chosenItem) - 1].price);

        // determine if there is enough to sell
        if (amountChosen < amountInStock) {
          // adequate quantity, so update db, let the user know purchase total, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (amountInStock - amountChosen)
              },
              {
                item_id: chosenItem
              }
            ],
            function(error) {
              if (error) console.log(error);

              var total = (price * amountChosen);
              console.log(`Thanks for your purchase! Your transaction total is ${total}`);
              inquirer.prompt([
                {
                  type: "confirm",
                  name: "yesOrNo",
                  message: "Would you like to make another purchase?"
                }
              ]).then(function(response){
                if(response.yesOrNo == true){
                  purchase();}
                else{
                  connection.end(function(err) {
                    if(err) console.log(err);
                  });
                }
              });
            }
          );
        }
        else {
          // not enough in stock, so apologize and start over
          console.log("Sorry! That item is low in stock.");
          purchase();
        }
      });
  });
} 
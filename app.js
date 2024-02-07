#! /usr/bin/env node
const fs = require('fs');

const { Command } = require('commander');
const axios=require("axios")
const program = new Command();




program.command('add <amount>')
  .description('Adds expenses')
  .action((amount) => {
   addExpenses(amount)
  });

  program.command('remove <amount>')
  .description('removes expenses')
  .action((amount) => {
   removeExpenses(amount)
  });
program.parse(process.argv);

function addExpenses(amount){
  updateBudget(amount);
}

function removeExpenses(amount){
  updateBudget(-amount)
}

function updateBudget(amount){
  let budgetData=loadBudgetData();

  if(!budgetData){
    budgetData={expenses:[]};
  }

  const newExpense = { amount: parseInt(amount) };
  budgetData.expenses.push(newExpense);

  saveBudgetData(budgetData);

  console.log(`Expense ${amount > 0 ? 'added' : 'removed'} successfully.`);
}


function loadBudgetData() {
  try {
    const jsonData = fs.readFileSync('DB.json');
    return JSON.parse(jsonData);
  } catch (error) {
    console.log('File does not exist or is empty. Creating a new one.');
    return null;
  }
}


function saveBudgetData(data) {
  fs.writeFileSync('DB.json', JSON.stringify(data, null, 2));
}

// //////////////////////////////////////////////////////weather


// program.command("weather <city>")
// .description("get weather information")
// .action(async(city)=>{
//   try{
// let apiUrl=`https://api.weatherapi.com/v1/current.json?key=6d210d800ff040bc960184527242301&q=`;

// let response=await axios.get(apiUrl);
// let main=response.data;


// console.log(`weather in ${city}:`)
// console.log(`temperature:${main.temp_c}C`)
//   }catch(err){
//     console.log("error")

//   }
// })

// program.parse(process.argv)
var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function calculateSalesTax(salesData, taxRates) {
  var output = {}

  for (var i = 0; i < salesData.length; i++) {
    var salesSumByProvince = 0;
    var salesTaxByProvince = 0;
    for (var j = 0; j < salesData[i]['sales'].length; j++) {
      salesSumByProvince += salesData[i]['sales'][j];
    }
    //adds current business name object to output if undefined
    if (!output[`${salesData[i]['name']}`]) {
      output[`${salesData[i]['name']}`] = {};
    }
    //adds totalSales parameter to business name object if undefined
    if (!output[`${salesData[i]['name']}`]['totalSales']) {
      output[`${salesData[i]['name']}`]['totalSales'] = 0;
    }
    //adds sales by province to each business name
    output[`${salesData[i]['name']}`]['totalSales'] += salesSumByProvince;

    salesTaxByProvince = calculateTax(salesSumByProvince, taxRates[`${salesData[i]['province']}`]);
    //adds totalTaxes parameter to object if undefined
    if (!output[`${salesData[i]['name']}`]['totalTaxes']) {
      output[`${salesData[i]['name']}`]['totalTaxes'] = 0;
    }

    output[`${salesData[i]['name']}`]['totalTaxes'] += salesTaxByProvince;
  }
  return output;
}
var results = calculateSalesTax(companySalesData, salesTaxRates);

function calculateTax(totalSales, taxRate) {
  return totalSales * taxRate;
}

console.log(results);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/

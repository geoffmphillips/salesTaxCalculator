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
  var output = {};

  for (var i = 0; i < salesData.length; i++) {
    var salesSumByProvince = 0;
    var salesTaxByProvince = 0;
    //adds current business name object to output if true
    if (!output[salesData[i].name]) {
      output[salesData[i].name] = {
                                    totalSales: 0,
                                    totalTaxes: 0
                                  };
    }
    salesSumByProvince = sumSales(salesData[i].sales);                                          //sums sales by province
    output[salesData[i].name].totalSales += salesSumByProvince;                                 //adds sales by province
    salesTaxByProvince = calculateTax(salesSumByProvince, taxRates[salesData[i].province]);     //uses sales by province from above to calculate sales tax by province
    output[salesData[i].name].totalTaxes += salesTaxByProvince;                                 //adds sales tax by province
  }
  return output;
}
var results = calculateSalesTax(companySalesData, salesTaxRates);

function calculateTax(totalSales, taxRate) {
  return totalSales * taxRate;
}

function sumSales(saleArray) {
  var sum = 0;
  saleArray.forEach(function(sale) {
    sum += sale;
  });
  return sum;
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

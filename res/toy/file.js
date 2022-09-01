function processInvoices(invoices)
{
  return new promise((resolve,reject)=>
    {
        var promisesArray = []; // store all promises here
        invoices.forEach(number=> 
            {
            
                promisesArray.push(confirmInvoice(number));
                    
            });
        Promise.all(promisesArray).then (results=>{
        // validate all results and reject if necessary...
        if (validateResults(results)) {
        // if all ok
            resolve('All invoices were processed successfully');
          }
        else {
          reject('Error processing one or more invoices'); // just for demo purposes
         }
        });                 

    });
}

init()  // triggered at load..
{
    let invoices = [2,4,8,16,31];
    processInvoices(invoices)
        .then(result=>
            {                   
            console.log(result);
            }).catch(reason=>{console.error(reason)});

}
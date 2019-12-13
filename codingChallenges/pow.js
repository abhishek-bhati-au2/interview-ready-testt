function multiply( x,  res,  res_size) { 
  
    // Initialize carry 
    let carry = 0; 
      
    // One by one multiply n with 
    // individual digits of res[] 
    for (var i = 0; i < res_size; i++) { 
        let prod = res[i] * x + carry; 
      
        // Store last digit of 
        // 'prod' in res[] 
        res[i] = prod % 10; 
      
        // Put rest in carry 
        carry = prod / 10; 
    } 
      
    // Put carry in res and 
    // increase result size 
    while (carry) { 
        res[res_size] = carry % 10; 
        carry = carry / 10; 
        res_size++; 
    } 
    return res_size; 
    } 
    function power( x,  n)  
    { 
      
    if(n == 0 ){  
        return 1; 
       
    } 
      
      
    var res = Math.max(res); 
    var res_size = 0; 
    var temp = x; 
      
    // Initialize result 
    while (temp != 0) { 
        res[res_size++] = temp % 10; 
        temp = temp / 10; 
    } 
      
    for (var i = 2; i <= n; i++) 
     res_size = multiply(x, res, res_size);
     
      for (var i = res_size - 1; i >= 0; i--) 
         var rr = (x + "^" + n + " = "+res[i]) ;
         return rr; 
       
    } 
      
  
    function main() { 
    var exponent = 100; 
    var base = 10; 
    console.log(power(base, exponent)); 
     
    } 
    main()
    
var checkFrequency = function(nums, k) {
    let hash = {};
    let results = [];
    
    for (let num of nums) {
        hash[num] = hash[num] + 1 || 1;
    }
    
    let sorted = Object.entries(hash).sort((a, b) => {
        return b[1] - a[1];
    });

    for(let i = 0; i < k; i++) {
        results.push(Number(sorted[i][0]));
    }
    return results;
    
};
console.log(checkFrequency( [1,1,1,2,2,3], 2));


export default (str,seedNum)=>{
    var result = [];
    for (var i = 0; i < str.length; i++) {
      let numString = str.charCodeAt(i).toString(2);
      result.push(parseInt(numString,2));
    }
    return getFourSeeds(result,seedNum)
  }

  let average = (array) => array.reduce((a, b) => a + b) / array.length;


  export function xmur3 (str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++){
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
        h = h << 13 | h >>> 19;
    }
    return () => {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return( (h ^= h >>> 16) >>> 0 ) / 10000000000;
    }
}

  const getFourSeeds = (arr,seedNum) => {
    let array = []
    let start = 0
    let step = arr.length / seedNum
  
    for(let i = 0; i < seedNum; i++){
  
      array.push(
        average(arr.slice(start,start+4))
      )
  
      start+=step
  
    }
  
    return array
  }
function getRandomFn(x, y){ // 取x,到y的随机数 , 可取x和y
    return Math.floor(Math.random() * (y-x+1) + x)
}
export function shuffle(arr){
    for(let i=0;i<arr.length;i++){
        let j = getRandomFn(0, i)
        let t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
    }
    return arr
}
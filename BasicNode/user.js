function cutHalf(arr) {
    return arr.splice(arr.length / 2)
}
let users = [{
    "name": "chayapon",
    "lastname": "chandra",
    "email": "gooddev639@gmail.com",
    "from": "Thailand"
}, {
    "name": "Job",
    "lastname": "Steve",
    "email": "steve.job@gmail.com",
    "from": "USA"
},
{
    "name": "AAA",
    "lastname": "AAAAA",
    "email": "AAA@gmail.com",
    "from": "Thailand"
},
{
    "name": "BBB",
    "lastname": "BBBBB",
    "email": "BBB@gmail.com",
    "from": "Thailand"
},
{
    "name": "CCC",
    "lastname": "CCCCC",
    "email": "CCC@gmail.com",
    "from": "Thailand"
},
{
    "name": "DDD",
    "lastname": "DDDDD",
    "email": "DDD@gmail.com",
    "from": "Thailand"
},
{
    "name": "EEE",
    "lastname": "EEEEE",
    "email": "EEE@gmail.com",
    "from": "Thailand"
},
{
    "name": "FFF",
    "lastname": "FFFFF",
    "email": "FFF@gmail.com",
    "from": "Thailand"
}]

console.log(users)
console.log("================")
tmpArr = []
for (let i = 0; i <= users.length; i++) {
    tmpArr = cutHalf(users)
    console.log('------')
    console.log(tmpArr)
    users = tmpArr
    console.log("===============" + i + '--' + users.length)
}




const fastLoremIpsum = require('fast-lorem-ipsum');
const mysql = require('mysql');
const fs = require('fs');
const now = require('performance-now');

const dopeStream = fs.createWriteStream('stressTest.csv');
const start = now();
let counter = 0; 

const write = function() {
  let ok = true;
    do {
    counter++;
    const schema = 
      `${fastLoremIpsum(2, 'w')},${fastLoremIpsum(3, 'w')},${fastLoremIpsum(2, 'w')},${fastLoremIpsum(4, 'w')},${fastLoremIpsum(2, 'w')},${Math.floor(Math.random() * 1000)},${Math.floor(Math.random() * 1000)},${Math.floor(Math.random() * 1000)},${Math.floor(Math.random() * 1000)},${fastLoremIpsum(1, 'w')},${fastLoremIpsum(6, 'w')},${fastLoremIpsum(10, 'w')}\n`
    if (counter === 10000000) {
        dopeStream.write(schema, 'utf-8', () => {
            console.log(now());
        });
    } else {
      ok = dopeStream.write(schema, 'utf-8')
      }
      if (counter % 1000000 === 0) {
          console.log(counter);
      }
    } while ( counter < 10000000 && ok) {
      if (counter < 10000000) {
          dopeStream.once('drain', write);
      }
    }
  }
  //first go: 72 seconds!!!!
// 1000000
// 2000000
// 3000000
// 4000000
// 5000000
// 6000000
// 7000000
// 8000000
// 9000000
// 10000000
// 72023.147577
  write();

//old way that runs out of memory whilst writing to CSV. it works fine for JSON!
// for (var i = 0; i < 10000000; i++) {
// //   dopeStream.write(JSON.stringify(obj));
//   dopeStream.write(`ownerName: ${fastLoremIpsum(2, 'w')}, 
//                     ownerPic: ${fastLoremIpsum(3, 'w')}, 
//                     houseType: ${fastLoremIpsum(2, 'w')}, 
//                     title: ${fastLoremIpsum(4, 'w')},
//                     city: ${fastLoremIpsum(2, 'w')}, 
//                     guestNum: ${(Math.floor(Math.random() * 1000))}, 
//                     bedroomNum: ${(Math.floor(Math.random() * 1000))}, 
//                     bedNum ${(Math.floor(Math.random() * 1000))}, 
//                     bathNum: ${(Math.floor(Math.random() * 1000))}, 
//                     bathType: ${fastLoremIpsum(1, 'w')},
//                     description: ${fastLoremIpsum(6, 'w')}, 
//                     amenities: ${fastLoremIpsum(10, 'w')}, 
//                     counter: ${i}`);
//   //dont stringify use a template literal
//     // console.log("counter", i);

//     if (i % 1000000 === 0) {
//         console.log(i);
//     }
// }
const end = now();




// fs.createWriteStream("data.json", JSON.stringify(data), function(err) {
//     if (err) {
//         console.log("ERR--->", err);
//     }
//     console.log("<---FINISHED--->");
// })


// const obj = {
//     ownerName: fastLoremIpsum(2, 'w'),
//     ownerPic: fastLoremIpsum(3, 'w'),
//     houseType: fastLoremIpsum(2, 'w'),
//     title: fastLoremIpsum(4, 'w'),
//     city: fastLoremIpsum(2, 'w'),
//     guestNum: Math.floor(Math.random() * 1000),
//     bedroomNum: Math.floor(Math.random() * 1000),
//     bedNum: Math.floor(Math.random() * 1000),
//     bathNum: Math.floor(Math.random() * 1000),
//     bathtype: fastLoremIpsum(1, 'w'),
//     description: fastLoremIpsum(6, 'w'),
//     amenities: fastLoremIpsum(10, 'w'),
//     counter: i
// }
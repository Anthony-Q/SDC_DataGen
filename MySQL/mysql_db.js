const mysql = require('mysql');
var now = require('performance-now');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stressTest',
    local_infile: true,
});

connection.connect( (err) => {
    if (err) {
       return console.error("<---MYSQL ERROR--->", err.message);
    }
});

//need to create id for for my main table. it will be a PK
//amenities will have 
const createStresses = `create table if not exists stressTest(
                        ownerName varchar(255) not null,
                        ownerPic varchar(255) not null,
                        houseType varchar(255) not null,
                        title varchar(255) not null,
                        city varchar(255) not null, 
                        guestNum bigint not null default 0,
                        bedroomNum bigint not null default 0, 
                        bedNum bigint not null default 0, 
                        bathNum bigint not null default 0, 
                        bathType varchar(255),
                        description varchar(255),
                    
)`;


//TODO
//amenities table which will hold its name a PK linking name to 
const amenities = `stressesID int not null
                   name varchar(255)
                   primary key('stress id', 'amenities name')
                   `;

const joinedTable = `create table if not exists stressTest(
    ownerName varchar(255) not null,
    ownerPic varchar(255) not null,
    houseType varchar(255) not null,
    title varchar(255) not null,
    city varchar(255) not null, 
    guestNum bigint not null default 0,
    bedroomNum bigint not null default 0, 
    bedNum bigint not null default 0, 
    bathNum bigint not null default 0, 
    bathType varchar(255),
    description varchar(255),
`;

// select name.*, amenities.*
// from amenities 


//example of inner join
// SELECT p.*, f.*
// FROM person p
// INNER JOIN person_fruit pf
// ON pf.person_id = p.id
// INNER JOIN fruits f
// ON f.fruit_name = pf.fruit_name

// const jsonInsertion = `INSERT into stressTest(
//                          ownerName, ownerPic, housetype, title, city, guestNum, bedroomNum, 
//                          bedNum, bathNum, bathType, description, amenities, counter 
//                          VALUES ?, 
//                          [values]
// )`

connection.query(createStresses, (err, results, fields) => {
    if (err) {
        console.log("<---QUERY ERROR--->", err);
    }
});

// connection.query(`LOAD DATA LOCAL INFILE '../data.csv' INTO TABLE stressTest`,
//                     (err, result) => {
//                         if (err) {
//                             throw err; 
//                             console.log("<--MYSQL INSERTION ERROR", err);
//                         } else {
//                             console.log("DOCS--->", result);
//                         }
//                       }
//                     );



// (ownerName, ownerPic, 
//     houseType, title, city, guestNum, bedroomNum, bedNum, bathNum, 
//     bathType, description, amenities, counter)`, 

// FIELDS TERMINATED BY ','
// ENCLOSED BY '"'
// LINES TERMINATED BY '\r\n'
// IGNORE 1 LINES

// const start = now();
//load file insert here
//func.on finish console.log(start - now() / 1000);

// connection.query(`INSERT into stressTest(
//     ownerName, ownerPic, housetype, title, city, guestNum, bedroomNum, 
//     bedNum, bathNum, bathType, description, amenities, counter) 
//     VALUES ('`,
//     [values],
//     (err, result) => {
//         if (err) {
//             throw err;
//             console.log("<===INSERTION ERROR===>", err);
//         }
//       }
//     )



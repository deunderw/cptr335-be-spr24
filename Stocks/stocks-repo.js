const nano = require('nano')(process.env.DBURL);
const db = nano.db.use(process.env.STOCKS_TABLE);

const getStockPrice = async (symbol) => {
  return new Promise((resolve, revoke) => {
    const http = require('https');

    const dates = _formatDates();

    let path =
      '/time_series?apikey=' +
      process.env.STOCKS_API +
      '&interval=1h&symbol=' +
      symbol +
      '&format=JSON&exchange=NASDAQ&type=stock&start_date=' +
      dates.hourAgo +
      '&end_date=' +
      dates.current;
    const options = {
      method: 'GET',
      hostname: 'api.twelvedata.com',
      port: null,
      path: encodeURI(path),
    };

    const req = http.request(options, (res) => {
      const chunks = [];

      res.on('error', (err) => {
        revoke(err);
      });
      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });

    req.end();
  });
};

const setStockPrice = async (symbol, price, date) => {
  let existingDoc = '';
  try {
    existingDoc = await db.find({
      selector: {
        symbol: {
          $eq: symbol,
        },
      },
    });
  } catch (err) {
    console.log('update error = ', err);
  }
  existingDoc.docs[0].price = price;
  existingDoc.docs[0].date = date;
  try {
    const results = await db.insert(
      existingDoc.docs[0],
      existingDoc.docs[0]._id
    );
  } catch (err) {
    console.log('update error = ', err);
  }
};

const getStock = async (symbol) => {
  return new Promise(async (resolve, revoke) => {
    let existingDoc = '';
    try {
      existingDoc = await db.find({
        selector: {
          symbol: {
            $eq: symbol,
          },
        },
      });
    } catch (err) {
      revoke({ error: 500, message: 'Error getting stock information' });
    }
    resolve({ name: existingDoc.docs[0].name, price: existingDoc.docs[0].price });
    })
}

const _formatDates = () => {
  // Create a new Date object
  currentDate = new Date();

  // Extract date components
  let year = currentDate.getFullYear();
  let month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Month is 0-indexed, so add 1
  let day = ('0' + currentDate.getDate()).slice(-2);

  // Extract time components
  let hours = ('0' + currentDate.getHours()).slice(-2);
  let minutes = ('0' + currentDate.getMinutes()).slice(-2);
  let seconds = ('0' + currentDate.getSeconds()).slice(-2);

  // Construct the desired format
  const formattedCurrentdDate =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  // Create a new Date object
  hourAgo = new Date(currentDate.getTime() - 1 * 60 * 60 * 1000);

  // Extract date components
  year = hourAgo.getFullYear();
  month = ('0' + (hourAgo.getMonth() + 1)).slice(-2); // Month is 0-indexed, so add 1
  day = ('0' + hourAgo.getDate()).slice(-2);

  // Extract time components
  hours = ('0' + hourAgo.getHours()).slice(-2);
  minutes = ('0' + hourAgo.getMinutes()).slice(-2);
  seconds = ('0' + hourAgo.getSeconds()).slice(-2);

  // Construct the desired format
  const formattedHourAgoDate =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  return {
    current: formattedCurrentdDate,
    hourAgo: formattedHourAgoDate,
  };
};

const insertIntoDB = async (row) => {
  await db.insert(row);
};

const getStocks = async () => {
  let existingDoc = '';
  try {
    existingDoc = await db.find({
      selector: {
        symbol: {
          $gt: null,
        },
      },
    });
  } catch (err) {
    console.log('getStocks error = ', err);
  }
  return existingDoc.docs;
}
module.exports = {
  getStockPrice,
  setStockPrice,
  insertIntoDB,
  getStocks,
  getStock,
};

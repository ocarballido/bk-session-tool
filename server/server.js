// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const sessions = require('./sessions');
const users = require('./users');
const generateScheduledSessions = require('./scheduledSessions');

const regDate = /(\d{2})\/(\d{2})\/(\d{4})/;
const getDate = (date, def) => {
  if (date) {
    const matches = date.match(regDate);
    if (matches) {
      const day = +matches[1];
      const month = +matches[2] - 1;
      const year = +matches[3];
      return new Date(year, month, day);
    }
  }
  return def;
};

router.render = (req, res) => {
  switch(req._parsedUrl.pathname) {
    case '/scheduledSessions':
      const today = new Date();
      const params = new URLSearchParams(req._parsedUrl.search);
      const startDate = getDate(params.get('startDate'), today);
      const future = new Date((new Date(startDate)).setMonth(startDate.getMonth() + 1));
      const endDate = getDate(params.get('endDate'), future);
      const limit = params.get('limit')
        ? + params.get('limit')
        : 10;
      console.log(startDate.toString());
      res.jsonp(
        generateScheduledSessions(
          startDate.toString(),
          endDate.toString(),
          limit
        )
      );
      break;
    case '/sessions':
      res.jsonp(sessions);
      break;
    case '/users':
      res.jsonp(users);
      break;
    default:
      res.jsonp(res.locals.data);
  } 
};

server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running');
});
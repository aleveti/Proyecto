const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const workRouter = require('./routers/work.routes');
const personRouter = require('./routers/person.routes');
const serviceRouter = require('./routers/service.routes');
const employeeRouter = require('./routers/employee.routes');
const addressRouter = require('./routers/address.routes');
const usersRouter = require('./routers/user.routes');
const payMRouter = require('./routers/payM.routes');
const reviewsRouter = require('./routers/reviews.routes');
const employeesWorkRouter = require('./routers/employeesWork.routes');
const payRouter = require('./routers/pay.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(workRouter);
app.use(personRouter);
app.use(serviceRouter);
app.use(employeeRouter);
app.use(addressRouter);
app.use(usersRouter);
app.use(payMRouter);
app.use(reviewsRouter);
app.use(employeesWorkRouter);
app.use(payRouter);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message
  })
});

app.listen(4000);
console.log("My server on port 4000");
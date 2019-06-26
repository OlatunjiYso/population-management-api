import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';

import db from './models';
import locationHandler from './routes/locations';

db.makeConnection();
const app = express();
app.use(cors());

// Parse incoming requests data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/locations/', locationHandler);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening on port ${process.env.PORT || 3000}`),
);




export default app;
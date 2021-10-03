import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

import type { Db } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";

type AppAPIRequest = NextApiRequest & { dbClient: MongoClient; db: Db };

const { DB_USER, DB_PASS, DB_HOST } = process.env;

const dbUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/role_call?retryWrites=true&w=majority`;

const client = new MongoClient(dbUri);

async function database(
  req: AppAPIRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db("role_call");
  return next();
}

const middleware = nextConnect<NextApiRequest, NextApiResponse>();

middleware.use(database);

export default middleware;
export type { AppAPIRequest };

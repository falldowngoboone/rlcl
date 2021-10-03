import nextConnect from "next-connect";
import middleware, { AppAPIRequest } from "../../../middleware/db";

import type { NextApiResponse } from "next";

const listsHandler = nextConnect();
listsHandler.use(middleware);

listsHandler.get(async function getLists(
  req: AppAPIRequest,
  res: NextApiResponse
) {
  const lists = [];
  const data = req.db.collection("lists").find();
  if (data) {
    for await (const list of data) {
      lists.push(list);
    }
  }
  res.json(lists);
});

listsHandler.post(async function addList(
  req: AppAPIRequest,
  res: NextApiResponse
) {
  const { list } = req.body;
  const listWithId = req.db.collection("lists").insertOne({ ...list });
  res.json(listWithId);
});

export default listsHandler;

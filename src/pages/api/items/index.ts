import nextConnect from "next-connect";
import middleware, { AppAPIRequest } from "../../../middleware/db";

import type { NextApiResponse } from "next";

const itemsHandler = nextConnect();
itemsHandler.use(middleware);

itemsHandler.get(async (req: AppAPIRequest, res: NextApiResponse) => {
  const items = [];
  const data = req.db.collection("items").find();
  if (data) {
    for await (const item of data) {
      items.push(item);
    }
  }
  res.json(items);
});

itemsHandler.post(async (req: AppAPIRequest, res: NextApiResponse) => {
  const { item } = req.body;
  const itemWithId = await req.db.collection("items").insertOne({ ...item });
  res.json(itemWithId);
});

export default itemsHandler;

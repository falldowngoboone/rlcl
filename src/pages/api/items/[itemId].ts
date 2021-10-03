import nextConnect from "next-connect";
import middleware, { AppAPIRequest } from "../../../middleware/db";

import type { NextApiResponse } from "next";
import { ObjectId } from "bson";

const ITEMS = "items";

const itemHandler = nextConnect();
itemHandler.use(middleware);

itemHandler.get(async function getItem(
  req: AppAPIRequest,
  res: NextApiResponse
) {
  const item = await req.db.collection(ITEMS).findOne({ _id: itemId(req) });
  res.json(item);
});

itemHandler.delete(async function deleteItem(
  req: AppAPIRequest,
  res: NextApiResponse
) {
  const deletedItem = await req.db
    .collection(ITEMS)
    .findOneAndDelete({ _id: itemId(req) });
  res.json(deletedItem);
});

function itemId(req: AppAPIRequest) {
  const { itemId } = req.query;
  return new ObjectId(Array.isArray(itemId) ? itemId[0] : itemId);
}

export default itemHandler;

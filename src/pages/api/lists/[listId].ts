import nextConnect from "next-connect";
import middleware, { AppAPIRequest } from "../../../middleware/db";

import type { NextApiResponse } from "next";
import { ObjectId } from "bson";

const listHandler = nextConnect();
listHandler.use(middleware);

listHandler.get(async function getList(
  req: AppAPIRequest,
  res: NextApiResponse
) {
  const { listId } = req.query;
  const idParam = Array.isArray(listId) ? listId[0] : listId;
  const list = await req.db?.collection("lists").findOne({
    _id: new ObjectId(idParam),
  });
  res.json(list);
});

listHandler.patch(async function updateList(
  req: AppAPIRequest,
  res: NextApiResponse
) {
  // TODO
});

listHandler.delete(async function deleteList(
  req: AppAPIRequest,
  res: NextApiResponse
) {
  // TODO
});

export default listHandler;

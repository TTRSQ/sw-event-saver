import * as ff from "@google-cloud/functions-framework";
import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore();

ff.http("SwitchBotEvent", async (req: ff.Request, res: ff.Response) => {
  const key = datastore.key("SwitchBotEvent");
  const body = req.body.context;
  const row = {
    key,
    data: {
      deviceId: body.deviceMac,
      createdAt: new Date().getTime(),
      ...req.body,
    },
  };
  const dbres = await datastore.save(row);
  res.json(dbres);
});

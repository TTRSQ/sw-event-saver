import * as ff from "@google-cloud/functions-framework";
import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: "ホゲホゲ",
  namespace: "SwitchBotEvent",
});

ff.http("SwitchBotEvent", async (req: ff.Request, res: ff.Response) => {
  const key = datastore.key(req.body.context.deviceType);
  const row = {
    key,
    data: {
      evventType: req.body.eventType,
      eventVersion: req.body.eventVersion,
      createdAt: new Date().getTime(),
      ...req.body.context,
    },
  };
  const dbres = await datastore.save(row);
  res.json(dbres);
});

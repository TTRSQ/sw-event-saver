import * as ff from "@google-cloud/functions-framework";
import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: "hoge",
  namespace: "fuga",
});

ff.http("SwitchBotEvent", async (req: ff.Request, res: ff.Response) => {
  const key = datastore.key(req.body.eventType);
  const row = {
    key,
    data: {
      eventVersion: req.body.eventVersion,
      createdAt: new Date().getTime(),
      ...req.body.context,
    },
  };
  const dbres = await datastore.save(row);
  res.json(dbres);
});

import * as ff from "@google-cloud/functions-framework";
import { Datastore } from "@google-cloud/datastore";
import axios from "axios";

const datastore = new Datastore({
  projectId: "hoge",
  namespace: "SwitchBotEvent",
});

ff.http("SwitchBotEvent", async (req: ff.Request, res: ff.Response) => {
  const { eventType, eventVersion, context } = req.body;
  const key = datastore.key(eventType);
  const row = {
    key,
    data: {
      eventType,
      eventVersion,
      createdAt: new Date().getTime(),
      ...context,
    },
  };
  const dbres = await datastore.save(row);
  await axios.get("fuga");
  res.json(dbres);
});

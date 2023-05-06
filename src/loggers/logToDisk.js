import { json } from "express";
import fs from "fs";

const localLog = "C:\\Users\\Patrick\\Desktop\\MERN_Stack\\Logs\\";

const LogException = (req, erro) => {
  const datetime = new Date();
  const nameLog = `${datetime.getDay()}_${datetime.getMonth()}_${datetime.getFullYear()}.txt`;
  fs.appendFileSync(
    localLog + nameLog,
    JSON.stringify({
      Type: "Exception",
      DateTime: datetime,
      Method: req.method,
      Url: req.baseUrl,
      Erro: erro,
    }) + "\n\r"
  );
};

export default { LogException };

import dayjsLib from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjsLib.locale(ptBR);
dayjsLib.extend(relativeTime);

export const dayjs = dayjsLib;

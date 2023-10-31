import { _modify_config } from "./config.js";
import { config_intention } from "./getConfigIntention.js";

export const modifyConfig = () => {
  let { arg, value } = config_intention();
  _modify_config(arg, value);
};

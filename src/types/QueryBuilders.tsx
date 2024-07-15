import { Dispatch, SetStateAction } from "react";
import { Field, RuleGroupType, RuleType } from "react-querybuilder";

export type Fields = {
  name: string;
  label: string;
  type: string;
};

export type QFilters = {
  fields: Array<Field>;
  setQuery: Dispatch<SetStateAction<RuleGroupType<RuleType<string, string, any, string>, string>>>;
};

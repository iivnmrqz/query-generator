import { useState } from "react";
import { DefaultOperator, Field, formatQuery } from "react-querybuilder";
import Select from "react-select";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Fields } from "@/types/QueryBuilders";

// Define the structure of an individual rule
type QRuleType = {
  field: string;
  operator: string;
  value: string;
};

const MainContainer = () => {
  const [query, setQuery] = useState({
    combinator: "and",
    rules: [],
  });

  const defaultOperators = [
    { name: "=", value: "=", label: "=" } as const,
    { name: "!=", value: "!=", label: "!=" } as const,
    { name: "<", value: "<", label: "<" } as const,
    { name: ">", value: ">", label: ">" } as const,
    { name: "<=", value: "<=", label: "<=" } as const,
    { name: ">=", value: ">=", label: ">=" } as const,
    { name: "contains", value: "contains", label: "contains" } as const,
    { name: "beginsWith", value: "beginsWith", label: "begins with" } as const,
    { name: "endsWith", value: "endsWith", label: "ends with" } as const,
    { name: "doesNotContain", value: "doesNotContain", label: "does not contain" } as const,
    { name: "doesNotBeginWith", value: "doesNotBeginWith", label: "does not begin with" } as const,
    { name: "doesNotEndWith", value: "doesNotEndWith", label: "does not end with" } as const,
    { name: "null", value: "null", label: "is null" } as const,
    { name: "notNull", value: "notNull", label: "is not null" } as const,
    { name: "in", value: "in", label: "in" } as const,
    { name: "notIn", value: "notIn", label: "not in" } as const,
    { name: "between", value: "between", label: "between" } as const,
    { name: "notBetween", value: "notBetween", label: "not between" } as const,
  ] satisfies DefaultOperator[];

  const fields: Array<Fields> = [
    { name: "firstName", label: "First Name", type: "string" },
    { name: "lastName", label: "Last Name", type: "string" },
    { name: "createdAt", label: "Created At", type: "Date" },
    { name: "updatedAt", label: "Updated At", type: "Date" },
    { name: "hasPermission", label: "hasPermission", type: "string" },
  ];

  const handleQueryChange = (field: Field, isNew = false) => {
    if (isNew) {
      const newRules = {
        field: field.name,
        id: uuidv4(),
        operator: "=",
        value: "",
        valueSource: "value",
      };

      // @ts-ignore
      setQuery((prevQuery) => ({
        ...prevQuery,
        rules: [...prevQuery.rules, newRules],
      }));
    } else {
      // @ts-ignore
      setQuery((prevQuery) => ({
        ...prevQuery,
        rules: prevQuery.rules.map((rule) => (rule.id === field.id ? { ...rule, ...field } : rule)),
      }));
    }
  };

  const debounced = useDebouncedCallback(
    // function
    (field) => {
      handleQueryChange(field);
    },
    // delay in ms
    200,
  );

  return (
    <div className="container mx-auto mt-5">
      <div className="d-flex rounded p-5 outline">
        <Popover>
          <PopoverTrigger asChild>
            <Button> + Filter</Button>
          </PopoverTrigger>
          <PopoverContent className="w-100 m-0 p-0" align="start">
            <Tabs defaultValue="tab1" orientation="vertical">
              <TabsList aria-label="tabs example">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              <TabsContent value="all">All Users Content</TabsContent>
              <TabsContent value="users">
                <TabsList aria-label="tabs example">
                  {fields.map((field, index) => {
                    return (
                      <>
                        {" "}
                        <div>
                          <Button key={index} onClick={() => handleQueryChange(field, true)}>
                            {field.label}
                          </Button>
                        </div>
                      </>
                    );
                  })}
                </TabsList>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>

        <div className="gap-4">
          {query.rules.map((obj) => (
            <>
              {" "}
              <div className="mx-4 flex items-center gap-4">
                <div>where</div>
                <div className="">{obj.field}</div>
                <Select
                  options={defaultOperators}
                  defaultValue={defaultOperators.filter((op) => op.name === obj.operator)}
                  onChange={(e) => debounced({ ...obj, operator: e?.value })}
                />
                <div className="input">
                  <Input
                    className=""
                    value={obj.value}
                    onChange={(e) => debounced({ ...itobjem, value: e.target.value })}
                  />
                </div>
              </div>
            </>
          ))}
        </div>
        <pre>{formatQuery(query, "sql")}</pre>
      </div>
    </div>
  );
};

export default MainContainer;

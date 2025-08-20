
"use client";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const ReactSelect = ({
  url = "",
  isMulti = false,
  form,
  name,
}: {
  url: string;
  isMulti: boolean;
  form: any;
  name: string;
}) => {
  const [data, setData] = useState<{ label: string; value: number | string | null }[]>([]);
  useEffect(() => {
    if (name === "state" && url === "") {
      setData([
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ]);
    }
  }, [name, url]);

  // Fetch data from the API for other fields
  const { isLoading, data: fetchData } = useQuery({
    queryKey: ["fetchData", url],
    queryFn: async () => {
      // Skip API call for state field or if URL is empty
      if (name === "state" || !url) {
        return [];
      }
      
      const response = await clientSideFetch({
        url,
        method: "get",
        toast: "skip",
      });
      if (response?.status === 200) {
        return response?.data?.results.map((item: any) => ({
          label: item?.name||item?.first_name,
          value: item?.id || null,
        }));
      }
      return [];
    },
    enabled: url !== "" && name !== "state", // Only run query if URL is provided and not for state field
  });

  useEffect(() => {
    if (fetchData) {
      setData(fetchData);
    }
  }, [fetchData]);
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        defaultValue={
          form.getValues(name) ||
          (isMulti ? [] : { value: null, label: "" })
        }
        render={({ field }) => (
          <Select
            {...field}
            options={data}
            isMulti={isMulti}
            onChange={(selectedOption) => {
              const selectedValue = isMulti
                ? Array.isArray(selectedOption)
                  ? selectedOption.map((option: any) => option.value)
                  : []
                : selectedOption && !Array.isArray(selectedOption) && typeof selectedOption === "object"
                ? (selectedOption as { label: string; value: number | null }).value
                : null;

              // Update the form value using form.setValue()
              form.setValue(name, selectedValue, { shouldValidate: true, shouldDirty: true });
              
              // Log the selected value for debugging
              console.log(`Selected ${name}:`, selectedValue);
            }}
            isLoading={isLoading}
            isDisabled={isLoading}
            value={
              isMulti
                ? data.filter((option) => field.value.includes(option.value))
                : data.find((option) => option.value === field.value) // For single select, find the selected option
            }
          />
        )}
      />
    </div>
  );
};

export default ReactSelect;

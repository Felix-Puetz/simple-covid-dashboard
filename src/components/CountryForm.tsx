import React, { useState } from "react";

export interface CountryFormProps {
  initialCountry: string;
  onSubmit: (newCountry: string) => void;
}

export function CountryForm(props: CountryFormProps) {
  const { initialCountry, onSubmit } = props;

  const [country, setCountry] = useState<string>(initialCountry);

  const onCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(country);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div></div>
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Country"
          aria-label="Country"
          value={country}
          onChange={onCountryChange}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-2 text-white py-1 px-2 rounded"
          type="button"
        >
          Search
        </button>
      </div>
    </form>
  );
}

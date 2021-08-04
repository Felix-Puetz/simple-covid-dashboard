import React, { useEffect, useState } from "react";
import { coronaApi } from "./api/disease-sh/CoronaApi";
import { CoronaByCountry, CoronaWorldWide } from "./api/disease-sh/types";
import { CountryForm } from "./components/CountryForm";
import { LoadingDot } from "./components/LoadingDot";
import { StickyFooter } from "./components/StickyFooter";
import { StickyHeader } from "./components/StickyHeader";
import {
  WidgetsContainer,
  WidgetsContainerProps,
} from "./components/WidgetsContainer";
import { toaster } from "./tools/toaster";

function App() {
  const [worldwideData, setWorldwideData] = useState<CoronaWorldWide>();
  const [countryData, setCountryData] = useState<CoronaByCountry>();
  const [country, setCountry] = useState<string>("Germany");

  useEffect(() => {
    const fetchByCountry = async () => {
      try {
        const response = await coronaApi.byCountry(country);
        setCountryData(response.data);
      } catch (e) {
        toaster.error(
          `Could not fetch data for country: <strong>${country}</strong>`
        );
      }
    };

    fetchByCountry();
  }, [country]);

  useEffect(() => {
    const fetchWorldwide = async () => {
      try {
        const response = await coronaApi.worldwide();
        setWorldwideData(response.data);
      } catch (e) {
        toaster.error(`Failed to fetch worldwide data`);
      }
    };

    fetchWorldwide();
  }, []);

  const onFormSubmit = (newCountry: string) => {
    if (!newCountry || country === newCountry) return;

    setCountryData(undefined);
    setCountry(newCountry);
  };

  const countryWidgets: WidgetsContainerProps[] = [
    {
      title: `${countryData?.country || country} Today`,
      widgets: [
        { title: "Cases", content: countryData?.todayCases },
        { title: "Deaths", content: countryData?.todayDeaths },
        { title: "Recovered", content: countryData?.todayRecovered },
      ],
    },
    {
      title: `${countryData?.country || country} Total`,
      widgets: [
        { title: "Cases", content: countryData?.cases },
        { title: "Deaths", content: countryData?.deaths },
        { title: "Recovered", content: countryData?.recovered },
      ],
    },
  ];

  const worldwideWidgets: WidgetsContainerProps[] = [
    {
      title: "Worldwide Today",
      widgets: [
        { title: "Cases", content: worldwideData?.todayCases },
        { title: "Deaths", content: worldwideData?.todayDeaths },
        { title: "Recovered", content: worldwideData?.todayRecovered },
      ],
    },
    {
      title: "Worldwide Total",
      widgets: [
        { title: "Cases", content: worldwideData?.cases },
        { title: "Deaths", content: worldwideData?.deaths },
        { title: "Recovered", content: worldwideData?.recovered },
      ],
    },
  ];

  return (
    <div className="App bg-gray-600">
      <StickyHeader />

      <main className="Content w-full h-full relative p-5">
        <div className="grid grid-cols-2">
          <div className="p-5 flex flex-row">
            {countryData?.countryInfo?.flag ? (
              <img
                src={countryData?.countryInfo.flag}
                alt={`flag-${country}`}
                className="w-16"
              />
            ) : (
              <LoadingDot />
            )}
          </div>
          <CountryForm initialCountry={country} onSubmit={onFormSubmit} />
        </div>

        {countryWidgets.map(({ title, widgets }) => (
          <WidgetsContainer title={title} widgets={widgets} key={title} />
        ))}

        <hr />

        {worldwideWidgets.map(({ title, widgets }) => (
          <WidgetsContainer title={title} widgets={widgets} key={title} />
        ))}
      </main>

      <StickyFooter />
    </div>
  );
}

export default App;

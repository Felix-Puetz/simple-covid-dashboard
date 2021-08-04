import axios, { AxiosInstance } from "axios";
import { CoronaByCountry, CoronaWorldWide } from "./types";

export class CoronaApi {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "https://disease.sh/v3/covid-19",
    });
  }

  worldwide() {
    return this.axios.get<CoronaWorldWide>(`/all`);
  }

  byCountry(country: string) {
    return this.axios.get<CoronaByCountry>(`/countries/${country}`);
  }
}

export const coronaApi = new CoronaApi();

import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

import {
  fetchCarBrandResponse,
  fetchCarTypeResponse,
  fetchCostResponse,
  fetchCountryResponse,
  fetchYearsResponse,
} from '../utils/api';
import { processCars, processCommaSeparated, processResponse, processYears } from '../utils/responseProcessor';

export interface CarInsuranceProps {
  name: string;
}

export const CarInsurance: FC<CarInsuranceProps> = ({ name }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const [carBrands, setCarBrands] = useState<string[]>([]);
  const [selectedCarBrand, setSelectedCarBrand] = useState<string>('');

  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [selectedCarType, setSelectedCarType] = useState<string>('');

  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');

  const [insuranceCost, setInsuranceCost] = useState<string>('');

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetchCountryResponse(name);
      setCountries(processCommaSeparated(processResponse(response)));
    };

    if (name) {
      fetchCountry();
    }
  }, [name]);

  const onCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handleCountrySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCarBrands(selectedCountry);
  };

  const fetchCarBrands = async (country: string) => {
    const response = await fetchCarBrandResponse(country);
    setCarBrands(processCars(processResponse(response)));
  };

  const onCarBrandChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCarBrand(e.target.value);
  };

  const handleCarBrandSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCarTypes(selectedCarBrand, selectedCountry);
  };

  const fetchCarTypes = async (brand: string, country: string) => {
    const response = await fetchCarTypeResponse(brand, country);
    setCarTypes(processCars(processResponse(response)));
  };

  const onCarTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCarType(e.target.value);
  };

  const handleCarTypeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchYears(selectedCarBrand, selectedCarType, selectedCountry);
  };

  const fetchYears = async (brand: string, type: string, country: string) => {
    const response = await fetchYearsResponse(brand, type, country);
    setYears(processYears(processResponse(response)));
  };

  const onYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleYearSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCost(selectedCarBrand, selectedCarType, selectedYear, selectedCountry);
  };

  const fetchCost = async (brand: string, type: string, year: string, country: string) => {
    const response = await fetchCostResponse(brand, type, year, country);
    setInsuranceCost(processResponse(response));
  };

  return (
    <div className={'p-4 bg-white rounded shadow mx-5'}>
      <form onSubmit={handleCountrySubmit}>
        <h2 className={'text-lg font-bold mb-2'}>Car Insurance</h2>
        <label>Country</label>
        <br />
        <input
          type={'text'}
          placeholder={'Country'}
          value={selectedCountry}
          className={'w-full p-2 border rounded'}
          onChange={onCountryChange}
        />
      </form>
      {countries
        .filter((country) => country !== selectedCountry)
        .map((country) => (
          <button
            key={country}
            className={'text-gray-700 rounded shadow p-2 cursor-pointer me-2 mt-2'}
            onClick={() => {
              setSelectedCountry(country);
              fetchCarBrands(country);
            }}
          >
            {country}
          </button>
        ))}

      {selectedCountry && (
        <div className={'mt-2'}>
          <form onSubmit={handleCarBrandSubmit}>
            <label>Car brand</label>
            <br />
            <input
              type={'text'}
              placeholder={'Car brand'}
              value={selectedCarBrand}
              className={'w-full p-2 border rounded'}
              onChange={onCarBrandChange}
            />
          </form>
          {carBrands
            .filter((brand) => brand !== selectedCarBrand)
            .map((brand) => (
              <button
                key={brand}
                className={'text-gray-700 rounded shadow p-2 cursor-pointer me-2 mt-2'}
                onClick={() => {
                  setSelectedCarBrand(brand);
                  fetchCarTypes(brand, selectedCountry);
                }}
              >
                {brand}
              </button>
            ))}
        </div>
      )}

      {selectedCarBrand && (
        <div className={'mt-2'}>
          <form onSubmit={handleCarTypeSubmit}>
            <label>Car type</label>
            <br />
            <input
              type={'text'}
              placeholder={'Car type'}
              value={selectedCarType}
              className={'w-full p-2 border rounded'}
              onChange={onCarTypeChange}
            />
          </form>
          {carTypes
            .filter((type) => type !== selectedCarType)
            .map((type) => (
              <button
                key={type}
                className={'text-gray-700 rounded shadow p-2 cursor-pointer me-2 mt-2'}
                onClick={() => {
                  setSelectedCarType(type);
                  fetchYears(selectedCarBrand, type, selectedCountry);
                }}
              >
                {type}
              </button>
            ))}
        </div>
      )}

      {selectedCarType && (
        <div className={'mt-2'}>
          <form onSubmit={handleYearSubmit}>
            <label>Year of production</label>
            <br />
            <input
              type={'text'}
              placeholder={'Year of production'}
              value={selectedYear}
              className={'w-full p-2 border rounded'}
              onChange={onYearChange}
            />
          </form>
          {years
            .filter((year) => year !== selectedYear)
            .map((year) => (
              <button
                key={year}
                className={'text-gray-700 rounded shadow p-2 cursor-pointer me-2 mt-2'}
                onClick={() => {
                  setSelectedYear(year);
                  fetchCost(selectedCarBrand, selectedCarType, year, selectedCountry);
                }}
              >
                {year}
              </button>
            ))}
        </div>
      )}

      {selectedYear && <p className={'mt-3'}>{insuranceCost}</p>}
    </div>
  );
};

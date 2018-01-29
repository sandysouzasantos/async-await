const axios = require('axios');

const getExchangeRate = async (from, to) => {

    try {
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);

        const rate = response.data.rates[to];

        if(rate){
            return rate;
        } else{
            throw new Error();
        }

    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
};

const getCountries = async (currencyCode) => {

    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}.`);
    }
};

const convertCurrency = async (from, to, amount) => {

    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);

    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries}`;
};

convertCurrency('SSS', 'MMM', 100).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});

/*getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate);
});*/

/*
getCountries('cad').then((countries)=>{
    console.log(countries);
});*/

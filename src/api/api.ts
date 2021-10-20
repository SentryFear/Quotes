import { QuoteType } from "../components/quotes/types";

export const APIA = {
	async getQuotes() {
		let result: [string, QuoteType][] = [];

		await fetch("https://poloniex.com/public?command=returnTicker")
			.then((res) => res.json())
			.catch((e) => {
				return Promise.reject(e);
			})
			.then((req: { [p: string]: QuoteType }) => {
				result = Object.entries(req);
			});
		return Promise.resolve(result.slice(0, result.length / 2));
	},
};

export const APIB = {
	async getQuotes() {
		let result: [string, QuoteType][] = [];

		await fetch("https://poloniex.com/public?command=returnTicker")
			.then((res) => res.json())
			.then((req: { [p: string]: QuoteType }) => {
				result = Object.entries(req);
			});

		return result.slice(result.length / 2, result.length);
	},
};

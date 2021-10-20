import React, { useEffect, useState } from "react";
import { QuoteType } from "./types";
import { APIA, APIB } from "../../api/api";
import "./quotes.scss";
import { compareTicker } from "../../utils/utils";
import Quote from "./quote";
import { useParams } from "react-router-dom";
import Modal from "./modal/modal";
import loading from "./../../loading.svg";

const Quotes = () => {
	const [quotes, setQuotes] = useState<[string, QuoteType][]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [api, setApi] = useState(APIA);
	const params = useParams<{ id: string }>();
	const [showModal, setShowModal] = useState<number>();

	useEffect(() => {
		setIsLoading(true);
		if (params.id === "2") {
			setApi(APIB);
			APIB.getQuotes()
				.then((res) => {
					setQuotes(res);
					setIsLoading(false);
					setIsError(false);
				})
				.catch((e) => {
					console.log(e);
					setIsError(true);
				});
		} else {
			setApi(APIA);
			APIA.getQuotes()
				.then((res) => {
					setQuotes(res);
					setIsLoading(false);
					setIsError(false);
				})
				.catch((e) => {
					console.log(e);
					setIsError(true);
				});
		}
	}, [params.id]);

	useEffect(() => {
		let rotationInterval = setInterval(() => {
			if (showModal === undefined) {
				api
					.getQuotes()
					.then((res) => {
						setQuotes((prev) => {
							res.map((val, i) => {
								val[1].lastColor = compareTicker(val[1].last, prev[i][1].last);

								val[1].highestBidColor = compareTicker(
									val[1].highestBid,
									prev[i][1].highestBid
								);

								val[1].percentChangeColor = compareTicker(
									val[1].percentChange,
									prev[i][1].percentChange
								);
								return val;
							});
							return res;
						});
						setIsError(false);
					})
					.catch((e) => {
						console.log(e);
						setIsError(true);
					});
			}
		}, 5000);

		return () => {
			clearInterval(rotationInterval);
		};
	}, [quotes, api, showModal]);

	const clickTickerHandle = (id: number) => () => {
		setShowModal(id);
	};

	return (
		<div className="quotes">
			{isError && <div className="error">Ошибка</div>}
			{isLoading ? (
				<div className="loading">
					<img src={loading} alt="loading" />
				</div>
			) : (
				<>
					<table className="table" cellSpacing="5" cellPadding="5">
						<thead>
							<tr>
								<td>Имя тикера</td>
								<td>Последняя цена</td>
								<td>Самая высокая цена</td>
								<td>Процент изменения цены</td>
							</tr>
						</thead>
						<tbody>
							{quotes.map((val, i) => {
								return (
									<Quote key={i} quote={val} onClick={clickTickerHandle(i)} />
								);
							})}
						</tbody>
					</table>
					{quotes.length > 0 && (
						<Modal
							quote={showModal ? quotes[showModal] : quotes[0]}
							showModal={showModal !== undefined}
							onClose={() => setShowModal(undefined)}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Quotes;

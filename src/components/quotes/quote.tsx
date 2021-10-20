import React, { useEffect, useState } from "react";
import { QuoteType } from "./types";

const Quote = ({
	quote,
	onClick,
}: {
	quote: [string, QuoteType];
	onClick: () => void;
}) => {
	const [classes, setClasses] = useState({
		lastColor: quote[1].lastColor,
		highestBidColor: quote[1].highestBidColor,
		percentChangeColor: quote[1].percentChangeColor,
	});

	useEffect(() => {
		setClasses({
			lastColor: quote[1].lastColor,
			highestBidColor: quote[1].highestBidColor,
			percentChangeColor: quote[1].percentChangeColor,
		});

		let timeout = setTimeout(() => {
			setClasses({
				lastColor: "",
				highestBidColor: "",
				percentChangeColor: "",
			});
		}, 1000);

		return () => clearTimeout(timeout);
	}, [quote]);

	return (
		<tr onClick={onClick}>
			<td>{quote[0]}</td>
			<td className={classes.lastColor}>{quote[1].last}</td>
			<td className={classes.highestBidColor}>{quote[1].highestBid}</td>
			<td className={classes.percentChangeColor}>
				{(+quote[1].percentChange * 100).toFixed(2)}%
			</td>
		</tr>
	);
};

export default Quote;

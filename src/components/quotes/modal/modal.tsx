import React from "react";
import { QuoteType } from "../types";
import "./modal.scss";

const Modal = ({
	quote,
	showModal,
	onClose,
}: {
	quote: [string, QuoteType];
	showModal: boolean;
	onClose: () => void;
}) => {
	const onKeydown = ({ key }: KeyboardEvent) => {
		switch (key) {
			case "Escape":
				onClose();
				break;
		}
	};
	React.useEffect(() => {
		document.addEventListener("keydown", onKeydown);
		return () => document.removeEventListener("keydown", onKeydown);
	});
	return (
		<div
			className="modal"
			style={{ display: showModal ? "block" : "none" }}
			onClick={onClose}
		>
			<div className="modalBody" onClick={(e) => e.stopPropagation()}>
				<div className="modalHeader">
					<h3 className="modalTitle">{quote[0]}</h3>
					<span className="modalClose" onClick={onClose}>
						&times;
					</span>
				</div>
				<div className="modalContent">
					<p>last: {quote[1].last}</p>
					<p>lowestAsk: {quote[1].lowestAsk}</p>
					<p>highestBid: {quote[1].highestBid}</p>
					<p>percentChange: {quote[1].percentChange}</p>
					<p>baseVolume: {quote[1].baseVolume}</p>
					<p>quoteVolume: {quote[1].quoteVolume}</p>
					<p>isFrozen: {quote[1].isFrozen}</p>
					<p>postOnly: {quote[1].postOnly}</p>
					<p>high24hr: {quote[1].high24hr}</p>
					<p>low24hr: {quote[1].low24hr}</p>
				</div>
			</div>
		</div>
	);
};

export default Modal;

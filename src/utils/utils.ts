export const compareTicker = (prev: string, next: string) => {
	let color = "";

	if (+next > +prev) color = "green";
	else if (+next < +prev) color = "red";

	return color;
};

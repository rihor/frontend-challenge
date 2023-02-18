import { HTMLAttributes } from "react";
import { formatDollar } from "@/utils/currency";
import { appendStyles } from "@/utils/styles";
import styles from "./styles.module.scss";

interface Props extends HTMLAttributes<HTMLSpanElement> {
	value: number;
}

export function CurrencyChange(props: Props) {
	const isNegative = props.value < 0;
	const formatted = formatDollar(Number(props.value));

	return (
		<span
			{...props}
			className={appendStyles([
				styles.change,
				isNegative ? styles.negative : styles.positive,
				props.className,
			])}
		>
			{isNegative ? formatted : `+${formatted}`}
		</span>
	);
}

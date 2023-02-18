import { Blockchain } from "@/services/blockchains";
import { formatDollar } from "@/utils/currency";
import { appendStyles } from "@/utils/styles";
import { CurrencyChange } from "../CurrencyChange";
import styles from "./styles.module.scss";

interface Props {
	chains: Blockchain[];
}

export function HorizontalTimeline(props: Props) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.slider}>
				{props.chains.map((chain) => (
					<TimelineElement key={chain.id} data={chain} />
				))}
				{props.chains.map((chain) => (
					<TimelineElement key={chain.id + ":)"} data={chain} />
				))}
			</div>
		</div>
	);
}

interface ElementProps {
	data: Blockchain;
}

function TimelineElement(props: ElementProps) {
	return (
		<div key={props.data.symbol} className={styles.element}>
			<span className={styles.symbol}>{props.data.symbol}</span>
			<span className={styles.price}>
				{formatDollar(Number(props.data.priceUsd), true)}
			</span>
			<CurrencyChange value={Number(props.data.changePercent24Hr)} />
		</div>
	);
}

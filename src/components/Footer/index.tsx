import Image from "next/image";
import styles from "./styles.module.scss";

interface Props {}

export function Footer(props: Props) {
	return (
		<footer className={styles.background}>
			<div>
				<p>Copyright © 2022 - All rights reserved</p>

				<Image
					src="/images/logo.png"
					alt="CoinSynch logo"
					width={96}
					height={16}
					loading="lazy"
				/>
			</div>
		</footer>
	);
}

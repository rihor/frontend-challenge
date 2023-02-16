import { Button } from "@/components/Button";
import { HorizontalTimeline } from "@/components/HorizontalTimeline";
import { Blockchain } from "@/services/blockchains";
import Image from "next/image";
import styles from "./styles.module.scss";

interface Props {
	blockchains: Blockchain[];
}

export function LandingNavigator(props: Props) {
	return (
		<div className={styles.background}>
			<nav className={styles.wrapper}>
				<div className={styles.left_wrapper}>
					<Image
						src="/images/logo.png"
						alt="CoinSynch logo"
						width={124}
						height={21}
					/>

					<div className={styles.links}>
						<Button href="/about-us" design="ghost">
							About us
						</Button>
						<Button href="#top-cryptos" design="ghost">
							Top Cryptos
						</Button>
					</div>
				</div>

				<div className={styles.right_wrapper}>
					<div className={styles.timeline_constraint}>
						<HorizontalTimeline chains={props.blockchains} />
					</div>
					<div className={styles.buttons_container}>
						<Button design="ghost">Sign in</Button>
						<Button design="primary">Sign up</Button>
					</div>
				</div>
			</nav>
		</div>
	);
}

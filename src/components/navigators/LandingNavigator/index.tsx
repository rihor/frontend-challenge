import Image from "next/image";
import { Button } from "@/components/Button";
import { HorizontalTimeline } from "@/components/HorizontalTimeline";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Blockchain } from "@/services/blockchains";
import styles from "./styles.module.scss";

interface Props {
	blockchains: Blockchain[];
	onSignInClick: () => void;
	onSignUpClick: () => void;
}

export function LandingNavigator(props: Props) {
	const { width, height } = useWindowSize();

	const isDesktop = (width || 0) > 768;

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
						<Button href="#about-us" design="ghost">
							About us
						</Button>
						<Button href="#top-cryptos" design="ghost">
							Top Cryptos
						</Button>
					</div>
				</div>

				<div className={styles.right_wrapper}>
					{isDesktop ? (
						<div className={styles.timeline_constraint}>
							<HorizontalTimeline chains={props.blockchains} />
						</div>
					) : undefined}
					<div className={styles.buttons_container}>
						<Button design="ghost" onClick={props.onSignInClick}>
							Sign in
						</Button>
						<Button design="primary" onClick={props.onSignUpClick}>
							Sign up
						</Button>
					</div>
				</div>
				<Button design="ghost" onClick={() => {}}>
					<Image
						src="/svgs/hamburger-menu.svg"
						width={24}
						height={24}
						alt="menu button"
					/>
				</Button>
			</nav>
			{!isDesktop ? (
				<div className={styles.timeline_constraint}>
					<HorizontalTimeline chains={props.blockchains} />
				</div>
			) : undefined}
		</div>
	);
}

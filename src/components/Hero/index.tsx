import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";
import { Button } from "../Button";
import { Arrow } from "../SVGs/Arrow";
import styles from "./styles.module.scss";

interface Props {
	onSignUpClick: () => void;
}

export function Hero(props: Props) {
	const { width, height } = useWindowSize();
	const isMobile = (width || 0) < 595;

	return (
		<section className={styles.background}>
			<div className={styles.section_container}>
				<div>
					<div className={styles.content}>
						<header>
							<h1>Lorem ipsum dolor sit amet, consectetur</h1>
							<h5>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
								aliquam, purus sit amet luctus venenatis, lectus magna fringilla
								urna, porttitor
							</h5>
						</header>
						<Button
							design="primary"
							className={styles.custom_button}
							onClick={props.onSignUpClick}
						>
							SIGN UP NOW
							<Arrow fill="#fff" width={12} height={12} />
						</Button>
					</div>

					<div className={styles.pills}>
						<span>Cryptos</span>
						<span>NFTs</span>
						<span>Games</span>
					</div>
				</div>

				{!isMobile ? (
					<div className={styles.hero_img}>
						<Image
							src="/images/woman_tablet.png"
							alt="Woman looking at tablet"
							width={464 + 32}
							height={499}
						/>
					</div>
				) : undefined}
			</div>
		</section>
	);
}

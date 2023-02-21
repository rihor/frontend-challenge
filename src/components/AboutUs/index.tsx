import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";
import { Button } from "../Button";
import styles from "./styles.module.scss";

interface Props {
	onSignUpClick: () => void;
}

export function AboutUs(props: Props) {
	const { width, height } = useWindowSize();

	const isDesktop = (width || 0) > 768;

	return (
		<section id="about-us" className={styles.background}>
			<div className={styles.section_content}>
				<div className={styles.cards_wrapper}>
					<div>
						<Card
							img="/svgs/bitcoin.svg"
							subtitle="For your company"
							title="Crypto Solutions"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
						/>
						<Card
							img="/svgs/ether.svg"
							subtitle="For your company"
							title="Crypto Solutions"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
						/>
					</div>
					<div>
						<Card
							img="/svgs/chart.svg"
							subtitle="For your company"
							title="Crypto Solutions"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
						/>
						<Card
							img="/svgs/laptop.svg"
							subtitle="For your company"
							title="Crypto Solutions"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,"
						/>
					</div>
				</div>
				<article className={styles.main_content}>
					<header>
						<h5>Lorem ipsum</h5>
						<h2>Lorem ipsum</h2>
					</header>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
						purus sit amet luctus venenatis, lectus magna fringilla urna,
						porttitor
					</p>

					{isDesktop ? (
						<Button design="primary" onClick={props.onSignUpClick}>
							Sign up now
						</Button>
					) : undefined}
				</article>
			</div>
		</section>
	);
}

interface CardProps {
	img: string;
	subtitle: string;
	title: string;
	text: string;
}

function Card(props: CardProps) {
	return (
		<article className={styles.card}>
			<Image src={props.img} alt={props.text} width={64} height={64} />
			<div className={styles.content}>
				<header>
					<p>{props.subtitle}</p>
					<h4>{props.title}</h4>
				</header>
				<p>{props.text}</p>
			</div>
		</article>
	);
}

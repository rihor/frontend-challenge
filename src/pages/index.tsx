import { useRef } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import axios from "axios";
import { LandingNavigator } from "@/components/navigators/LandingNavigator";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Blockchain, Blockchains } from "@/services/blockchains";
import { TopCryptos } from "@/components/TopCryptos";
import { AboutUs } from "@/components/AboutUs";
import { Hero } from "@/components/Hero";
import { Modal, ModalHandler } from "@/components/modals/Modal";
import { SignInForm } from "@/components/forms/SignIn";
import styles from "./LandingPage.module.scss";
import { SignUpForm } from "@/components/forms/SignUp";

interface Props {
	assets: Blockchain[];
}

export default function LandingPage(props: Props) {
	const modalHandlerSignIn = useRef<ModalHandler>(null);
	const modalHandlerSignUp = useRef<ModalHandler>(null);

	function openSignIn() {
		modalHandlerSignUp.current?.close();
		modalHandlerSignIn.current?.open();
	}

	function openSignUp() {
		modalHandlerSignIn.current?.close();
		modalHandlerSignUp.current?.open();
	}

	return (
		<main className={styles.main}>
			<Modal ref={modalHandlerSignIn}>
				<SignInForm />
			</Modal>

			<Modal ref={modalHandlerSignUp}>
				<SignUpForm />
			</Modal>

			<LandingNavigator
				blockchains={props.assets}
				onSignInClick={openSignIn}
				onSignUpClick={openSignUp}
			/>
			<Hero onSignUpClick={openSignUp} />
			<div className={styles.waves}>
				<Image
					src="/svgs/waves.svg"
					alt="waves illustration"
					role="none"
					fill
					placeholder="blur"
					blurDataURL="/svgs/waves.svg"
				/>
			</div>
			<AboutUs onSignUpClick={openSignUp} />
			<TopCryptos blockchains={props.assets} />
			<ContactForm />
			<Footer />
		</main>
	);
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
	const response = await axios.get<Blockchains>(
		"https://api.coincap.io/v2/assets"
	);

	const data = response.data.data;
	data.length = 10;
	return {
		props: {
			assets: response.data.data,
		},
		revalidate: 60,
	};
};

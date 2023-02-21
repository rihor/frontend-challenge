import {
	forwardRef,
	ForwardRefRenderFunction,
	InputHTMLAttributes,
	ReactNode,
} from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import styles from "./styles.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	validationsError?: FieldErrors<FieldValues>;
	children: ReactNode;
}

const CheckComponent: ForwardRefRenderFunction<HTMLInputElement, Props> = (
	{ children, validationsError, ...props },
	ref
) => {
	const messageError = props.name && validationsError?.[props.name]?.message;

	return (
		<div className={styles.wrapper_base}>
			<input id={props.name} ref={ref} type="checkbox" {...props} />
			<label htmlFor={props.name}>{children}</label>
			{messageError && (
				<span className={styles.error_message}>{messageError.toString()}</span>
			)}
		</div>
	);
};

export const Checkbox = forwardRef(CheckComponent);

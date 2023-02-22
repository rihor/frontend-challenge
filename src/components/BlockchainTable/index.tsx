import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { Blockchain } from "@/services/blockchains";
import styles from "./styles.module.scss";
import { formatDollar } from "@/utils/currency";
import { Button } from "../Button";
import { CurrencyChange } from "../CurrencyChange";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useState } from "react";
import { appendStyles } from "@/utils/styles";

interface Props {
	blockchains: Blockchain[];
}

export function BlockchainTable(props: Props) {
	const [indexOpenRow, setIndexOpenRow] = useState<number | null>(null);
	const { width } = useWindowSize();
	const isMobile = (width || 0) <= 595;

	function openRowMenu(id: number) {
		setIndexOpenRow((prev) => {
			if (prev === id) return null;
			return id;
		});
	}

	const table = useReactTable({
		data: props.blockchains,
		columns: [
			{
				header: "#",
				cell: (ctx) => <span>{ctx.row.index}</span>,
			},
			{
				header: "Crypto",
				cell: (ctx) => {
					const row = ctx.row.original;
					const parsedCoinName = row.name.toLowerCase().replace(" ", "-");
					return (
						<span className={styles.coin_name_symbol}>
							<Image
								src={`https://cryptologos.cc/logos/${parsedCoinName}-${row.symbol.toLowerCase()}-logo.svg`}
								width={32}
								height={32}
								alt={row.name}
							/>
							<div>
								<span>{row.name}</span>
								<span>{row.symbol}</span>
							</div>
						</span>
					);
				},
			},
			{
				header: "Price",
				accessorFn: (row) => formatDollar(Number(row.priceUsd), true),
			},
			{
				header: "Change",
				cell: (ctx) => (
					<CurrencyChange
						value={Number(ctx.row.original.changePercent24Hr)}
						hasPercent
					/>
				),
			},
			{
				header: isMobile ? "Actions" : "Trade",
				cell: (ctx) => {
					if (isMobile) {
						return (
							<Button design="ghost">
								<Image
									src="/svgs/chevron-up.svg"
									width={16}
									height={16}
									alt="open or close row menu"
									onClick={() => openRowMenu(ctx.row.index)}
									className={styles.open_menu_img}
									data-open={indexOpenRow == ctx.row.index}
								/>
							</Button>
						);
					}
					return (
						<Button type="button" design="primary" className={styles.buy_btn}>
							Buy
						</Button>
					);
				},
			},
		],
		getCoreRowModel: getCoreRowModel(),
	});

	// Here to prevent hydration render issues
	if (width === undefined) {
		return <></>;
	}

	return (
		<table className={styles.table}>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						<td>
							{row.getVisibleCells().map((cell) => (
								<div key={cell.id} className={styles.row_content}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</div>
							))}
						</td>
						<td
							data-visible={row.index == indexOpenRow}
							className={styles.minimenu}
						>
							{row
								.getVisibleCells()
								.filter((cell) => {
									const header = cell.column.columnDef.header
										?.toString()
										.toLowerCase();

									return header === "price" || header === "change";
								})
								.map((cell) => (
									<div className={styles.mini_item} key={cell.id + "_minimenu"}>
										<span>{cell.column.id}</span>
										<span>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</span>
									</div>
								))}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

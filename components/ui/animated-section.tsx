"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const AnimatedSection = ({
	children,
	title,
}: { children: ReactNode; title: string }) => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div>
			<button
				type="button"
				onClick={() => setIsVisible(!isVisible)}
				className={cn(
					"w-full rounded-[15px] text-left flex flex-row items-center justify-between border py-2 px-4 shadow-sm hover:shadow-md font-semibold",
					isVisible && "bg-primary/5 shadow-md border-primary/20",
				)}
			>
				<div>{title}</div>

				<ChevronDownCircle
					className={cn(
						"h-5 w-5 transition-transform",
						isVisible && "rotate-180",
					)}
				/>
			</button>
			<AnimatePresence initial={false} mode="wait">
				{isVisible && (
					<motion.div
						initial={{
							height: 0,
							opacity: 0,
						}}
						animate={{
							height: "auto",
							opacity: 1,
							transition: {
								height: {
									duration: 0.25,
								},
								opacity: {
									duration: 0.2,
									delay: 0.2,
								},
							},
						}}
						exit={{
							height: 0,
							opacity: 0,
							transition: {
								height: {
									duration: 0.25,
									delay: 0.15,
								},
								opacity: {
									duration: 0.25,
								},
							},
						}}
						key="test"
					>
						<div className="p-4">{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

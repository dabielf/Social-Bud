"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Button } from "./button";

export const AnimatedSection = ({
	children,
	title,
}: { children: ReactNode; title: string }) => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div>
			<Button onClick={() => setIsVisible(!isVisible)} asChild>
				<div className="w-full rounded-[10px] content-start">{title}</div>
			</Button>
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
						<div className="pt-4">{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

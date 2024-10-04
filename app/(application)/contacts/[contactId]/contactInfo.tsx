"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function ContactInfo() {
// 	return (
// 		<Tabs defaultValue="account" className="w-[400px]">
// 			<TabsList className="grid w-full grid-cols-3">
// 				<TabsTrigger value="account">Infos</TabsTrigger>
// 				<TabsTrigger value="history">History</TabsTrigger>
// 				<TabsTrigger value="password">Settings</TabsTrigger>
// 			</TabsList>
// 			<TabsContent value="account">
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Account</CardTitle>
// 						<CardDescription>
// 							Make changes to your account here. Click save when you're done.
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent className="space-y-2">
// 						<div className="space-y-1">
// 							<Label htmlFor="name">Name</Label>
// 							<Input id="name" defaultValue="Pedro Duarte" />
// 						</div>
// 						<div className="space-y-1">
// 							<Label htmlFor="username">Username</Label>
// 							<Input id="username" defaultValue="@peduarte" />
// 						</div>
// 					</CardContent>
// 					<CardFooter>
// 						<Button>Save changes</Button>
// 					</CardFooter>
// 				</Card>
// 			</TabsContent>
// 			<TabsContent value="history">
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>History</CardTitle>
// 						<CardDescription>
// 							Make changes to your account here. Click save when you're done.
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent className="space-y-2">
// 						<div className="space-y-1">
// 							<Label htmlFor="name">Name</Label>
// 							<Input id="name" defaultValue="Pedro Duarte" />
// 						</div>
// 						<div className="space-y-1">
// 							<Label htmlFor="username">Username</Label>
// 							<Input id="username" defaultValue="@peduarte" />
// 						</div>
// 					</CardContent>
// 					<CardFooter>
// 						<Button>Save changes</Button>
// 					</CardFooter>
// 				</Card>
// 			</TabsContent>
// 			<TabsContent value="password">
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Password</CardTitle>
// 						<CardDescription>
// 							Change your password here. After saving, you'll be logged out.
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent className="space-y-2">
// 						<div className="space-y-1">
// 							<Label htmlFor="current">Current password</Label>
// 							<Input id="current" type="password" />
// 						</div>
// 						<div className="space-y-1">
// 							<Label htmlFor="new">New password</Label>
// 							<Input id="new" type="password" />
// 						</div>
// 					</CardContent>
// 					<CardFooter>
// 						<Button>Save password</Button>
// 					</CardFooter>
// 				</Card>
// 			</TabsContent>
// 		</Tabs>
// 	);
// }

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactInfo() {
	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>History</AccordionTrigger>
				<AccordionContent asChild>
					<Card>
						<CardHeader>
							<CardTitle>Account</CardTitle>
							<CardDescription>
								Make changes to your account here. Click save when you&apos;re
								done.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Name</Label>
								<Input id="name" defaultValue="Pedro Duarte" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="username">Username</Label>
								<Input id="username" defaultValue="@peduarte" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save changes</Button>
						</CardFooter>
					</Card>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Infos</AccordionTrigger>
				<AccordionContent>
					Yes. It comes with default styles that matches the other
					components&apos; aesthetic.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Settings</AccordionTrigger>
				<AccordionContent>
					Yes. It&apos;s animated by default, but you can disable it if you
					prefer.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

import { Book, GithubIcon, Lightbulb, MenuSquare, Search, SunMoon } from "lucide-react";
import { Box, Button, Text, Popover, ToggleGroup, Select, Dialog } from "../../../src/mod"
import { State } from "../lib/state";
import Link from "./link";

export let Nav = () => {
	return (
		<Box
			as="nav"
			border
			css={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "1lh 2ch"
			}}
		>
			<Box
				css={{
					alignItems: "center",
					display: "flex",
					gap: "1ch",
				}}
			>
				<Box
					as={Link}
					href="/"
				>
					<span>WebTUI React</span>
				</Box>
				<Theme />
			</Box>
			<Box
				as={"ul"}
				css={{
					display: "none",
					medium: {
						alignItems: "center",
						display: "flex",
						gap: "2ch",
					}
				}}
			>
				<Box as={"li"}>
					<Box
						as={Link}
						href={"/docs"}
						css={{
							display: "flex",
							alignItems: "center",
							gap: "0.5ch",
						}}
					>
						<Book size={"16px"} className="opacity-50" />
						<span>Docs</span>
					</Box>
				</Box>
				<Box as={"li"}>
					<Box as={Link}
						href={"/examples"}
						css={{
							display: "flex",
							alignItems: "center",
							gap: "0.5ch",
						}}
					>
						<Lightbulb size={"16px"} className="opacity-50" />
						<span>Examples</span>
					</Box>
				</Box>
				<Box as={"li"}>
					<Box
						as={"a"}
						href={"https://github.com"}
						target={"_blank"}
						css={{
							display: "flex",
							alignItems: "center",
							gap: "0.5ch",
						}}
					>
						<GithubIcon size={"16px"} className="opacity-50" />
						<span>Github</span>
					</Box>
				</Box>
				<Box as={"li"}>
					<SearchButton text/>
				</Box>
			</Box>
			<Box
				css={{
					display: "flex",
					alignItems: "center",
					gap: ".5ch",
					medium: { display: "none" }
				}}
			>
				<SearchButton />
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<Button
							size={"small"}
							css={{
								padding: "0.5lh 1ch",
								display: "flex",
								alignItems: "center",
								height: "1.5lh",
							}}
						>
							<MenuSquare size={"16px"} />
							<span>MENU</span>
						</Button>
					</Dialog.Trigger>
					<Dialog.Content
						title={"Menu"}
						description={"Navigation"}
					>
						<Box
							as={"ul"}
							css={{
								display: "flex",
								flexDirection: "column",
								gap: "1ch",
							}}
						>
							<Box as={"li"}>
								<Dialog.Close asChild>
									<Box
										as={Link}
										href={"/docs"}
										css={{
											display: "flex",
											alignItems: "center",
											gap: "0.5ch",
										}}
									>
										<Book size={"16px"} className="opacity-50" />
										<span>Docs</span>
									</Box>
								</Dialog.Close>
							</Box>
							<Box as={"li"}>
								<Dialog.Close asChild>
									<Box as={Link}
										 href={"/examples"}
										 css={{
											 display: "flex",
											 alignItems: "center",
											 gap: "0.5ch",
										 }}
									>
										<Lightbulb size={"16px"} className="opacity-50" />
										<span>Examples</span>
									</Box>
								</Dialog.Close>
							</Box>
							<Box as={"li"}>
								<Dialog.Close asChild>
									<Box
										as={"a"}
										href={"https://github.com"}
										target={"_blank"}
										css={{
											display: "flex",
											alignItems: "center",
											gap: "0.5ch",
										}}
									>
										<GithubIcon size={"16px"} className="opacity-50" />
										<span>Github</span>
									</Box>
								</Dialog.Close>
							</Box>
						</Box>
					</Dialog.Content>
				</Dialog.Root>
			</Box>
		</Box>
	)
}

let isEmpty = (str: string) => str === "" || str === " " || str === "\n" || str === "\t"

let Theme = () => {
	let theme = State.useSelection(x => x.theme)
	let { actions, dispatch } = State.useActions();
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Button border small className={"flex items-center justify-center"}>
					<SunMoon size={"20px"} />
				</Button>
			</Popover.Trigger>
			<Popover.Content>
				<Box className={"flex flex-col space-y-2"}>
					<Text>Mode</Text>
					<ToggleGroup.Root
						type={"single"}
						value={theme.mode}
						onValueChange={(m) => dispatch(actions.theme.setMode(
							isEmpty(m) ? theme.mode : m
						))}
					>
						<ToggleGroup.Item value={"auto"}>
							Auto
						</ToggleGroup.Item>
						<ToggleGroup.Item value={"dark"}>
							Dark
						</ToggleGroup.Item>
						<ToggleGroup.Item value={"light"}>
							Light
						</ToggleGroup.Item>
					</ToggleGroup.Root>
					<Text>Theme</Text>
					<Select.Root
						value={theme.theme}
						onValueChange={(v) => dispatch(actions.theme.setTheme(v))}
					>
						<Select.Item value={"catppuccin"}>
							Catppuccin
						</Select.Item>
						<Select.Item value={"nord"}>
							Nord
						</Select.Item>
					</Select.Root>
				</Box>
			</Popover.Content>
		</Popover.Root>
	)
}

let SearchButton = (props: { text?: boolean }) => (
	<Button
		className="flex items-center space-x-1 h-[1.5lh]"
	>
		<Search size={"16px"} className="opacity-50" />
		{props.text && <span>Search</span> }
	</Button>
)
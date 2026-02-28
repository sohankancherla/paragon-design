import { createLazyFileRoute } from "@tanstack/react-router";
import { Example, ExampleWrapper } from "@/frontend/components/example";

export const Route = createLazyFileRoute("/typography/")({
	component: TypographyPage
});

function TypographyPage() {
	return (
		<ExampleWrapper title="Typography">
			<table className="w-full">
				<thead>
					<tr className="border-border border-b">
						<TableHeader>Example</TableHeader>
						<TableHeader>ClassName</TableHeader>
						<TableHeader>Usage</TableHeader>
					</tr>
				</thead>
				<tbody>
					<TableRow
						example="The quick brown fox"
						className="display-1"
						usage="Use for marketing headings"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="display-2"
						usage="Use for marketing subheadings"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="header-1"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="header-2"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="header-3"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="header-4"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-lg"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-base"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-sm"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-xs"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-2xs"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-3xs"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-4xs"
					/>
				</tbody>
			</table>

			<ParagraphExample />
			<BlockquoteExample />
			<TableExample />
			<ListExample />
			<CodeExample />
		</ExampleWrapper>
	);
}

export function TypographyExample() {
	return (
		<ExampleWrapper title="Typography">
			<table className="w-full">
				<thead>
					<tr className="border-border border-b">
						<TableHeader>Example</TableHeader>
						<TableHeader>ClassName</TableHeader>
						<TableHeader>Usage</TableHeader>
					</tr>
				</thead>
				<tbody>
					<TableRow
						example="The quick brown fox"
						className="display-1"
						usage="Use for marketing headings"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="display-2"
						usage="Use for marketing subheadings"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="header-1"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="header-2"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="header-3"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="header-4"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-lg"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-base"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-sm"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-xs"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-3xs"
					/>
					<TableRow
						example="The quick brown fox jumps over the lazy dog"
						className="text-4xs"
					/>
				</tbody>
			</table>

			<ParagraphExample />
			<BlockquoteExample />
			<TableExample />
			<ListExample />
			<CodeExample />
		</ExampleWrapper>
	);
}

function TableHeader({ children }: { children: React.ReactNode }) {
	return (
		<th className="py-3 pr-8 text-left font-medium text-muted-foreground text-sm">
			{children}
		</th>
	);
}

function TableRow({
	example,
	className,
	usage
}: {
	example: string;
	className: string;
	usage?: string;
}) {
	return (
		<tr className="border-border/50 border-b">
			<td className="py-4 pr-8 align-middle">
				<h1 className={className}>{example}</h1>
			</td>
			<td className="py-4 pr-8 align-middle">
				<code className="text-2xs">{className}</code>
			</td>
			{usage && (
				<td className="py-4 align-middle">
					<p className="text-muted-foreground text-sm">{usage}</p>
				</td>
			)}
		</tr>
	);
}

function ParagraphExample() {
	return (
		<Example title="Paragraph">
			<p className="typography max-w-lg">
				The king, seeing how much happier his subjects were, realized the error
				of his ways and repealed the joke tax.
			</p>
		</Example>
	);
}

function BlockquoteExample() {
	return (
		<Example title="Blockquote">
			<blockquote className="typography max-w-lg">
				&quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
				it&apos;s only fair that they should pay for the privilege.&quot;
			</blockquote>
		</Example>
	);
}

function TableExample() {
	return (
		<Example title="Table">
			<table className="typography">
				<thead>
					<tr>
						<th>King's Treasury</th>
						<th>People's Happiness</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Empty</td>
						<td>Overflowing</td>
					</tr>
					<tr>
						<td>Modest</td>
						<td>Satisfied</td>
					</tr>
					<tr>
						<td>Full</td>
						<td>Ecstatic</td>
					</tr>
				</tbody>
			</table>
		</Example>
	);
}

function ListExample() {
	return (
		<Example title="List">
			<ul className="typography">
				<li>1st level of puns: 5 gold coins</li>
				<li>2nd level of jokes: 10 gold coins</li>
				<li>3rd level of one-liners : 20 gold coins</li>
			</ul>
		</Example>
	);
}

function CodeExample() {
	return (
		<Example title="Code">
			<code className="typography text-xs">layout.tsx</code>
		</Example>
	);
}

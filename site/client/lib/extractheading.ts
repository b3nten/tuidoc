import React from 'react';

// Define heading type with level and text
interface Heading {
	level: number;
	text: string;
	id?: string;
	children: Heading[];
}

// Type for valid heading elements (h1-h6)
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Extracts text content from a JSX node recursively
 */
const extractTextContent = (node: React.ReactNode): string => {
	if (typeof node === 'string' || typeof node === 'number') {
		return String(node);
	}

	if (node === null || node === undefined || typeof node === 'boolean') {
		return '';
	}

	if (React.isValidElement(node)) {
		const children = React.Children.toArray(node.props.children);
		return children.map(extractTextContent).join('');
	}

	if (Array.isArray(node)) {
		return node.map(extractTextContent).join('');
	}

	return '';
};

/**
 * Checks if a React element is a heading (h1-h6)
 */
const isHeadingElement = (
	element: React.ReactElement
): element is React.ReactElement<any, HeadingElement> => {
	const type = element.type;
	return (
		typeof type === 'string' &&
		['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(type)
	);
};

/**
 * Gets the heading level (1-6) from a heading element
 */
const getHeadingLevel = (element: React.ReactElement): number => {
	const type = element.type as HeadingElement;
	return parseInt(type.substring(1), 10);
};

/**
 * Recursively extracts headings from JSX content
 * @param node The JSX node to extract headings from
 * @param result Optional array to accumulate results (used internally)
 * @returns Array of heading objects with nested structure
 */
export const extractHeadings = (
	node: React.ReactNode,
	parentLevel: number = 0
): Heading[] => {
	const headings: Heading[] = [];

	if (!node) {
		return headings;
	}

	// Handle array of nodes
	if (Array.isArray(node)) {
		node.forEach((child) => {
			const childHeadings = extractHeadings(child, parentLevel);
			headings.push(...childHeadings);
		});
		return headings;
	}

	// Handle React elements
	if (React.isValidElement(node)) {
		// If it's a heading element, extract its info
		if (isHeadingElement(node)) {
			const level = getHeadingLevel(node);
			const text = extractTextContent(node.props.children);
			const id = node.props.id || '';

			// Add this heading to our results
			const heading: Heading = {
				level,
				text,
				id,
				children: []
			};

			headings.push(heading);

			// Process any children inside the heading
			if (node.props.children) {
				// Process children but don't expect nested headings inside a heading
				extractHeadings(node.props.children, level);
			}
		}
		// For non-heading elements, process their children
		else if (node.props && node.props.children) {
			const childHeadings = extractHeadings(node.props.children, parentLevel);

			// Structure the headings hierarchically
			for (const heading of childHeadings) {
				if (heading.level > parentLevel) {
					// This is either a direct child or needs to be nested deeper
					let currentLevel = parentLevel;
					let currentArray = headings;

					// Navigate to the right level in the hierarchy
					while (currentLevel < heading.level - 1 && currentArray.length > 0) {
						const lastIndex = currentArray.length - 1;
						currentArray = currentArray[lastIndex].children;
						currentLevel++;
					}

					currentArray.push(heading);
				} else {
					// This is a heading at the same or higher level
					headings.push(heading);
				}
			}
		}
	}

	return headings;
};

/**
 * Example usage:
 *
 * const content = (
 *   <div>
 *     <h1>Main Title</h1>
 *     <p>Some text</p>
 *     <h2>Subtitle</h2>
 *     <div>
 *       <h3>Nested section</h3>
 *     </div>
 *     <h2>Another subtitle</h2>
 *   </div>
 * );
 *
 * const headings = extractHeadings(content);
 * console.log(headings);
 */
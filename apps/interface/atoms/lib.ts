/**
 * Atoms Library
 *
 * Atoms are the smallest building blocks of a website page. In atomic design,
 * atoms refer to basic HTML elements that provide the smallest units of a
 * web page, such as buttons, labels, and input fields. Fonts, color palettes,
 * and animations are also considered atoms.
 *
 * Atoms Library is a collection of commonly used types and functions in Atoms
 * component.
 */

/**
 * Atom Data Attributes
 *
 * This is used for styling
 */
export interface AtomDataAttributes {
    [key: string]: string;
}

export type DivElement = "div";

/**
 * Content sectioning elements allow you to organize the document content into
 * logical pieces. Use the sectioning elements to create a broad outline for
 * your page content, including header and footer navigation, and heading
 * elements to identify sections of content.
 */
export type ContentSectioningElements =
    | "article"
    | "aside"
    | "footer"
    | "header"
    | "main"
    | "nav"
    | "section";

export type ListElements = "li" | "menu" | "ol" | "ul";

import React from "react";

/**
 * Render a simple text element
 *
 * @param {Object} props Props passed to the component
 * @param {String} props.text The text to render
 *
 * @return {ReactNode} Markup to render
 */
const Text = ({ text }) => <span>{text}</span>;

export default Text;

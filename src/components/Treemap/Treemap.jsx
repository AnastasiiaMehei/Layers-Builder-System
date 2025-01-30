import { useEffect, useRef } from "react"; // Import useEffect and useRef from React
import * as d3 from "d3"; // Import D3.js library

// Main component to render a treemap
export default function TreeMap({ data }) {
  const ref = useRef(); // Create a reference to the SVG element

  useEffect(() => {
    const width = 500; // Set the width of the SVG element
    const height = 400; // Set the height of the SVG element

    const root = d3.hierarchy(data).sum((d) => d.value || 1); // Create a hierarchy from the data and sum values

    const treemapLayout = d3.treemap().size([width, height]).padding(1); // Define the treemap layout

    treemapLayout(root); // Apply the treemap layout to the hierarchy

    const svg = d3
      .select(ref.current) // Select the SVG element using the reference
      .attr("width", width) // Set the width attribute of the SVG element
      .attr("height", height); // Set the height attribute of the SVG element

    const nodes = svg
      .selectAll("g") // Select all group elements (which don't exist yet)
      .data(root.leaves()) // Bind the data to the group elements
      .enter() // Create new group elements for each data point
      .append("g") // Append a group element to the SVG for each data point
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`); // Position each group element

    nodes
      .append("rect") // Append a rectangle to each group
      .attr("width", (d) => d.x1 - d.x0) // Set the width of the rectangle
      .attr("height", (d) => d.y1 - d.y0) // Set the height of the rectangle
      .attr("fill", "steelblue"); // Set the fill color of the rectangle

    nodes
      .append("text") // Append a text element to each group
      .attr("dx", 4) // Set the x-offset of the text
      .attr("dy", 14) // Set the y-offset of the text
      .text((d) => d.data.title); // Set the text content to the title from the data
  }, [data]); // Dependency array to rerun the effect when data changes

  return <svg ref={ref}></svg>; // Return the SVG element
};

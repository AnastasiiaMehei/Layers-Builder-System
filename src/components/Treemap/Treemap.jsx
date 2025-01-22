// TreeMap.jsx
import { useEffect, useRef } from "react";
import * as d3 from "d3";

const TreeMap = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 500;
    const height = 400;

    const root = d3.hierarchy(data).sum((d) => d.value || 1);

    const treemapLayout = d3.treemap().size([width, height]).padding(1);

    treemapLayout(root);

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", "steelblue");

    nodes
      .append("text")
      .attr("dx", 4)
      .attr("dy", 14)
      .text((d) => d.data.title);
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default TreeMap;

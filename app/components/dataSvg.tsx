import ForceGraph from './forceGraph'

const data = {
  nodes: [
    { "id": "Myriel", "group": 1 },
    { "id": "Napoleon", "group": 1 },
    { "id": "Mlle.Baptistine", "group": 1 },
    { "id": "Mme.Magloire", "group": 1 },
    { "id": "CountessdeLo", "group": 1 },
    { "id": "Geborand", "group": 1 },
    { "id": "Champtercier", "group": 1 },
    { "id": "Cravatte", "group": 1 },
    { "id": "Count", "group": 1 },
    { "id": "OldMan", "group": 1 },
    { "id": "Labarre", "group": 2 },
    { "id": "Valjean", "group": 2 },
  ],
  links: [
    { "source": "Napoleon", "target": "Myriel", "value": 1 },
    { "source": "Mlle.Baptistine", "target": "Myriel", "value": 8 },
    { "source": "Mme.Magloire", "target": "Myriel", "value": 10 },
    { "source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6 },
    { "source": "CountessdeLo", "target": "Myriel", "value": 1 },
    { "source": "Geborand", "target": "Myriel", "value": 1 },
    { "source": "Champtercier", "target": "Myriel", "value": 1 },
  ]
};



export const chart = ForceGraph(data, {
  nodeId: d => d.id,
  nodeGroup: d => d.group,
  nodeTitle: d => `${d.id}\n${d.group}`,
  linkStrokeWidth: l => Math.sqrt(l.value),
  width: 600,
  height: 600,
  // invalidation // a promise to stop the simulation when the cell is re-run
})



// const CreateSVG = async () => {
//   const d3 = await import("d3")

//   const svgGraph = d3.create("svg")
//     .attr("width", 800)
//     .attr("height", 600);

//   // Create a simulation for your nodes
//   const simulation = d3.forceSimulation(data.nodes)
//     .force("link", d3.forceLink(data.links).id(d => d.id))
//     .force("charge", d3.forceManyBody())
//     .force("center", d3.forceCenter(800 / 2, 600 / 2));

//   // Create a "g" element for each node
//   const node = svg.append("g")
//     .selectAll("circle")
//     .data(data.nodes)
//     .join("circle")
//     .attr("r", 20);

//   // Create a "line" element for each link
//   const link = svg.append("g")
//     .selectAll("line")
//     .data(data.links)
//     .join("line");

//   // Update the positions of nodes and links at each "tick" of the simulation
//   simulation.on("tick", () => {
//     link
//       .attr("x1", d => d.source.x)
//       .attr("y1", d => d.source.y)
//       .attr("x2", d => d.target.x)
//       .attr("y2", d => d.target.y);

//     node
//       .attr("cx", d => d.x)
//       .attr("cy", d => d.y);
//   });

//   return svgGraph.node();
// }

// Create a SVG to draw your graph
// export default CreateSVG

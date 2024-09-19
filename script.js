// script.js

// Define source colors
const sourceColors = {
  "Belfagensis": "#fc36ee",
  "Ord Magic": "#ffe365",
  "The Language of Eternity": "#35d7f7",
  "The Rhythm of the Cosmos": "#c431f6",
  "The Essence of the Crust": "#4ed519",
  "Ebbs and Flows": "#8fa9b0",
  "Cause Célèbre": "#e87a12ff"
};

// Data: Nodes and Links
const nodes = [
  { id: "Belfagensis", color: sourceColors["Belfagensis"], url: "https://google.com/" },
  { id: "Ord Magic", color: sourceColors["Ord Magic"], url: "https://google.com/" },
  { id: "The Rhythm of the Cosmos", color: sourceColors["The Rhythm of the Cosmos"], url: "https://google.com/" },
  { id: "The Language of Eternity", color: sourceColors["The Language of Eternity"], url: "https://google.com/" },
  { id: "The Essence of the Crust", color: sourceColors["The Essence of the Crust"], url: "https://google.com/" },
  { id: "Ebbs and Flows", color: sourceColors["Ebbs and Flows"], url: "https://google.com/" },
  { id: "Cause Célèbre", color: sourceColors["Cause Célèbre"], url: "https://google.com/" },
  { id: "Spiremark Sorcery", url: "https://google.com/" },
  { id: "Soulforgery", url: "https://google.com/" },
  { id: "Reality Resonance", url: "https://google.com/" },
  { id: "Solharmonic Sorcery", url: "https://google.com/" },
  { id: "Astral Concordance", url: "https://google.com/" },
  { id: "The Burning Deep Below", url: "https://google.com/" },
  { id: "The Everflowing Tides", url: "https://google.com/" },
  { id: "Enshrinism", url: "https://google.com/" },
  { id: "Banishment Magic", url: "https://google.com/" },
  { id: "Liminality", url: "https://google.com/" },
  { id: "Tempest Arcana", url: "https://google.com/" },
  { id: "Evergreen", url: "https://google.com/" },
  { id: "Overwhelm", url: "https://google.com/" },
  { id: "Capture Keeper", url: "https://google.com/" },
  { id: "Lunar Link", url: "https://google.com/" },
  { id: "Necro’ech’rono", url: "https://google.com/" },
  { id: "Eidolon Weaving", url: "https://google.com/" },
  { id: "Echo Arcana", url: "https://google.com/" }
];

const links = [
  // Spiremark Sorcery
  { source: "The Language of Eternity", target: "Spiremark Sorcery" },
  { source: "The Essence of the Crust", target: "Spiremark Sorcery" },
  // Soulforgery
  { source: "Ebbs and Flows", target: "Soulforgery" },
  { source: "Cause Célèbre", target: "Soulforgery" },
  // Reality Resonance
  { source: "Astral Concordance", target: "Reality Resonance" },
  { source: "Banishment Magic", target: "Reality Resonance" },
  // Solharmonic Sorcery
  { source: "Astral Concordance", target: "Solharmonic Sorcery" },
  { source: "Evergreen", target: "Solharmonic Sorcery" },
  // Astral Concordance
  { source: "The Rhythm of the Cosmos", target: "Astral Concordance" },
  { source: "The Language of Eternity", target: "Astral Concordance" },
  // The Burning Deep Below
  { source: "Belfagensis", target: "The Burning Deep Below" },
  { source: "The Essence of the Crust", target: "The Burning Deep Below" },
  // The Everflowing Tides
  { source: "The Essence of the Crust", target: "The Everflowing Tides" },
  { source: "Ebbs and Flows", target: "The Everflowing Tides" },
  // Enshrinism
  { source: "Ebbs and Flows", target: "Enshrinism" },
  { source: "Ord Magic", target: "Enshrinism" },
  // Banishment Magic
  { source: "Ord Magic", target: "Banishment Magic" },
  { source: "Belfagensis", target: "Banishment Magic" },
  // Liminality
  { source: "Spiremark Sorcery", target: "Liminality" },
  { source: "Banishment Magic", target: "Liminality" },
  // Tempest Arcana
  { source: "The Language of Eternity", target: "Tempest Arcana" },
  { source: "Belfagensis", target: "Tempest Arcana" },
  // Evergreen
  { source: "The Essence of the Crust", target: "Evergreen" },
  { source: "Ord Magic", target: "Evergreen" },
  // Overwhelm
  { source: "Ebbs and Flows", target: "Overwhelm" },
  { source: "The Rhythm of the Cosmos", target: "Overwhelm" },
  // Capture Keeper
  { source: "Cause Célèbre", target: "Capture Keeper" },
  { source: "Banishment Magic", target: "Capture Keeper" },
  // Lunar Link
  { source: "Reality Resonance", target: "Lunar Link" },
  { source: "The Everflowing Tides", target: "Lunar Link" },
  // Necro’ech’rono
  { source: "Ebbs and Flows", target: "Necro’ech’rono" },
  { source: "Banishment Magic", target: "Necro’ech’rono" },
  // Eidolon Weaving
  { source: "Ebbs and Flows", target: "Eidolon Weaving" },
  { source: "Reality Resonance", target: "Eidolon Weaving" },
  // Echo Arcana
  { source: "Ebbs and Flows", target: "Echo Arcana" },
  { source: "Tempest Arcana", target: "Echo Arcana" }
];

// Set of source node IDs
const sourceNodeIds = new Set(Object.keys(sourceColors));

// Map node IDs to node objects
const nodeById = new Map();
nodes.forEach(node => {
  nodeById.set(node.id, node);
});

// Cache for source nodes per node to avoid recomputation
const sourceNodesCache = new Map();

// Function to get source nodes connected to a node
function getSourceNodes(node) {
  if (sourceNodesCache.has(node.id)) {
    return sourceNodesCache.get(node.id);
  }
  if (sourceNodeIds.has(node.id)) {
    const sources = new Set([node.id]);
    sourceNodesCache.set(node.id, sources);
    return sources;
  }
  const incomingLinks = links.filter(l => l.target === node.id);
  let sources = new Set();
  for (let link of incomingLinks) {
    const parentNode = nodeById.get(link.source);
    const parentSources = getSourceNodes(parentNode);
    parentSources.forEach(s => sources.add(s));
  }
  sourceNodesCache.set(node.id, sources);
  return sources;
}

// Assign colors and number of source nodes to composite nodes
nodes.forEach(node => {
  if (!node.color) {
    // Find incoming links to this node
    const incomingLinks = links.filter(l => l.target === node.id);

    // Get colors of parent nodes
    const parentColors = incomingLinks.map(link => {
      const sourceNode = nodeById.get(link.source);
      return sourceNode.color;
    }).filter(color => color);

    // Blend parent colors
    if (parentColors.length === 2) {
      node.color = blendColors(parentColors[0], parentColors[1]);
    } else if (parentColors.length === 1) {
      node.color = parentColors[0];
    } else {
      node.color = '#ffffff'; // Default to white if no parent colors
    }

    // Calculate the number of source nodes connected to this node
    const sources = getSourceNodes(node);
    node.numSources = sources.size;
  } else {
    // For source nodes
    node.numSources = 1;
  }
});

// Function to blend two colors
function blendColors(color1, color2) {
  // Convert hex colors to RGB
  function hexToRgb(hex) {
    let bigint = parseInt(hex.replace('#', ''), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  // Convert RGB to hex
  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  // Average the RGB values
  const blendedRgb = [
    Math.round((rgb1[0] + rgb2[0]) / 2),
    Math.round((rgb1[1] + rgb2[1]) / 2),
    Math.round((rgb1[2] + rgb2[2]) / 2)
  ];

  return rgbToHex(...blendedRgb);
}

// Set up the SVG canvas dimensions
const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Define arrow markers for directed edges
svg.append('defs').append('marker')
    .attr('id','arrowhead')
    .attr('viewBox','-0 -5 10 10')
    .attr('refX',15)
    .attr('refY',0)
    .attr('orient','auto')
    .attr('markerWidth',6)
    .attr('markerHeight',6)
    .attr('xoverflow','visible')
  .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#fff')
    .style('stroke','none');

// Initialize the simulation with nodes and links
const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(150))
    .force('charge', d3.forceManyBody().strength(-500))
    .force('center', d3.forceCenter(width / 2, height / 2));

// Draw the links (edges)
const link = svg.append('g')
    .attr('class', 'links')
  .selectAll('line')
  .data(links)
  .enter().append('line')
    .attr('stroke-width', 2)
    .attr('marker-end','url(#arrowhead)');  // Add arrowhead

// Draw the nodes
const node = svg.append('g')
    .attr('class', 'nodes')
  .selectAll('g')
  .data(nodes)
  .enter().append('g')
  .on('click', (event, d) => {
    window.open(d.url, '_blank');
  });

// Draw the outer circle
node.append('circle')
    .attr('class', 'outer-circle')
    .attr('r', 20)
    .attr('fill', d => d.color || '#fff');

// For composite nodes, draw inner circle and number
const compositeNodes = node.filter(d => !sourceNodeIds.has(d.id));

compositeNodes.append('circle')
    .attr('class', 'inner-circle')
    .attr('r', 10)
    .attr('fill', '#000');

compositeNodes.append('text')
    .attr('class', 'inner-text')
    .text(d => d.numSources)
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .style('font-size', '10px')
    .style('fill', '#fff');

// Add labels (node names) above the nodes
node.append('text')
    .attr('class', 'node-label')
    .text(d => d.id)
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('y', -25)
    .style('font-size', '12px');

// Update the simulation on each tick
simulation.on('tick', () => {
  link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', d => {
        const sourceNode = nodeById.get(d.source.id || d.source);
        return sourceNode.color || '#fff';
      });

  node
      .attr('transform', d => `translate(${d.x},${d.y})`);
});

// Enable dragging of nodes
node.call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended));

// Drag functions
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event,d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event,d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

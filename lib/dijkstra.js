var graphs = {};

var getEdges = function(graph){
  var edges = [];
  for( index in graph)
    edges = edges.concat(graph[index]);
  return edges;
};

var getSource = function(distance, vertex){
  var minWeight;
  for(var index in distance)
    if((!minWeight || distance[index] < distance[minWeight])&&vertex.indexOf(index)==-1)
      minWeight = index;
  return minWeight;
};

var updateDistance = function(source, distance, graph, parent){
  var edges = graph[source];
  for(var index in edges){
    if(!distance[edges[index].to] || distance[edges[index].to] > distance[source]+edges[index].weight){
      distance[edges[index].to] = distance[source]+edges[index].weight;
      parent[edges[index].to] = edges[index];

    }
  }
  return distance;
};

graphs.WeightedGraph = function(){
  this.graph = {};
};

graphs.WeightedGraph.prototype = {
  addVertex : function(vertex){
		this.graph[vertex] = [];
	},
	addEdge : function(edge){
		this.graph[edge.from].push(edge);
	},
  shortestPath : function(from,to){
    var vertex = [],path = [],distance = {},parent={};
    parent[from] = {from:from};
    var existingEdges = getEdges(this.graph);
    distance[from] = 0;
    while(vertex[vertex.length-1]!=to && existingEdges.length!=0){
      var source = getSource(distance, vertex);
      distance = updateDistance(source, distance,this.graph,parent);
      vertex.push(source);
      existingEdges = existingEdges.filter(function(edge){
        return edge.from != source;
      });
    };
    if(!parent[to]) return path;
    while(currentParent != from){
      var currentParent = parent[to].from;
      path.unshift(parent[to]);
      to = parent[currentParent].to;
    }
    return path;
  }
}

graphs.Edge  = function(edge,from,to,weight){
  this.edge = edge;
  this.from = from;
  this.to = to;
  this.weight = weight;
};

module.exports = graphs;

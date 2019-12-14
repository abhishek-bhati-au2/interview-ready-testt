import axios from "axios";

let names = [], cheapestRoutes = {}, fastestRoutes = {};

export function getData() {
  return axios.get('./data/response.json').then(res => {
    names = Array.from(new Set(res.data.deals.map(d => d.departure)));
    names.sort();
    names.forEach(n => {
      let arrivals = res.data.deals
        .filter(item => item.departure === n)
        .map(extractPricesAndDistances)
        .reduce(reduceByPrice, {});
      
      cheapestRoutes[n] = arrivals;
    });
    names.forEach(n => {
      let arrivals = res.data.deals
        .filter(item => item.departure === n)
        .map(extractPricesAndDistances)
        .reduce(reduceByDistance, {});
      
      fastestRoutes[n] = arrivals;
    });
    return names;
  });
}

function durationToMinutes(duration) {
  return parseInt(duration.h, 10) * 60 + parseInt(duration.m, 10);
}

function extractPricesAndDistances(item) {
  return {
    arrival: item.arrival,
    duration: durationToMinutes(item.duration),
    price: item.cost - item.discount,
    transport: item.transport,
    reference: item.reference,
    discount: item.discount,
    originalData: item
  }
}

function reduceByPrice(group, item) {
  let arrival = item.arrival;
  if (!group[arrival]) {
    group[arrival] = item;
  }
  if (group[arrival].price > item.price) {
    group[arrival] = item;
  }
  return group;
}

function reduceByDistance(group, item) {
  let arrival = item.arrival;
  if (!group[arrival]) {
    group[arrival] = item;
  }
  if (group[arrival].duration > item.duration) {
    group[arrival] = item;
  }
  return group;
}


function findPath(graph, A, B) {
  if (graph[A] === undefined) {
    return [];
  }
  let visited = {};
  let result = [];
  let nextToVisit = [A];
  while (nextToVisit.length > 0) {
    let from = nextToVisit.shift();
    if (visited[from]) {
      continue;
    }
    result.push(from);
    visited[from] = true;
    if (graph[from][B] !== undefined) {
      return result;
    } else {
      Object.keys(graph[from]).forEach(k => {
        if (!visited[k]) {
          nextToVisit.push(k)
        }
      })
    }
  }
  return [];
}

export function findCheapestRoute(from, to) {
  let result = findPath(Object.assign({}, {...cheapestRoutes}), from, to);
  if (result.length === 0) {
    console.log('No Path found');
    return;
  }
  
  result.push(to);
  
  let r = [];
  for (let i = 0; i < result.length - 1; i++) {
    let from = result[i];
    let to = result[i + 1];
    if (cheapestRoutes[from][to] === undefined) {
      result.splice(i, 1);
    }
  }
  for (let i = 0; i < result.length - 1; i++) {
    let from = result[i];
    let to = result[i + 1];
    if (cheapestRoutes[from][to]) {
      r.push({from, to, deal: cheapestRoutes[from][to]});
    }
  }
  return r;
}

export function findfastestRoute(from, to) {
  let result = findPath(Object.assign({}, fastestRoutes), from, to);
  if (result.length === 0) {
    console.log('No Path found');
    return;
  }
  
  result.push(to);
  
  let r = [];
  for (let i = 0; i < result.length - 1; i++) {
    let from = result[i];
    let to = result[i + 1];
    if (fastestRoutes[from][to] === undefined) {
      result.splice(i, 1);
    }
  }
  
  for (let i = 0; i < result.length - 1; i++) {
    let from = result[i];
    let to = result[i + 1];
    if (fastestRoutes[from][to]) {
      r.push({from, to, deal: fastestRoutes[from][to]})
    }
  }
  return r;
}
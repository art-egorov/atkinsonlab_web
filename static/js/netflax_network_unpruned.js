// initialize global variables.
var edges;
var nodes;
var allNodes;
var allEdges;
var nodeColors;
var originalNodes;
var network;
var container;
var options, data;
var filter = {
    item: '',
    property: '',
    value: []
};


new TomSelect("#select-node", {
    create: false,
    sortField: {
        field: "text",
        direction: "asc"
    }
})
;


// This method is responsible for drawing the graph, returns the drawn network
function drawGraph() {
    var container = document.getElementById('mynetwork');


    // parsing and collecting nodes and edges from the python
    nodes = new vis.DataSet([{
        "color": "#da90a2",
        "id": "M11",
        "label": "M11",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M11\u0027 target=\u0027_blank\u0027\u003eM11\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eFic family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M7",
        "label": "M7",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M7\u0027 target=\u0027_blank\u0027\u003eM7\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eTrmB family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M3",
        "label": "M3",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M3\u0027 target=\u0027_blank\u0027\u003eM3\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M13",
        "label": "M13",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M13\u0027 target=\u0027_blank\u0027\u003eM13\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M18",
        "label": "M18",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M18\u0027 target=\u0027_blank\u0027\u003eM18\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M4",
        "label": "M4",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M4\u0027 target=\u0027_blank\u0027\u003eM4\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M5",
        "label": "M5",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M5\u0027 target=\u0027_blank\u0027\u003eM5\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M21",
        "label": "M21",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M21\u0027 target=\u0027_blank\u0027\u003eM21\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDnaJ domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M15",
        "label": "M15",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M15\u0027 target=\u0027_blank\u0027\u003eM15\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M14",
        "label": "M14",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M14\u0027 target=\u0027_blank\u0027\u003eM14\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eRelA/SpoT domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M20",
        "label": "M20",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M20\u0027 target=\u0027_blank\u0027\u003eM20\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M1",
        "label": "M1",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M1\u0027 target=\u0027_blank\u0027\u003eM1\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M16",
        "label": "M16",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M16\u0027 target=\u0027_blank\u0027\u003eM16\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein BPSphi5223_0001\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M8",
        "label": "M8",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M8\u0027 target=\u0027_blank\u0027\u003eM8\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M6",
        "label": "M6",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M6\u0027 target=\u0027_blank\u0027\u003eM6\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eGNAT family N-acetyltransferase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M12",
        "label": "M12",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M12\u0027 target=\u0027_blank\u0027\u003eM12\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M2",
        "label": "M2",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M2\u0027 target=\u0027_blank\u0027\u003eM2\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M22",
        "label": "M22",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M22\u0027 target=\u0027_blank\u0027\u003eM22\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M19",
        "label": "M19",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M19\u0027 target=\u0027_blank\u0027\u003eM19\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M9",
        "label": "M9",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M9\u0027 target=\u0027_blank\u0027\u003eM9\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M10",
        "label": "M10",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M10\u0027 target=\u0027_blank\u0027\u003eM10\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eHD domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#da90a2",
        "id": "M17",
        "label": "M17",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M17\u0027 target=\u0027_blank\u0027\u003eM17\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#98b09a",
        "id": "M32",
        "label": "M32",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M32\u0027 target=\u0027_blank\u0027\u003eM32\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eSDR family oxidoreductase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M42",
        "label": "M42",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M42\u0027 target=\u0027_blank\u0027\u003eM42\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system MqsA family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D2\u0027 target=\u0027_blank\u0027\u003eD2\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system MqsR family toxin"
    }, {
        "color": "#98b09a",
        "id": "M26",
        "label": "M26",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M26\u0027 target=\u0027_blank\u0027\u003eM26\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D8\u0027 target=\u0027_blank\u0027\u003eD8\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#98b09a",
        "id": "M30",
        "label": "M30",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M30\u0027 target=\u0027_blank\u0027\u003eM30\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M33",
        "label": "M33",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M33\u0027 target=\u0027_blank\u0027\u003eM33\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D9\u0027 target=\u0027_blank\u0027\u003eD9\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#98b09a",
        "id": "M38",
        "label": "M38",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M38\u0027 target=\u0027_blank\u0027\u003eM38\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M24",
        "label": "M24",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M24\u0027 target=\u0027_blank\u0027\u003eM24\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M43",
        "label": "M43",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M43\u0027 target=\u0027_blank\u0027\u003eM43\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein PHICD211_20142\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M27",
        "label": "M27",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M27\u0027 target=\u0027_blank\u0027\u003eM27\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D8\u0027 target=\u0027_blank\u0027\u003eD8\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#98b09a",
        "id": "M25",
        "label": "M25",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M25\u0027 target=\u0027_blank\u0027\u003eM25\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003e16S rRNA (adenine(1518)-N(6)/adenine(1519)-N(6))-dimethyltransferase RsmA\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D8\u0027 target=\u0027_blank\u0027\u003eD8\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#98b09a",
        "id": "M23",
        "label": "M23",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M23\u0027 target=\u0027_blank\u0027\u003eM23\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D9\u0027 target=\u0027_blank\u0027\u003eD9\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#98b09a",
        "id": "M44",
        "label": "M44",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M44\u0027 target=\u0027_blank\u0027\u003eM44\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#da90a2",
        "id": "M37",
        "label": "M37",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M37\u0027 target=\u0027_blank\u0027\u003eM37\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D3\u0027 target=\u0027_blank\u0027\u003eD3\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#98b09a",
        "id": "M36",
        "label": "M36",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M36\u0027 target=\u0027_blank\u0027\u003eM36\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M45",
        "label": "M45",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M45\u0027 target=\u0027_blank\u0027\u003eM45\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003erecombinase family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M46",
        "label": "M46",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M46\u0027 target=\u0027_blank\u0027\u003eM46\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eprevent-host-death family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M31",
        "label": "M31",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M31\u0027 target=\u0027_blank\u0027\u003eM31\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M41",
        "label": "M41",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M41\u0027 target=\u0027_blank\u0027\u003eM41\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M40",
        "label": "M40",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M40\u0027 target=\u0027_blank\u0027\u003eM40\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D2\u0027 target=\u0027_blank\u0027\u003eD2\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system MqsR family toxin"
    }, {
        "color": "#98b09a",
        "id": "M28",
        "label": "M28",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M28\u0027 target=\u0027_blank\u0027\u003eM28\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ecold shock domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D8\u0027 target=\u0027_blank\u0027\u003eD8\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#98b09a",
        "id": "M29",
        "label": "M29",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M29\u0027 target=\u0027_blank\u0027\u003eM29\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003epyrroline-5-carboxylate reductase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M39",
        "label": "M39",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M39\u0027 target=\u0027_blank\u0027\u003eM39\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#98b09a",
        "id": "M35",
        "label": "M35",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M35\u0027 target=\u0027_blank\u0027\u003eM35\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ealanine racemase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M34",
        "label": "M34",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M34\u0027 target=\u0027_blank\u0027\u003eM34\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eATP-binding protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#da90a2",
        "id": "M55",
        "label": "M55",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M55\u0027 target=\u0027_blank\u0027\u003eM55\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF4435 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M71",
        "label": "M71",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M71\u0027 target=\u0027_blank\u0027\u003eM71\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein SEA_YEEZY_45\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D34\u0027 target=\u0027_blank\u0027\u003eD34\u003c/a\u003e\u003c/span\u003e - DNA-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M68",
        "label": "M68",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M68\u0027 target=\u0027_blank\u0027\u003eM68\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF4258 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D13\u0027 target=\u0027_blank\u0027\u003eD13\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein"
    }, {
        "color": "#da90a2",
        "id": "M62",
        "label": "M62",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M62\u0027 target=\u0027_blank\u0027\u003eM62\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#da90a2",
        "id": "M51",
        "label": "M51",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M51\u0027 target=\u0027_blank\u0027\u003eM51\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#da90a2",
        "id": "M59",
        "label": "M59",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M59\u0027 target=\u0027_blank\u0027\u003eM59\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF4248 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#da90a2",
        "id": "M48",
        "label": "M48",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M48\u0027 target=\u0027_blank\u0027\u003eM48\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein SEA_HEDWIG_39\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#da90a2",
        "id": "M52",
        "label": "M52",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M52\u0027 target=\u0027_blank\u0027\u003eM52\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehelix-turn-helix domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D34\u0027 target=\u0027_blank\u0027\u003eD34\u003c/a\u003e\u003c/span\u003e - DNA-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M69",
        "label": "M69",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M69\u0027 target=\u0027_blank\u0027\u003eM69\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M53",
        "label": "M53",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M53\u0027 target=\u0027_blank\u0027\u003eM53\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D34\u0027 target=\u0027_blank\u0027\u003eD34\u003c/a\u003e\u003c/span\u003e - DNA-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M58",
        "label": "M58",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M58\u0027 target=\u0027_blank\u0027\u003eM58\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D13\u0027 target=\u0027_blank\u0027\u003eD13\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein"
    }, {
        "color": "#da90a2",
        "id": "M70",
        "label": "M70",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M70\u0027 target=\u0027_blank\u0027\u003eM70\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M66",
        "label": "M66",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M66\u0027 target=\u0027_blank\u0027\u003eM66\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#da90a2",
        "id": "M50",
        "label": "M50",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M50\u0027 target=\u0027_blank\u0027\u003eM50\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehelix-turn-helix transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#da90a2",
        "id": "M64",
        "label": "M64",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M64\u0027 target=\u0027_blank\u0027\u003eM64\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M47",
        "label": "M47",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M47\u0027 target=\u0027_blank\u0027\u003eM47\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ePIN domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#da90a2",
        "id": "M61",
        "label": "M61",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M61\u0027 target=\u0027_blank\u0027\u003eM61\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M49",
        "label": "M49",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M49\u0027 target=\u0027_blank\u0027\u003eM49\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eMFS transporter\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#da90a2",
        "id": "M65",
        "label": "M65",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M65\u0027 target=\u0027_blank\u0027\u003eM65\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003erestriction endonuclease\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#da90a2",
        "id": "M56",
        "label": "M56",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M56\u0027 target=\u0027_blank\u0027\u003eM56\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#da90a2",
        "id": "M73",
        "label": "M73",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M73\u0027 target=\u0027_blank\u0027\u003eM73\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M57",
        "label": "M57",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M57\u0027 target=\u0027_blank\u0027\u003eM57\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ePIN domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin"
    }, {
        "color": "#da90a2",
        "id": "M60",
        "label": "M60",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M60\u0027 target=\u0027_blank\u0027\u003eM60\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003e2-keto-3-deoxygluconate permease\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D32\u0027 target=\u0027_blank\u0027\u003eD32\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin"
    }, {
        "color": "#da90a2",
        "id": "M72",
        "label": "M72",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M72\u0027 target=\u0027_blank\u0027\u003eM72\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M54",
        "label": "M54",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M54\u0027 target=\u0027_blank\u0027\u003eM54\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system RelE/ParE family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#da90a2",
        "id": "M63",
        "label": "M63",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M63\u0027 target=\u0027_blank\u0027\u003eM63\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eATP-binding protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin"
    }, {
        "color": "#da90a2",
        "id": "M67",
        "label": "M67",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M67\u0027 target=\u0027_blank\u0027\u003eM67\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#98b09a",
        "id": "M159",
        "label": "M159",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M159\u0027 target=\u0027_blank\u0027\u003eM159\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M150",
        "label": "M150",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M150\u0027 target=\u0027_blank\u0027\u003eM150\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M157",
        "label": "M157",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M157\u0027 target=\u0027_blank\u0027\u003eM157\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M156",
        "label": "M156",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M156\u0027 target=\u0027_blank\u0027\u003eM156\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eribbon-helix-helix protein, CopG family\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M146",
        "label": "M146",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M146\u0027 target=\u0027_blank\u0027\u003eM146\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003e3\u0027-5\u0027 exonuclease\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M102",
        "label": "M102",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M102\u0027 target=\u0027_blank\u0027\u003eM102\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M103",
        "label": "M103",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M103\u0027 target=\u0027_blank\u0027\u003eM103\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eAbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M117",
        "label": "M117",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M117\u0027 target=\u0027_blank\u0027\u003eM117\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M80",
        "label": "M80",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M80\u0027 target=\u0027_blank\u0027\u003eM80\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M83",
        "label": "M83",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M83\u0027 target=\u0027_blank\u0027\u003eM83\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003erestriction endonuclease subunit S\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M97",
        "label": "M97",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M97\u0027 target=\u0027_blank\u0027\u003eM97\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M78",
        "label": "M78",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M78\u0027 target=\u0027_blank\u0027\u003eM78\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D51\u0027 target=\u0027_blank\u0027\u003eD51\u003c/a\u003e\u003c/span\u003e - TIGR02646 family protein"
    }, {
        "color": "#98b09a",
        "id": "M158",
        "label": "M158",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M158\u0027 target=\u0027_blank\u0027\u003eM158\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D65\u0027 target=\u0027_blank\u0027\u003eD65\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M131",
        "label": "M131",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M131\u0027 target=\u0027_blank\u0027\u003eM131\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003erestriction endonuclease\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M94",
        "label": "M94",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M94\u0027 target=\u0027_blank\u0027\u003eM94\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003e2-C-methyl-D-erythritol 4-phosphate cytidylyltransferase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M137",
        "label": "M137",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M137\u0027 target=\u0027_blank\u0027\u003eM137\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M145",
        "label": "M145",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M145\u0027 target=\u0027_blank\u0027\u003eM145\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M104",
        "label": "M104",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M104\u0027 target=\u0027_blank\u0027\u003eM104\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M130",
        "label": "M130",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M130\u0027 target=\u0027_blank\u0027\u003eM130\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M124",
        "label": "M124",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M124\u0027 target=\u0027_blank\u0027\u003eM124\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ephage terminase small subunit P27 family\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D51\u0027 target=\u0027_blank\u0027\u003eD51\u003c/a\u003e\u003c/span\u003e - TIGR02646 family protein"
    }, {
        "color": "#98b09a",
        "id": "M111",
        "label": "M111",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M111\u0027 target=\u0027_blank\u0027\u003eM111\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M77",
        "label": "M77",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M77\u0027 target=\u0027_blank\u0027\u003eM77\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eredox-regulated ATPase YchF\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M133",
        "label": "M133",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M133\u0027 target=\u0027_blank\u0027\u003eM133\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D51\u0027 target=\u0027_blank\u0027\u003eD51\u003c/a\u003e\u003c/span\u003e - TIGR02646 family protein"
    }, {
        "color": "#98b09a",
        "id": "M92",
        "label": "M92",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M92\u0027 target=\u0027_blank\u0027\u003eM92\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eRNA methyltransferase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M108",
        "label": "M108",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M108\u0027 target=\u0027_blank\u0027\u003eM108\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M88",
        "label": "M88",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M88\u0027 target=\u0027_blank\u0027\u003eM88\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF3923 family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M89",
        "label": "M89",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M89\u0027 target=\u0027_blank\u0027\u003eM89\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF4352 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M109",
        "label": "M109",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M109\u0027 target=\u0027_blank\u0027\u003eM109\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M114",
        "label": "M114",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M114\u0027 target=\u0027_blank\u0027\u003eM114\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D65\u0027 target=\u0027_blank\u0027\u003eD65\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M93",
        "label": "M93",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M93\u0027 target=\u0027_blank\u0027\u003eM93\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M135",
        "label": "M135",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M135\u0027 target=\u0027_blank\u0027\u003eM135\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M127",
        "label": "M127",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M127\u0027 target=\u0027_blank\u0027\u003eM127\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eantitoxin family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M118",
        "label": "M118",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M118\u0027 target=\u0027_blank\u0027\u003eM118\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D67\u0027 target=\u0027_blank\u0027\u003eD67\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M100",
        "label": "M100",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M100\u0027 target=\u0027_blank\u0027\u003eM100\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M107",
        "label": "M107",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M107\u0027 target=\u0027_blank\u0027\u003eM107\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M106",
        "label": "M106",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M106\u0027 target=\u0027_blank\u0027\u003eM106\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M112",
        "label": "M112",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M112\u0027 target=\u0027_blank\u0027\u003eM112\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eAAA family ATPase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M123",
        "label": "M123",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M123\u0027 target=\u0027_blank\u0027\u003eM123\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M141",
        "label": "M141",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M141\u0027 target=\u0027_blank\u0027\u003eM141\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M144",
        "label": "M144",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M144\u0027 target=\u0027_blank\u0027\u003eM144\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D51\u0027 target=\u0027_blank\u0027\u003eD51\u003c/a\u003e\u003c/span\u003e - TIGR02646 family protein"
    }, {
        "color": "#98b09a",
        "id": "M138",
        "label": "M138",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M138\u0027 target=\u0027_blank\u0027\u003eM138\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF4428 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M84",
        "label": "M84",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M84\u0027 target=\u0027_blank\u0027\u003eM84\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D36\u0027 target=\u0027_blank\u0027\u003eD36\u003c/a\u003e\u003c/span\u003e - Txe/YoeB family addiction module toxin"
    }, {
        "color": "#98b09a",
        "id": "M134",
        "label": "M134",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M134\u0027 target=\u0027_blank\u0027\u003eM134\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M116",
        "label": "M116",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M116\u0027 target=\u0027_blank\u0027\u003eM116\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M120",
        "label": "M120",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M120\u0027 target=\u0027_blank\u0027\u003eM120\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eputative replication initiation protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D51\u0027 target=\u0027_blank\u0027\u003eD51\u003c/a\u003e\u003c/span\u003e - TIGR02646 family protein"
    }, {
        "color": "#98b09a",
        "id": "M147",
        "label": "M147",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M147\u0027 target=\u0027_blank\u0027\u003eM147\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D36\u0027 target=\u0027_blank\u0027\u003eD36\u003c/a\u003e\u003c/span\u003e - Txe/YoeB family addiction module toxin"
    }, {
        "color": "#98b09a",
        "id": "M81",
        "label": "M81",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M81\u0027 target=\u0027_blank\u0027\u003eM81\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M75",
        "label": "M75",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M75\u0027 target=\u0027_blank\u0027\u003eM75\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M101",
        "label": "M101",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M101\u0027 target=\u0027_blank\u0027\u003eM101\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eCopG family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M76",
        "label": "M76",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M76\u0027 target=\u0027_blank\u0027\u003eM76\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M121",
        "label": "M121",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M121\u0027 target=\u0027_blank\u0027\u003eM121\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M125",
        "label": "M125",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M125\u0027 target=\u0027_blank\u0027\u003eM125\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M90",
        "label": "M90",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M90\u0027 target=\u0027_blank\u0027\u003eM90\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eNAD-dependent epimerase/dehydratase family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M105",
        "label": "M105",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M105\u0027 target=\u0027_blank\u0027\u003eM105\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D36\u0027 target=\u0027_blank\u0027\u003eD36\u003c/a\u003e\u003c/span\u003e - Txe/YoeB family addiction module toxin"
    }, {
        "color": "#98b09a",
        "id": "M152",
        "label": "M152",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M152\u0027 target=\u0027_blank\u0027\u003eM152\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehelix-turn-helix transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D65\u0027 target=\u0027_blank\u0027\u003eD65\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M151",
        "label": "M151",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M151\u0027 target=\u0027_blank\u0027\u003eM151\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M115",
        "label": "M115",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M115\u0027 target=\u0027_blank\u0027\u003eM115\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003echromate transporter\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M95",
        "label": "M95",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M95\u0027 target=\u0027_blank\u0027\u003eM95\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M155",
        "label": "M155",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M155\u0027 target=\u0027_blank\u0027\u003eM155\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eNgoFVII family restriction endonuclease\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M99",
        "label": "M99",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M99\u0027 target=\u0027_blank\u0027\u003eM99\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M153",
        "label": "M153",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M153\u0027 target=\u0027_blank\u0027\u003eM153\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M132",
        "label": "M132",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M132\u0027 target=\u0027_blank\u0027\u003eM132\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M148",
        "label": "M148",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M148\u0027 target=\u0027_blank\u0027\u003eM148\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M113",
        "label": "M113",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M113\u0027 target=\u0027_blank\u0027\u003eM113\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eAraC family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M142",
        "label": "M142",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M142\u0027 target=\u0027_blank\u0027\u003eM142\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etoxin-antitoxin (TA) system antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M140",
        "label": "M140",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M140\u0027 target=\u0027_blank\u0027\u003eM140\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#98b09a",
        "id": "M79",
        "label": "M79",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M79\u0027 target=\u0027_blank\u0027\u003eM79\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF4041 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M98",
        "label": "M98",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M98\u0027 target=\u0027_blank\u0027\u003eM98\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype I toxin-antitoxin system SymE family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M74",
        "label": "M74",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M74\u0027 target=\u0027_blank\u0027\u003eM74\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M136",
        "label": "M136",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M136\u0027 target=\u0027_blank\u0027\u003eM136\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eCopG family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M96",
        "label": "M96",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M96\u0027 target=\u0027_blank\u0027\u003eM96\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D51\u0027 target=\u0027_blank\u0027\u003eD51\u003c/a\u003e\u003c/span\u003e - TIGR02646 family protein"
    }, {
        "color": "#98b09a",
        "id": "M85",
        "label": "M85",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M85\u0027 target=\u0027_blank\u0027\u003eM85\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eGNAT family N-acetyltransferase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M126",
        "label": "M126",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M126\u0027 target=\u0027_blank\u0027\u003eM126\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eUPF0175 family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M119",
        "label": "M119",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M119\u0027 target=\u0027_blank\u0027\u003eM119\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eCopG family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M143",
        "label": "M143",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M143\u0027 target=\u0027_blank\u0027\u003eM143\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003erecombinase family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M154",
        "label": "M154",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M154\u0027 target=\u0027_blank\u0027\u003eM154\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M128",
        "label": "M128",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M128\u0027 target=\u0027_blank\u0027\u003eM128\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D67\u0027 target=\u0027_blank\u0027\u003eD67\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M129",
        "label": "M129",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M129\u0027 target=\u0027_blank\u0027\u003eM129\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D67\u0027 target=\u0027_blank\u0027\u003eD67\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M122",
        "label": "M122",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M122\u0027 target=\u0027_blank\u0027\u003eM122\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M91",
        "label": "M91",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M91\u0027 target=\u0027_blank\u0027\u003eM91\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M149",
        "label": "M149",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M149\u0027 target=\u0027_blank\u0027\u003eM149\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D65\u0027 target=\u0027_blank\u0027\u003eD65\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M110",
        "label": "M110",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M110\u0027 target=\u0027_blank\u0027\u003eM110\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#98b09a",
        "id": "M139",
        "label": "M139",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M139\u0027 target=\u0027_blank\u0027\u003eM139\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M82",
        "label": "M82",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M82\u0027 target=\u0027_blank\u0027\u003eM82\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eglutamate-1-semialdehyde 2,1-aminomutase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M87",
        "label": "M87",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M87\u0027 target=\u0027_blank\u0027\u003eM87\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator"
    }, {
        "color": "#98b09a",
        "id": "M86",
        "label": "M86",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M86\u0027 target=\u0027_blank\u0027\u003eM86\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eribbon-helix-helix protein, CopG family\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D67\u0027 target=\u0027_blank\u0027\u003eD67\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#da90a2",
        "id": "M170",
        "label": "M170",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M170\u0027 target=\u0027_blank\u0027\u003eM170\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eLtp family lipoprotein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase"
    }, {
        "color": "#da90a2",
        "id": "M177",
        "label": "M177",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M177\u0027 target=\u0027_blank\u0027\u003eM177\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase"
    }, {
        "color": "#da90a2",
        "id": "M167",
        "label": "M167",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M167\u0027 target=\u0027_blank\u0027\u003eM167\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D97\u0027 target=\u0027_blank\u0027\u003eD97\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#da90a2",
        "id": "M164",
        "label": "M164",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M164\u0027 target=\u0027_blank\u0027\u003eM164\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase"
    }, {
        "color": "#da90a2",
        "id": "M165",
        "label": "M165",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M165\u0027 target=\u0027_blank\u0027\u003eM165\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ereplication initiation protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin"
    }, {
        "color": "#da90a2",
        "id": "M172",
        "label": "M172",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M172\u0027 target=\u0027_blank\u0027\u003eM172\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase"
    }, {
        "color": "#da90a2",
        "id": "M173",
        "label": "M173",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M173\u0027 target=\u0027_blank\u0027\u003eM173\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eHEAT repeat domain-containing protein, partial\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D97\u0027 target=\u0027_blank\u0027\u003eD97\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#da90a2",
        "id": "M166",
        "label": "M166",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M166\u0027 target=\u0027_blank\u0027\u003eM166\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D101\u0027 target=\u0027_blank\u0027\u003eD101\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#da90a2",
        "id": "M174",
        "label": "M174",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M174\u0027 target=\u0027_blank\u0027\u003eM174\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003enucleotide-binding protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin"
    }, {
        "color": "#da90a2",
        "id": "M163",
        "label": "M163",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M163\u0027 target=\u0027_blank\u0027\u003eM163\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system VapC family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D109\u0027 target=\u0027_blank\u0027\u003eD109\u003c/a\u003e\u003c/span\u003e - DUF2281 domain-containing protein"
    }, {
        "color": "#da90a2",
        "id": "M160",
        "label": "M160",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M160\u0027 target=\u0027_blank\u0027\u003eM160\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D106\u0027 target=\u0027_blank\u0027\u003eD106\u003c/a\u003e\u003c/span\u003e - antitoxin"
    }, {
        "color": "#da90a2",
        "id": "M175",
        "label": "M175",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M175\u0027 target=\u0027_blank\u0027\u003eM175\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase"
    }, {
        "color": "#da90a2",
        "id": "M176",
        "label": "M176",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M176\u0027 target=\u0027_blank\u0027\u003eM176\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ePIN domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin"
    }, {
        "color": "#da90a2",
        "id": "M169",
        "label": "M169",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M169\u0027 target=\u0027_blank\u0027\u003eM169\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eHD domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase"
    }, {
        "color": "#da90a2",
        "id": "M171",
        "label": "M171",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M171\u0027 target=\u0027_blank\u0027\u003eM171\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase"
    }, {
        "color": "#da90a2",
        "id": "M168",
        "label": "M168",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M168\u0027 target=\u0027_blank\u0027\u003eM168\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D109\u0027 target=\u0027_blank\u0027\u003eD109\u003c/a\u003e\u003c/span\u003e - DUF2281 domain-containing protein"
    }, {
        "color": "#da90a2",
        "id": "M162",
        "label": "M162",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M162\u0027 target=\u0027_blank\u0027\u003eM162\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase"
    }, {
        "color": "#da90a2",
        "id": "M161",
        "label": "M161",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M161\u0027 target=\u0027_blank\u0027\u003eM161\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system RelE/ParE family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin"
    }, {
        "color": "#98b09a",
        "id": "M190",
        "label": "M190",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M190\u0027 target=\u0027_blank\u0027\u003eM190\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M195",
        "label": "M195",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M195\u0027 target=\u0027_blank\u0027\u003eM195\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M207",
        "label": "M207",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M207\u0027 target=\u0027_blank\u0027\u003eM207\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eRep protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D132\u0027 target=\u0027_blank\u0027\u003eD132\u003c/a\u003e\u003c/span\u003e - DUF3173 family protein"
    }, {
        "color": "#98b09a",
        "id": "M193",
        "label": "M193",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M193\u0027 target=\u0027_blank\u0027\u003eM193\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M180",
        "label": "M180",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M180\u0027 target=\u0027_blank\u0027\u003eM180\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eParB N-terminal domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M182",
        "label": "M182",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M182\u0027 target=\u0027_blank\u0027\u003eM182\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M179",
        "label": "M179",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M179\u0027 target=\u0027_blank\u0027\u003eM179\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system Phd/YefM family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin"
    }, {
        "color": "#98b09a",
        "id": "M214",
        "label": "M214",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M214\u0027 target=\u0027_blank\u0027\u003eM214\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eMarR family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M197",
        "label": "M197",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M197\u0027 target=\u0027_blank\u0027\u003eM197\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M186",
        "label": "M186",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M186\u0027 target=\u0027_blank\u0027\u003eM186\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin"
    }, {
        "color": "#98b09a",
        "id": "M200",
        "label": "M200",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M200\u0027 target=\u0027_blank\u0027\u003eM200\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eRha family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M218",
        "label": "M218",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M218\u0027 target=\u0027_blank\u0027\u003eM218\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin"
    }, {
        "color": "#98b09a",
        "id": "M184",
        "label": "M184",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M184\u0027 target=\u0027_blank\u0027\u003eM184\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M212",
        "label": "M212",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M212\u0027 target=\u0027_blank\u0027\u003eM212\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ecob(I)yrinic acid a,c-diamide adenosyltransferase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M196",
        "label": "M196",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M196\u0027 target=\u0027_blank\u0027\u003eM196\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M208",
        "label": "M208",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M208\u0027 target=\u0027_blank\u0027\u003eM208\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF104 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M202",
        "label": "M202",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M202\u0027 target=\u0027_blank\u0027\u003eM202\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin"
    }, {
        "color": "#98b09a",
        "id": "M216",
        "label": "M216",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M216\u0027 target=\u0027_blank\u0027\u003eM216\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M191",
        "label": "M191",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M191\u0027 target=\u0027_blank\u0027\u003eM191\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M178",
        "label": "M178",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M178\u0027 target=\u0027_blank\u0027\u003eM178\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system Phd/YefM family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin"
    }, {
        "color": "#98b09a",
        "id": "M217",
        "label": "M217",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M217\u0027 target=\u0027_blank\u0027\u003eM217\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M199",
        "label": "M199",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M199\u0027 target=\u0027_blank\u0027\u003eM199\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M213",
        "label": "M213",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M213\u0027 target=\u0027_blank\u0027\u003eM213\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eAAA family ATPase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M198",
        "label": "M198",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M198\u0027 target=\u0027_blank\u0027\u003eM198\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#da90a2",
        "id": "M183",
        "label": "M183",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M183\u0027 target=\u0027_blank\u0027\u003eM183\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ereplication initiation factor domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M181",
        "label": "M181",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M181\u0027 target=\u0027_blank\u0027\u003eM181\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ephage repressor protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M187",
        "label": "M187",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M187\u0027 target=\u0027_blank\u0027\u003eM187\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eantitoxin MazE family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M189",
        "label": "M189",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M189\u0027 target=\u0027_blank\u0027\u003eM189\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M209",
        "label": "M209",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M209\u0027 target=\u0027_blank\u0027\u003eM209\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003emethyltransferase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M219",
        "label": "M219",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M219\u0027 target=\u0027_blank\u0027\u003eM219\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eCopG family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M194",
        "label": "M194",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M194\u0027 target=\u0027_blank\u0027\u003eM194\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etranscriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M215",
        "label": "M215",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M215\u0027 target=\u0027_blank\u0027\u003eM215\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M201",
        "label": "M201",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M201\u0027 target=\u0027_blank\u0027\u003eM201\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M206",
        "label": "M206",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M206\u0027 target=\u0027_blank\u0027\u003eM206\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M211",
        "label": "M211",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M211\u0027 target=\u0027_blank\u0027\u003eM211\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M203",
        "label": "M203",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M203\u0027 target=\u0027_blank\u0027\u003eM203\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin"
    }, {
        "color": "#98b09a",
        "id": "M192",
        "label": "M192",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M192\u0027 target=\u0027_blank\u0027\u003eM192\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin"
    }, {
        "color": "#98b09a",
        "id": "M188",
        "label": "M188",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M188\u0027 target=\u0027_blank\u0027\u003eM188\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003esubstrate-binding domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein"
    }, {
        "color": "#98b09a",
        "id": "M204",
        "label": "M204",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M204\u0027 target=\u0027_blank\u0027\u003eM204\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M205",
        "label": "M205",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M205\u0027 target=\u0027_blank\u0027\u003eM205\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M210",
        "label": "M210",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M210\u0027 target=\u0027_blank\u0027\u003eM210\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#98b09a",
        "id": "M185",
        "label": "M185",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M185\u0027 target=\u0027_blank\u0027\u003eM185\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#da90a2",
        "id": "M222",
        "label": "M222",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M222\u0027 target=\u0027_blank\u0027\u003eM222\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eABC transporter ATP-binding protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D148\u0027 target=\u0027_blank\u0027\u003eD148\u003c/a\u003e\u003c/span\u003e - Arc family DNA-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M224",
        "label": "M224",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M224\u0027 target=\u0027_blank\u0027\u003eM224\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDNA polymerase III subunit beta\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D153\u0027 target=\u0027_blank\u0027\u003eD153\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#da90a2",
        "id": "M223",
        "label": "M223",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M223\u0027 target=\u0027_blank\u0027\u003eM223\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system HicB family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D150\u0027 target=\u0027_blank\u0027\u003eD150\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapB family antitoxin"
    }, {
        "color": "#da90a2",
        "id": "M225",
        "label": "M225",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M225\u0027 target=\u0027_blank\u0027\u003eM225\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system VapC family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D148\u0027 target=\u0027_blank\u0027\u003eD148\u003c/a\u003e\u003c/span\u003e - Arc family DNA-binding protein"
    }, {
        "color": "#da90a2",
        "id": "M221",
        "label": "M221",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M221\u0027 target=\u0027_blank\u0027\u003eM221\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003emultidrug effflux MFS transporter\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D144\u0027 target=\u0027_blank\u0027\u003eD144\u003c/a\u003e\u003c/span\u003e - antitoxin VapB family protein"
    }, {
        "color": "#da90a2",
        "id": "M220",
        "label": "M220",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M220\u0027 target=\u0027_blank\u0027\u003eM220\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF2493 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D148\u0027 target=\u0027_blank\u0027\u003eD148\u003c/a\u003e\u003c/span\u003e - Arc family DNA-binding protein"
    }, {
        "color": "#98b09a",
        "id": "M232",
        "label": "M232",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M232\u0027 target=\u0027_blank\u0027\u003eM232\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M228",
        "label": "M228",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M228\u0027 target=\u0027_blank\u0027\u003eM228\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M229",
        "label": "M229",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M229\u0027 target=\u0027_blank\u0027\u003eM229\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etyrosine-type recombinase/integrase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M226",
        "label": "M226",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M226\u0027 target=\u0027_blank\u0027\u003eM226\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M227",
        "label": "M227",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M227\u0027 target=\u0027_blank\u0027\u003eM227\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M230",
        "label": "M230",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M230\u0027 target=\u0027_blank\u0027\u003eM230\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eantitoxin family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#98b09a",
        "id": "M231",
        "label": "M231",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M231\u0027 target=\u0027_blank\u0027\u003eM231\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#C24765",
        "id": "D4",
        "label": "D4",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D4\u0027 target=\u0027_blank\u0027\u003eD4\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eCvpA family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#C24765",
        "id": "D1",
        "label": "D1",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D1\u0027 target=\u0027_blank\u0027\u003eD1\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#C24765",
        "id": "D10",
        "label": "D10",
        "shape": "dot",
        "size": 18,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system PemK/MazF family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M24\u0027 target=\u0027_blank\u0027\u003eM24\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M38\u0027 target=\u0027_blank\u0027\u003eM38\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D102\u0027 target=\u0027_blank\u0027\u003eD102\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D33\u0027 target=\u0027_blank\u0027\u003eD33\u003c/a\u003e\u003c/span\u003e - CopG family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D24\u0027 target=\u0027_blank\u0027\u003eD24\u003c/a\u003e\u003c/span\u003e - CopG family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D101\u0027 target=\u0027_blank\u0027\u003eD101\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M35\u0027 target=\u0027_blank\u0027\u003eM35\u003c/a\u003e\u003c/span\u003e - alanine racemase"
    }, {
        "color": "#C24765",
        "id": "D8",
        "label": "D8",
        "shape": "dot",
        "size": 16,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D8\u0027 target=\u0027_blank\u0027\u003eD8\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M28\u0027 target=\u0027_blank\u0027\u003eM28\u003c/a\u003e\u003c/span\u003e - cold shock domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M26\u0027 target=\u0027_blank\u0027\u003eM26\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D27\u0027 target=\u0027_blank\u0027\u003eD27\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M25\u0027 target=\u0027_blank\u0027\u003eM25\u003c/a\u003e\u003c/span\u003e - 16S rRNA (adenine(1518)-N(6)/adenine(1519)-N(6))-dimethyltransferase RsmA\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M27\u0027 target=\u0027_blank\u0027\u003eM27\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D12",
        "label": "D12",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D12\u0027 target=\u0027_blank\u0027\u003eD12\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system PemK/MazF family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#C24765",
        "id": "D9",
        "label": "D9",
        "shape": "dot",
        "size": 13,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D9\u0027 target=\u0027_blank\u0027\u003eD9\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M33\u0027 target=\u0027_blank\u0027\u003eM33\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M23\u0027 target=\u0027_blank\u0027\u003eM23\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D2",
        "label": "D2",
        "shape": "dot",
        "size": 13,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D2\u0027 target=\u0027_blank\u0027\u003eD2\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system MqsR family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M40\u0027 target=\u0027_blank\u0027\u003eM40\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M42\u0027 target=\u0027_blank\u0027\u003eM42\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system MqsA family antitoxin"
    }, {
        "color": "#C24765",
        "id": "D6",
        "label": "D6",
        "shape": "dot",
        "size": 28,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system death-on-curing family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M32\u0027 target=\u0027_blank\u0027\u003eM32\u003c/a\u003e\u003c/span\u003e - SDR family oxidoreductase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M34\u0027 target=\u0027_blank\u0027\u003eM34\u003c/a\u003e\u003c/span\u003e - ATP-binding protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M43\u0027 target=\u0027_blank\u0027\u003eM43\u003c/a\u003e\u003c/span\u003e - hypothetical protein PHICD211_20142\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D13\u0027 target=\u0027_blank\u0027\u003eD13\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M36\u0027 target=\u0027_blank\u0027\u003eM36\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M31\u0027 target=\u0027_blank\u0027\u003eM31\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M30\u0027 target=\u0027_blank\u0027\u003eM30\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M39\u0027 target=\u0027_blank\u0027\u003eM39\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M46\u0027 target=\u0027_blank\u0027\u003eM46\u003c/a\u003e\u003c/span\u003e - prevent-host-death family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M41\u0027 target=\u0027_blank\u0027\u003eM41\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D34\u0027 target=\u0027_blank\u0027\u003eD34\u003c/a\u003e\u003c/span\u003e - DNA-binding protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M44\u0027 target=\u0027_blank\u0027\u003eM44\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D32\u0027 target=\u0027_blank\u0027\u003eD32\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M45\u0027 target=\u0027_blank\u0027\u003eM45\u003c/a\u003e\u003c/span\u003e - recombinase family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M29\u0027 target=\u0027_blank\u0027\u003eM29\u003c/a\u003e\u003c/span\u003e - pyrroline-5-carboxylate reductase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#C24765",
        "id": "D5",
        "label": "D5",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D5\u0027 target=\u0027_blank\u0027\u003eD5\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#C24765",
        "id": "D7",
        "label": "D7",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D7\u0027 target=\u0027_blank\u0027\u003eD7\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDNA replication inhibitor toxin SocB\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#C24765",
        "id": "D11",
        "label": "D11",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D11\u0027 target=\u0027_blank\u0027\u003eD11\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA"
    }, {
        "color": "#427749",
        "id": "D3",
        "label": "D3",
        "shape": "dot",
        "size": 13,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D3\u0027 target=\u0027_blank\u0027\u003eD3\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/PanA\u0027 target=\u0027_blank\u0027\u003ePanA\u003c/a\u003e\u003c/span\u003e - PanA\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M37\u0027 target=\u0027_blank\u0027\u003eM37\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#427749",
        "id": "D31",
        "label": "D31",
        "shape": "dot",
        "size": 23,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system Phd/YefM family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D49\u0027 target=\u0027_blank\u0027\u003eD49\u003c/a\u003e\u003c/span\u003e - DUF4411 family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D64\u0027 target=\u0027_blank\u0027\u003eD64\u003c/a\u003e\u003c/span\u003e - growth inhibitor PemK\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D65\u0027 target=\u0027_blank\u0027\u003eD65\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M63\u0027 target=\u0027_blank\u0027\u003eM63\u003c/a\u003e\u003c/span\u003e - ATP-binding protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M57\u0027 target=\u0027_blank\u0027\u003eM57\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D36\u0027 target=\u0027_blank\u0027\u003eD36\u003c/a\u003e\u003c/span\u003e - Txe/YoeB family addiction module toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#427749",
        "id": "D13",
        "label": "D13",
        "shape": "dot",
        "size": 17,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D13\u0027 target=\u0027_blank\u0027\u003eD13\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eAbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D65\u0027 target=\u0027_blank\u0027\u003eD65\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M68\u0027 target=\u0027_blank\u0027\u003eM68\u003c/a\u003e\u003c/span\u003e - DUF4258 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M58\u0027 target=\u0027_blank\u0027\u003eM58\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#427749",
        "id": "D26",
        "label": "D26",
        "shape": "dot",
        "size": 21,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eribbon-helix-helix protein, CopG family\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M49\u0027 target=\u0027_blank\u0027\u003eM49\u003c/a\u003e\u003c/span\u003e - MFS transporter\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D133\u0027 target=\u0027_blank\u0027\u003eD133\u003c/a\u003e\u003c/span\u003e - toxin Doc\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M54\u0027 target=\u0027_blank\u0027\u003eM54\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D68\u0027 target=\u0027_blank\u0027\u003eD68\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D67\u0027 target=\u0027_blank\u0027\u003eD67\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M47\u0027 target=\u0027_blank\u0027\u003eM47\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M48\u0027 target=\u0027_blank\u0027\u003eM48\u003c/a\u003e\u003c/span\u003e - hypothetical protein SEA_HEDWIG_39"
    }, {
        "color": "#427749",
        "id": "D34",
        "label": "D34",
        "shape": "dot",
        "size": 14,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D34\u0027 target=\u0027_blank\u0027\u003eD34\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDNA-binding protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M52\u0027 target=\u0027_blank\u0027\u003eM52\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M53\u0027 target=\u0027_blank\u0027\u003eM53\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M71\u0027 target=\u0027_blank\u0027\u003eM71\u003c/a\u003e\u003c/span\u003e - hypothetical protein SEA_YEEZY_45"
    }, {
        "color": "#427749",
        "id": "D32",
        "label": "D32",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D32\u0027 target=\u0027_blank\u0027\u003eD32\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system Phd/YefM family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M60\u0027 target=\u0027_blank\u0027\u003eM60\u003c/a\u003e\u003c/span\u003e - 2-keto-3-deoxygluconate permease\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin"
    }, {
        "color": "#427749",
        "id": "D27",
        "label": "D27",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D27\u0027 target=\u0027_blank\u0027\u003eD27\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D8\u0027 target=\u0027_blank\u0027\u003eD8\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#427749",
        "id": "D33",
        "label": "D33",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D33\u0027 target=\u0027_blank\u0027\u003eD33\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eCopG family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#427749",
        "id": "D24",
        "label": "D24",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D24\u0027 target=\u0027_blank\u0027\u003eD24\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eCopG family transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#427749",
        "id": "D29",
        "label": "D29",
        "shape": "dot",
        "size": 23,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eATP-binding protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M69\u0027 target=\u0027_blank\u0027\u003eM69\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D51\u0027 target=\u0027_blank\u0027\u003eD51\u003c/a\u003e\u003c/span\u003e - TIGR02646 family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M72\u0027 target=\u0027_blank\u0027\u003eM72\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M55\u0027 target=\u0027_blank\u0027\u003eM55\u003c/a\u003e\u003c/span\u003e - DUF4435 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M73\u0027 target=\u0027_blank\u0027\u003eM73\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M61\u0027 target=\u0027_blank\u0027\u003eM61\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D3\u0027 target=\u0027_blank\u0027\u003eD3\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M64\u0027 target=\u0027_blank\u0027\u003eM64\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M70\u0027 target=\u0027_blank\u0027\u003eM70\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D44\u0027 target=\u0027_blank\u0027\u003eD44\u003c/a\u003e\u003c/span\u003e - RloB domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D62\u0027 target=\u0027_blank\u0027\u003eD62\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D50\u0027 target=\u0027_blank\u0027\u003eD50\u003c/a\u003e\u003c/span\u003e - N-6 DNA methylase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D60\u0027 target=\u0027_blank\u0027\u003eD60\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#427749",
        "id": "D25",
        "label": "D25",
        "shape": "dot",
        "size": 28,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eImmA/IrrE family metallo-endopeptidase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D61\u0027 target=\u0027_blank\u0027\u003eD61\u003c/a\u003e\u003c/span\u003e - hypothetical protein phiCT9441A_31 (endogenous virus)\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D49\u0027 target=\u0027_blank\u0027\u003eD49\u003c/a\u003e\u003c/span\u003e - DUF4411 family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D58\u0027 target=\u0027_blank\u0027\u003eD58\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D52\u0027 target=\u0027_blank\u0027\u003eD52\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M56\u0027 target=\u0027_blank\u0027\u003eM56\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M65\u0027 target=\u0027_blank\u0027\u003eM65\u003c/a\u003e\u003c/span\u003e - restriction endonuclease\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D5\u0027 target=\u0027_blank\u0027\u003eD5\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D56\u0027 target=\u0027_blank\u0027\u003eD56\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M62\u0027 target=\u0027_blank\u0027\u003eM62\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M51\u0027 target=\u0027_blank\u0027\u003eM51\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M59\u0027 target=\u0027_blank\u0027\u003eM59\u003c/a\u003e\u003c/span\u003e - DUF4248 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M66\u0027 target=\u0027_blank\u0027\u003eM66\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M50\u0027 target=\u0027_blank\u0027\u003eM50\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M67\u0027 target=\u0027_blank\u0027\u003eM67\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D66\u0027 target=\u0027_blank\u0027\u003eD66\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D63\u0027 target=\u0027_blank\u0027\u003eD63\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D65",
        "label": "D65",
        "shape": "dot",
        "size": 16,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D65\u0027 target=\u0027_blank\u0027\u003eD65\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system VapC family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D13\u0027 target=\u0027_blank\u0027\u003eD13\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M152\u0027 target=\u0027_blank\u0027\u003eM152\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M158\u0027 target=\u0027_blank\u0027\u003eM158\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M149\u0027 target=\u0027_blank\u0027\u003eM149\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M114\u0027 target=\u0027_blank\u0027\u003eM114\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D54",
        "label": "D54",
        "shape": "dot",
        "size": 20,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ePIN domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M127\u0027 target=\u0027_blank\u0027\u003eM127\u003c/a\u003e\u003c/span\u003e - antitoxin family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D108\u0027 target=\u0027_blank\u0027\u003eD108\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D13\u0027 target=\u0027_blank\u0027\u003eD13\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M103\u0027 target=\u0027_blank\u0027\u003eM103\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D109\u0027 target=\u0027_blank\u0027\u003eD109\u003c/a\u003e\u003c/span\u003e - DUF2281 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M109\u0027 target=\u0027_blank\u0027\u003eM109\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M77\u0027 target=\u0027_blank\u0027\u003eM77\u003c/a\u003e\u003c/span\u003e - redox-regulated ATPase YchF\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M139\u0027 target=\u0027_blank\u0027\u003eM139\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D99\u0027 target=\u0027_blank\u0027\u003eD99\u003c/a\u003e\u003c/span\u003e - DUF104 domain-containing protein"
    }, {
        "color": "#C24765",
        "id": "D45",
        "label": "D45",
        "shape": "dot",
        "size": 19,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system PemK/MazF family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D142\u0027 target=\u0027_blank\u0027\u003eD142\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D13\u0027 target=\u0027_blank\u0027\u003eD13\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M91\u0027 target=\u0027_blank\u0027\u003eM91\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M102\u0027 target=\u0027_blank\u0027\u003eM102\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D102\u0027 target=\u0027_blank\u0027\u003eD102\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M136\u0027 target=\u0027_blank\u0027\u003eM136\u003c/a\u003e\u003c/span\u003e - CopG family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M143\u0027 target=\u0027_blank\u0027\u003eM143\u003c/a\u003e\u003c/span\u003e - recombinase family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D101\u0027 target=\u0027_blank\u0027\u003eD101\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M107\u0027 target=\u0027_blank\u0027\u003eM107\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D53",
        "label": "D53",
        "shape": "dot",
        "size": 19,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system RelE/ParE family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D106\u0027 target=\u0027_blank\u0027\u003eD106\u003c/a\u003e\u003c/span\u003e - antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M110\u0027 target=\u0027_blank\u0027\u003eM110\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M123\u0027 target=\u0027_blank\u0027\u003eM123\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M99\u0027 target=\u0027_blank\u0027\u003eM99\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M125\u0027 target=\u0027_blank\u0027\u003eM125\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M157\u0027 target=\u0027_blank\u0027\u003eM157\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#C24765",
        "id": "D57",
        "label": "D57",
        "shape": "dot",
        "size": 30,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system RelE/ParE family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M159\u0027 target=\u0027_blank\u0027\u003eM159\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D97\u0027 target=\u0027_blank\u0027\u003eD97\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M132\u0027 target=\u0027_blank\u0027\u003eM132\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M100\u0027 target=\u0027_blank\u0027\u003eM100\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M130\u0027 target=\u0027_blank\u0027\u003eM130\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M93\u0027 target=\u0027_blank\u0027\u003eM93\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M145\u0027 target=\u0027_blank\u0027\u003eM145\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M83\u0027 target=\u0027_blank\u0027\u003eM83\u003c/a\u003e\u003c/span\u003e - restriction endonuclease subunit S\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M81\u0027 target=\u0027_blank\u0027\u003eM81\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M97\u0027 target=\u0027_blank\u0027\u003eM97\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M156\u0027 target=\u0027_blank\u0027\u003eM156\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M111\u0027 target=\u0027_blank\u0027\u003eM111\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M154\u0027 target=\u0027_blank\u0027\u003eM154\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M74\u0027 target=\u0027_blank\u0027\u003eM74\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M108\u0027 target=\u0027_blank\u0027\u003eM108\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M117\u0027 target=\u0027_blank\u0027\u003eM117\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M101\u0027 target=\u0027_blank\u0027\u003eM101\u003c/a\u003e\u003c/span\u003e - CopG family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M95\u0027 target=\u0027_blank\u0027\u003eM95\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D36",
        "label": "D36",
        "shape": "dot",
        "size": 15,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D36\u0027 target=\u0027_blank\u0027\u003eD36\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eTxe/YoeB family addiction module toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M105\u0027 target=\u0027_blank\u0027\u003eM105\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M147\u0027 target=\u0027_blank\u0027\u003eM147\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M84\u0027 target=\u0027_blank\u0027\u003eM84\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D64",
        "label": "D64",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D64\u0027 target=\u0027_blank\u0027\u003eD64\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003egrowth inhibitor PemK\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin"
    }, {
        "color": "#C24765",
        "id": "D59",
        "label": "D59",
        "shape": "dot",
        "size": 35,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eputative toxin-antitoxin system toxin component, PIN family\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D111\u0027 target=\u0027_blank\u0027\u003eD111\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M151\u0027 target=\u0027_blank\u0027\u003eM151\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M153\u0027 target=\u0027_blank\u0027\u003eM153\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M135\u0027 target=\u0027_blank\u0027\u003eM135\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D110\u0027 target=\u0027_blank\u0027\u003eD110\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system ParD family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D33\u0027 target=\u0027_blank\u0027\u003eD33\u003c/a\u003e\u003c/span\u003e - CopG family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D105\u0027 target=\u0027_blank\u0027\u003eD105\u003c/a\u003e\u003c/span\u003e - dephospho-CoA kinase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D13\u0027 target=\u0027_blank\u0027\u003eD13\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M142\u0027 target=\u0027_blank\u0027\u003eM142\u003c/a\u003e\u003c/span\u003e - toxin-antitoxin (TA) system antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M106\u0027 target=\u0027_blank\u0027\u003eM106\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M92\u0027 target=\u0027_blank\u0027\u003eM92\u003c/a\u003e\u003c/span\u003e - RNA methyltransferase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M148\u0027 target=\u0027_blank\u0027\u003eM148\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M90\u0027 target=\u0027_blank\u0027\u003eM90\u003c/a\u003e\u003c/span\u003e - NAD-dependent epimerase/dehydratase family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M134\u0027 target=\u0027_blank\u0027\u003eM134\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D107\u0027 target=\u0027_blank\u0027\u003eD107\u003c/a\u003e\u003c/span\u003e - DUF2281 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M112\u0027 target=\u0027_blank\u0027\u003eM112\u003c/a\u003e\u003c/span\u003e - AAA family ATPase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M113\u0027 target=\u0027_blank\u0027\u003eM113\u003c/a\u003e\u003c/span\u003e - AraC family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M116\u0027 target=\u0027_blank\u0027\u003eM116\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M141\u0027 target=\u0027_blank\u0027\u003eM141\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M140\u0027 target=\u0027_blank\u0027\u003eM140\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M76\u0027 target=\u0027_blank\u0027\u003eM76\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M121\u0027 target=\u0027_blank\u0027\u003eM121\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#C24765",
        "id": "D41",
        "label": "D41",
        "shape": "dot",
        "size": 26,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehelix-turn-helix transcriptional regulator\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M88\u0027 target=\u0027_blank\u0027\u003eM88\u003c/a\u003e\u003c/span\u003e - DUF3923 family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M82\u0027 target=\u0027_blank\u0027\u003eM82\u003c/a\u003e\u003c/span\u003e - glutamate-1-semialdehyde 2,1-aminomutase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M122\u0027 target=\u0027_blank\u0027\u003eM122\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M85\u0027 target=\u0027_blank\u0027\u003eM85\u003c/a\u003e\u003c/span\u003e - GNAT family N-acetyltransferase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M155\u0027 target=\u0027_blank\u0027\u003eM155\u003c/a\u003e\u003c/span\u003e - NgoFVII family restriction endonuclease\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M104\u0027 target=\u0027_blank\u0027\u003eM104\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M87\u0027 target=\u0027_blank\u0027\u003eM87\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M138\u0027 target=\u0027_blank\u0027\u003eM138\u003c/a\u003e\u003c/span\u003e - DUF4428 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M146\u0027 target=\u0027_blank\u0027\u003eM146\u003c/a\u003e\u003c/span\u003e - 3\u0027-5\u0027 exonuclease\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M131\u0027 target=\u0027_blank\u0027\u003eM131\u003c/a\u003e\u003c/span\u003e - restriction endonuclease\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M79\u0027 target=\u0027_blank\u0027\u003eM79\u003c/a\u003e\u003c/span\u003e - DUF4041 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M98\u0027 target=\u0027_blank\u0027\u003eM98\u003c/a\u003e\u003c/span\u003e - type I toxin-antitoxin system SymE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M115\u0027 target=\u0027_blank\u0027\u003eM115\u003c/a\u003e\u003c/span\u003e - chromate transporter\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M89\u0027 target=\u0027_blank\u0027\u003eM89\u003c/a\u003e\u003c/span\u003e - DUF4352 domain-containing protein"
    }, {
        "color": "#C24765",
        "id": "D66",
        "label": "D66",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D66\u0027 target=\u0027_blank\u0027\u003eD66\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#C24765",
        "id": "D49",
        "label": "D49",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D49\u0027 target=\u0027_blank\u0027\u003eD49\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF4411 family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin"
    }, {
        "color": "#C24765",
        "id": "D61",
        "label": "D61",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D61\u0027 target=\u0027_blank\u0027\u003eD61\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein phiCT9441A_31 (endogenous virus)\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#C24765",
        "id": "D52",
        "label": "D52",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D52\u0027 target=\u0027_blank\u0027\u003eD52\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#C24765",
        "id": "D47",
        "label": "D47",
        "shape": "dot",
        "size": 18,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D47\u0027 target=\u0027_blank\u0027\u003eD47\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system VapC family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M137\u0027 target=\u0027_blank\u0027\u003eM137\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M75\u0027 target=\u0027_blank\u0027\u003eM75\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M126\u0027 target=\u0027_blank\u0027\u003eM126\u003c/a\u003e\u003c/span\u003e - UPF0175 family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M94\u0027 target=\u0027_blank\u0027\u003eM94\u003c/a\u003e\u003c/span\u003e - 2-C-methyl-D-erythritol 4-phosphate cytidylyltransferase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M80\u0027 target=\u0027_blank\u0027\u003eM80\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M150\u0027 target=\u0027_blank\u0027\u003eM150\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M119\u0027 target=\u0027_blank\u0027\u003eM119\u003c/a\u003e\u003c/span\u003e - CopG family transcriptional regulator"
    }, {
        "color": "#C24765",
        "id": "D63",
        "label": "D63",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D63\u0027 target=\u0027_blank\u0027\u003eD63\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#C24765",
        "id": "D56",
        "label": "D56",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D56\u0027 target=\u0027_blank\u0027\u003eD56\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#C24765",
        "id": "D58",
        "label": "D58",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D58\u0027 target=\u0027_blank\u0027\u003eD58\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D25\u0027 target=\u0027_blank\u0027\u003eD25\u003c/a\u003e\u003c/span\u003e - ImmA/IrrE family metallo-endopeptidase"
    }, {
        "color": "#C24765",
        "id": "D67",
        "label": "D67",
        "shape": "dot",
        "size": 16,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D67\u0027 target=\u0027_blank\u0027\u003eD67\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ePIN domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D108\u0027 target=\u0027_blank\u0027\u003eD108\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M86\u0027 target=\u0027_blank\u0027\u003eM86\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M118\u0027 target=\u0027_blank\u0027\u003eM118\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M129\u0027 target=\u0027_blank\u0027\u003eM129\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M128\u0027 target=\u0027_blank\u0027\u003eM128\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D68",
        "label": "D68",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D68\u0027 target=\u0027_blank\u0027\u003eD68\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system RelE/ParE family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#C24765",
        "id": "D60",
        "label": "D60",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D60\u0027 target=\u0027_blank\u0027\u003eD60\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#C24765",
        "id": "D50",
        "label": "D50",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D50\u0027 target=\u0027_blank\u0027\u003eD50\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eN-6 DNA methylase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#C24765",
        "id": "D62",
        "label": "D62",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D62\u0027 target=\u0027_blank\u0027\u003eD62\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#C24765",
        "id": "D44",
        "label": "D44",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D44\u0027 target=\u0027_blank\u0027\u003eD44\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eRloB domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein"
    }, {
        "color": "#C24765",
        "id": "D51",
        "label": "D51",
        "shape": "dot",
        "size": 17,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D51\u0027 target=\u0027_blank\u0027\u003eD51\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eTIGR02646 family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M120\u0027 target=\u0027_blank\u0027\u003eM120\u003c/a\u003e\u003c/span\u003e - putative replication initiation protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M124\u0027 target=\u0027_blank\u0027\u003eM124\u003c/a\u003e\u003c/span\u003e - phage terminase small subunit P27 family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M96\u0027 target=\u0027_blank\u0027\u003eM96\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M144\u0027 target=\u0027_blank\u0027\u003eM144\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M133\u0027 target=\u0027_blank\u0027\u003eM133\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D29\u0027 target=\u0027_blank\u0027\u003eD29\u003c/a\u003e\u003c/span\u003e - ATP-binding protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M78\u0027 target=\u0027_blank\u0027\u003eM78\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#427749",
        "id": "D94",
        "label": "D94",
        "shape": "dot",
        "size": 20,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system RelB/DinJ family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M161\u0027 target=\u0027_blank\u0027\u003eM161\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M165\u0027 target=\u0027_blank\u0027\u003eM165\u003c/a\u003e\u003c/span\u003e - replication initiation protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D68\u0027 target=\u0027_blank\u0027\u003eD68\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D36\u0027 target=\u0027_blank\u0027\u003eD36\u003c/a\u003e\u003c/span\u003e - Txe/YoeB family addiction module toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M174\u0027 target=\u0027_blank\u0027\u003eM174\u003c/a\u003e\u003c/span\u003e - nucleotide-binding protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M176\u0027 target=\u0027_blank\u0027\u003eM176\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#427749",
        "id": "D95",
        "label": "D95",
        "shape": "dot",
        "size": 21,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003esite-specific integrase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M171\u0027 target=\u0027_blank\u0027\u003eM171\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D132\u0027 target=\u0027_blank\u0027\u003eD132\u003c/a\u003e\u003c/span\u003e - DUF3173 family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M169\u0027 target=\u0027_blank\u0027\u003eM169\u003c/a\u003e\u003c/span\u003e - HD domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M164\u0027 target=\u0027_blank\u0027\u003eM164\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M175\u0027 target=\u0027_blank\u0027\u003eM175\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M172\u0027 target=\u0027_blank\u0027\u003eM172\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/span\u003e - helix-turn-helix domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D41\u0027 target=\u0027_blank\u0027\u003eD41\u003c/a\u003e\u003c/span\u003e - helix-turn-helix transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M177\u0027 target=\u0027_blank\u0027\u003eM177\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M162\u0027 target=\u0027_blank\u0027\u003eM162\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M170\u0027 target=\u0027_blank\u0027\u003eM170\u003c/a\u003e\u003c/span\u003e - Ltp family lipoprotein"
    }, {
        "color": "#427749",
        "id": "D106",
        "label": "D106",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D106\u0027 target=\u0027_blank\u0027\u003eD106\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eantitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M160\u0027 target=\u0027_blank\u0027\u003eM160\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D53\u0027 target=\u0027_blank\u0027\u003eD53\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin"
    }, {
        "color": "#427749",
        "id": "D109",
        "label": "D109",
        "shape": "dot",
        "size": 14,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D109\u0027 target=\u0027_blank\u0027\u003eD109\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF2281 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M168\u0027 target=\u0027_blank\u0027\u003eM168\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M163\u0027 target=\u0027_blank\u0027\u003eM163\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#427749",
        "id": "D108",
        "label": "D108",
        "shape": "dot",
        "size": 13,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D108\u0027 target=\u0027_blank\u0027\u003eD108\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eribbon-helix-helix domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D67\u0027 target=\u0027_blank\u0027\u003eD67\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#427749",
        "id": "D99",
        "label": "D99",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D99\u0027 target=\u0027_blank\u0027\u003eD99\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF104 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D54\u0027 target=\u0027_blank\u0027\u003eD54\u003c/a\u003e\u003c/span\u003e - PIN domain-containing protein"
    }, {
        "color": "#427749",
        "id": "D97",
        "label": "D97",
        "shape": "dot",
        "size": 13,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D97\u0027 target=\u0027_blank\u0027\u003eD97\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M173\u0027 target=\u0027_blank\u0027\u003eM173\u003c/a\u003e\u003c/span\u003e - HEAT repeat domain-containing protein, partial\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D57\u0027 target=\u0027_blank\u0027\u003eD57\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelE/ParE family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M167\u0027 target=\u0027_blank\u0027\u003eM167\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#427749",
        "id": "D101",
        "label": "D101",
        "shape": "dot",
        "size": 14,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D101\u0027 target=\u0027_blank\u0027\u003eD101\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eribbon-helix-helix protein, CopG family\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D133\u0027 target=\u0027_blank\u0027\u003eD133\u003c/a\u003e\u003c/span\u003e - toxin Doc\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M166\u0027 target=\u0027_blank\u0027\u003eM166\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#427749",
        "id": "D102",
        "label": "D102",
        "shape": "dot",
        "size": 14,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D102\u0027 target=\u0027_blank\u0027\u003eD102\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eribbon-helix-helix protein, CopG family\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#427749",
        "id": "D107",
        "label": "D107",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D107\u0027 target=\u0027_blank\u0027\u003eD107\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF2281 domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#427749",
        "id": "D111",
        "label": "D111",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D111\u0027 target=\u0027_blank\u0027\u003eD111\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eribbon-helix-helix domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#427749",
        "id": "D105",
        "label": "D105",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D105\u0027 target=\u0027_blank\u0027\u003eD105\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003edephospho-CoA kinase\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#427749",
        "id": "D110",
        "label": "D110",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D110\u0027 target=\u0027_blank\u0027\u003eD110\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system ParD family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D59\u0027 target=\u0027_blank\u0027\u003eD59\u003c/a\u003e\u003c/span\u003e - putative toxin-antitoxin system toxin component, PIN family"
    }, {
        "color": "#C24765",
        "id": "D128",
        "label": "D128",
        "shape": "dot",
        "size": 32,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system VapC family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D108\u0027 target=\u0027_blank\u0027\u003eD108\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D102\u0027 target=\u0027_blank\u0027\u003eD102\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D157\u0027 target=\u0027_blank\u0027\u003eD157\u003c/a\u003e\u003c/span\u003e - antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D142\u0027 target=\u0027_blank\u0027\u003eD142\u003c/a\u003e\u003c/span\u003e - AbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M182\u0027 target=\u0027_blank\u0027\u003eM182\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M191\u0027 target=\u0027_blank\u0027\u003eM191\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D148\u0027 target=\u0027_blank\u0027\u003eD148\u003c/a\u003e\u003c/span\u003e - Arc family DNA-binding protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D154\u0027 target=\u0027_blank\u0027\u003eD154\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D150\u0027 target=\u0027_blank\u0027\u003eD150\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapB family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M204\u0027 target=\u0027_blank\u0027\u003eM204\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D144\u0027 target=\u0027_blank\u0027\u003eD144\u003c/a\u003e\u003c/span\u003e - antitoxin VapB family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D151\u0027 target=\u0027_blank\u0027\u003eD151\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M185\u0027 target=\u0027_blank\u0027\u003eM185\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D153\u0027 target=\u0027_blank\u0027\u003eD153\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M211\u0027 target=\u0027_blank\u0027\u003eM211\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M193\u0027 target=\u0027_blank\u0027\u003eM193\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M212\u0027 target=\u0027_blank\u0027\u003eM212\u003c/a\u003e\u003c/span\u003e - cob(I)yrinic acid a,c-diamide adenosyltransferase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M197\u0027 target=\u0027_blank\u0027\u003eM197\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M198\u0027 target=\u0027_blank\u0027\u003eM198\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M219\u0027 target=\u0027_blank\u0027\u003eM219\u003c/a\u003e\u003c/span\u003e - CopG family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D146\u0027 target=\u0027_blank\u0027\u003eD146\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#C24765",
        "id": "D126",
        "label": "D126",
        "shape": "dot",
        "size": 30,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system PemK/MazF family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M216\u0027 target=\u0027_blank\u0027\u003eM216\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M205\u0027 target=\u0027_blank\u0027\u003eM205\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D109\u0027 target=\u0027_blank\u0027\u003eD109\u003c/a\u003e\u003c/span\u003e - DUF2281 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D102\u0027 target=\u0027_blank\u0027\u003eD102\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M190\u0027 target=\u0027_blank\u0027\u003eM190\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M206\u0027 target=\u0027_blank\u0027\u003eM206\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M199\u0027 target=\u0027_blank\u0027\u003eM199\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M208\u0027 target=\u0027_blank\u0027\u003eM208\u003c/a\u003e\u003c/span\u003e - DUF104 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M217\u0027 target=\u0027_blank\u0027\u003eM217\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M195\u0027 target=\u0027_blank\u0027\u003eM195\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M189\u0027 target=\u0027_blank\u0027\u003eM189\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M215\u0027 target=\u0027_blank\u0027\u003eM215\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D99\u0027 target=\u0027_blank\u0027\u003eD99\u003c/a\u003e\u003c/span\u003e - DUF104 domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M209\u0027 target=\u0027_blank\u0027\u003eM209\u003c/a\u003e\u003c/span\u003e - methyltransferase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M201\u0027 target=\u0027_blank\u0027\u003eM201\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D147\u0027 target=\u0027_blank\u0027\u003eD147\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M214\u0027 target=\u0027_blank\u0027\u003eM214\u003c/a\u003e\u003c/span\u003e - MarR family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M210\u0027 target=\u0027_blank\u0027\u003eM210\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M187\u0027 target=\u0027_blank\u0027\u003eM187\u003c/a\u003e\u003c/span\u003e - antitoxin MazE family protein"
    }, {
        "color": "#C24765",
        "id": "D119",
        "label": "D119",
        "shape": "dot",
        "size": 20,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system YafQ family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M192\u0027 target=\u0027_blank\u0027\u003eM192\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M203\u0027 target=\u0027_blank\u0027\u003eM203\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M179\u0027 target=\u0027_blank\u0027\u003eM179\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M218\u0027 target=\u0027_blank\u0027\u003eM218\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D151\u0027 target=\u0027_blank\u0027\u003eD151\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M202\u0027 target=\u0027_blank\u0027\u003eM202\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M186\u0027 target=\u0027_blank\u0027\u003eM186\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M178\u0027 target=\u0027_blank\u0027\u003eM178\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D94\u0027 target=\u0027_blank\u0027\u003eD94\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system RelB/DinJ family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D152\u0027 target=\u0027_blank\u0027\u003eD152\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin"
    }, {
        "color": "#427749",
        "id": "D127",
        "label": "D127",
        "shape": "dot",
        "size": 20,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D127\u0027 target=\u0027_blank\u0027\u003eD127\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehelix-turn-helix domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M200\u0027 target=\u0027_blank\u0027\u003eM200\u003c/a\u003e\u003c/span\u003e - Rha family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M213\u0027 target=\u0027_blank\u0027\u003eM213\u003c/a\u003e\u003c/span\u003e - AAA family ATPase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M196\u0027 target=\u0027_blank\u0027\u003eM196\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M181\u0027 target=\u0027_blank\u0027\u003eM181\u003c/a\u003e\u003c/span\u003e - phage repressor protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M188\u0027 target=\u0027_blank\u0027\u003eM188\u003c/a\u003e\u003c/span\u003e - substrate-binding domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M183\u0027 target=\u0027_blank\u0027\u003eM183\u003c/a\u003e\u003c/span\u003e - replication initiation factor domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M184\u0027 target=\u0027_blank\u0027\u003eM184\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M194\u0027 target=\u0027_blank\u0027\u003eM194\u003c/a\u003e\u003c/span\u003e - transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M180\u0027 target=\u0027_blank\u0027\u003eM180\u003c/a\u003e\u003c/span\u003e - ParB N-terminal domain-containing protein"
    }, {
        "color": "#C24765",
        "id": "D132",
        "label": "D132",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D132\u0027 target=\u0027_blank\u0027\u003eD132\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eDUF3173 family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D95\u0027 target=\u0027_blank\u0027\u003eD95\u003c/a\u003e\u003c/span\u003e - site-specific integrase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M207\u0027 target=\u0027_blank\u0027\u003eM207\u003c/a\u003e\u003c/span\u003e - Rep protein"
    }, {
        "color": "#C24765",
        "id": "D133",
        "label": "D133",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D133\u0027 target=\u0027_blank\u0027\u003eD133\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etoxin Doc\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D101\u0027 target=\u0027_blank\u0027\u003eD101\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D26\u0027 target=\u0027_blank\u0027\u003eD26\u003c/a\u003e\u003c/span\u003e - ribbon-helix-helix protein, CopG family"
    }, {
        "color": "#427749",
        "id": "D151",
        "label": "D151",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D151\u0027 target=\u0027_blank\u0027\u003eD151\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#427749",
        "id": "D152",
        "label": "D152",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D152\u0027 target=\u0027_blank\u0027\u003eD152\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system Phd/YefM family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D119\u0027 target=\u0027_blank\u0027\u003eD119\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system YafQ family toxin"
    }, {
        "color": "#427749",
        "id": "D147",
        "label": "D147",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D147\u0027 target=\u0027_blank\u0027\u003eD147\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D126\u0027 target=\u0027_blank\u0027\u003eD126\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }, {
        "color": "#427749",
        "id": "D157",
        "label": "D157",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D157\u0027 target=\u0027_blank\u0027\u003eD157\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eantitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#427749",
        "id": "D153",
        "label": "D153",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D153\u0027 target=\u0027_blank\u0027\u003eD153\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M224\u0027 target=\u0027_blank\u0027\u003eM224\u003c/a\u003e\u003c/span\u003e - DNA polymerase III subunit beta\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#427749",
        "id": "D142",
        "label": "D142",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D142\u0027 target=\u0027_blank\u0027\u003eD142\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eAbrB/MazE/SpoVT family DNA-binding domain-containing protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D45\u0027 target=\u0027_blank\u0027\u003eD45\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#427749",
        "id": "D150",
        "label": "D150",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D150\u0027 target=\u0027_blank\u0027\u003eD150\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system VapB family antitoxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M223\u0027 target=\u0027_blank\u0027\u003eM223\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system HicB family antitoxin"
    }, {
        "color": "#427749",
        "id": "D148",
        "label": "D148",
        "shape": "dot",
        "size": 15,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D148\u0027 target=\u0027_blank\u0027\u003eD148\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eArc family DNA-binding protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M225\u0027 target=\u0027_blank\u0027\u003eM225\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M222\u0027 target=\u0027_blank\u0027\u003eM222\u003c/a\u003e\u003c/span\u003e - ABC transporter ATP-binding protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M220\u0027 target=\u0027_blank\u0027\u003eM220\u003c/a\u003e\u003c/span\u003e - DUF2493 domain-containing protein"
    }, {
        "color": "#427749",
        "id": "D144",
        "label": "D144",
        "shape": "dot",
        "size": 12,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D144\u0027 target=\u0027_blank\u0027\u003eD144\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003eantitoxin VapB family protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M221\u0027 target=\u0027_blank\u0027\u003eM221\u003c/a\u003e\u003c/span\u003e - multidrug effflux MFS transporter\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#427749",
        "id": "D146",
        "label": "D146",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D146\u0027 target=\u0027_blank\u0027\u003eD146\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#427749",
        "id": "D154",
        "label": "D154",
        "shape": "dot",
        "size": 11,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D154\u0027 target=\u0027_blank\u0027\u003eD154\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ehypothetical protein\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D128\u0027 target=\u0027_blank\u0027\u003eD128\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system VapC family toxin"
    }, {
        "color": "#C24765",
        "id": "D169",
        "label": "D169",
        "shape": "dot",
        "size": 19,
        "title": "\u003cb\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D169\u0027 target=\u0027_blank\u0027\u003eD169\u003c/a\u003e\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003etype II toxin-antitoxin system VapC family toxin\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M228\u0027 target=\u0027_blank\u0027\u003eM228\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M232\u0027 target=\u0027_blank\u0027\u003eM232\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M227\u0027 target=\u0027_blank\u0027\u003eM227\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M230\u0027 target=\u0027_blank\u0027\u003eM230\u003c/a\u003e\u003c/span\u003e - antitoxin family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D31\u0027 target=\u0027_blank\u0027\u003eD31\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system Phd/YefM family antitoxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M231\u0027 target=\u0027_blank\u0027\u003eM231\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M229\u0027 target=\u0027_blank\u0027\u003eM229\u003c/a\u003e\u003c/span\u003e - tyrosine-type recombinase/integrase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D148\u0027 target=\u0027_blank\u0027\u003eD148\u003c/a\u003e\u003c/span\u003e - Arc family DNA-binding protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/M226\u0027 target=\u0027_blank\u0027\u003eM226\u003c/a\u003e\u003c/span\u003e - hypothetical protein"
    }, {
        "color": "#98b09a",
        "id": "PanA",
        "label": "PanA",
        "shape": "diamond",
        "size": 44,
        "title": "\u003cb\u003ePanA\u003c/b\u003e - \u003cspan class=\u0027fw-semibold fst-italic\u0027\u003ePanA\u003c/span\u003e\u003cbr\u003e\u003cb\u003eNeighbours:\u003c/b\u003e\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M5\u0027 target=\u0027_blank\u0027\u003eM5\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M22\u0027 target=\u0027_blank\u0027\u003eM22\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D6\u0027 target=\u0027_blank\u0027\u003eD6\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system death-on-curing family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M19\u0027 target=\u0027_blank\u0027\u003eM19\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D2\u0027 target=\u0027_blank\u0027\u003eD2\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system MqsR family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D5\u0027 target=\u0027_blank\u0027\u003eD5\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M18\u0027 target=\u0027_blank\u0027\u003eM18\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M4\u0027 target=\u0027_blank\u0027\u003eM4\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M12\u0027 target=\u0027_blank\u0027\u003eM12\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D11\u0027 target=\u0027_blank\u0027\u003eD11\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M13\u0027 target=\u0027_blank\u0027\u003eM13\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M10\u0027 target=\u0027_blank\u0027\u003eM10\u003c/a\u003e\u003c/span\u003e - HD domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M6\u0027 target=\u0027_blank\u0027\u003eM6\u003c/a\u003e\u003c/span\u003e - GNAT family N-acetyltransferase\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D4\u0027 target=\u0027_blank\u0027\u003eD4\u003c/a\u003e\u003c/span\u003e - CvpA family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M9\u0027 target=\u0027_blank\u0027\u003eM9\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D7\u0027 target=\u0027_blank\u0027\u003eD7\u003c/a\u003e\u003c/span\u003e - DNA replication inhibitor toxin SocB\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #427749;\u0027 href=\u0027/netflax/D3\u0027 target=\u0027_blank\u0027\u003eD3\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M15\u0027 target=\u0027_blank\u0027\u003eM15\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D8\u0027 target=\u0027_blank\u0027\u003eD8\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M1\u0027 target=\u0027_blank\u0027\u003eM1\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D9\u0027 target=\u0027_blank\u0027\u003eD9\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M21\u0027 target=\u0027_blank\u0027\u003eM21\u003c/a\u003e\u003c/span\u003e - DnaJ domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M3\u0027 target=\u0027_blank\u0027\u003eM3\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M2\u0027 target=\u0027_blank\u0027\u003eM2\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M8\u0027 target=\u0027_blank\u0027\u003eM8\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M16\u0027 target=\u0027_blank\u0027\u003eM16\u003c/a\u003e\u003c/span\u003e - hypothetical protein BPSphi5223_0001\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M7\u0027 target=\u0027_blank\u0027\u003eM7\u003c/a\u003e\u003c/span\u003e - TrmB family transcriptional regulator\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M20\u0027 target=\u0027_blank\u0027\u003eM20\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M14\u0027 target=\u0027_blank\u0027\u003eM14\u003c/a\u003e\u003c/span\u003e - RelA/SpoT domain-containing protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D10\u0027 target=\u0027_blank\u0027\u003eD10\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D1\u0027 target=\u0027_blank\u0027\u003eD1\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M17\u0027 target=\u0027_blank\u0027\u003eM17\u003c/a\u003e\u003c/span\u003e - hypothetical protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/M11\u0027 target=\u0027_blank\u0027\u003eM11\u003c/a\u003e\u003c/span\u003e - Fic family protein\u003cbr\u003e\u003cspan class=\u0027fw-semibold\u0027\u003e\u003ca style=\u0027color: #C24765;\u0027 href=\u0027/netflax/D12\u0027 target=\u0027_blank\u0027\u003eD12\u003c/a\u003e\u003c/span\u003e - type II toxin-antitoxin system PemK/MazF family toxin"
    }]);
    edges = new vis.DataSet([{"from": "PanA", "title": "Round 1", "to": "D7"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "D1"
    }, {"from": "PanA", "title": "Round 1", "to": "D8"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "D10"
    }, {"from": "PanA", "title": "Round 1", "to": "D3"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "D11"
    }, {"from": "PanA", "title": "Round 1", "to": "D5"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "D9"
    }, {"from": "PanA", "title": "Round 1", "to": "D2"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "D4"
    }, {"from": "PanA", "title": "Round 1", "to": "D6"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "D12"
    }, {"from": "PanA", "title": "Round 1", "to": "M1"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M2"
    }, {"from": "PanA", "title": "Round 1", "to": "M3"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M4"
    }, {"from": "PanA", "title": "Round 1", "to": "M5"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M6"
    }, {"from": "PanA", "title": "Round 1", "to": "M7"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M8"
    }, {"from": "PanA", "title": "Round 1", "to": "M9"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M10"
    }, {"from": "PanA", "title": "Round 1", "to": "M11"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M12"
    }, {"from": "PanA", "title": "Round 1", "to": "M13"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M14"
    }, {"from": "PanA", "title": "Round 1", "to": "M15"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M16"
    }, {"from": "PanA", "title": "Round 1", "to": "M17"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M18"
    }, {"from": "PanA", "title": "Round 1", "to": "M19"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M20"
    }, {"from": "PanA", "title": "Round 1", "to": "M21"}, {
        "from": "PanA",
        "title": "Round 1",
        "to": "M22"
    }, {"from": "D6", "title": "Round 2", "to": "D34"}, {"from": "D3", "title": "Round 2", "to": "D29"}, {
        "from": "D10",
        "title": "Round 2",
        "to": "D33"
    }, {"from": "D6", "title": "Round 2", "to": "D31"}, {"from": "D10", "title": "Round 2", "to": "D24"}, {
        "from": "D6",
        "title": "Round 2",
        "to": "D26"
    }, {"from": "D6", "title": "Round 2", "to": "D13"}, {"from": "D6", "title": "Round 2", "to": "D32"}, {
        "from": "D5",
        "title": "Round 2",
        "to": "D25"
    }, {"from": "D8", "title": "Round 2", "to": "D27"}, {"from": "D9", "title": "Round 2", "to": "M23"}, {
        "from": "D10",
        "title": "Round 2",
        "to": "M24"
    }, {"from": "D8", "title": "Round 2", "to": "M25"}, {"from": "D8", "title": "Round 2", "to": "M26"}, {
        "from": "D8",
        "title": "Round 2",
        "to": "M27"
    }, {"from": "D8", "title": "Round 2", "to": "M28"}, {"from": "D6", "title": "Round 2", "to": "M29"}, {
        "from": "D6",
        "title": "Round 2",
        "to": "M30"
    }, {"from": "D6", "title": "Round 2", "to": "M31"}, {"from": "D6", "title": "Round 2", "to": "M32"}, {
        "from": "D9",
        "title": "Round 2",
        "to": "M33"
    }, {"from": "D6", "title": "Round 2", "to": "M34"}, {"from": "D10", "title": "Round 2", "to": "M35"}, {
        "from": "D6",
        "title": "Round 2",
        "to": "M36"
    }, {"from": "D3", "title": "Round 2", "to": "M37"}, {"from": "D10", "title": "Round 2", "to": "M38"}, {
        "from": "D6",
        "title": "Round 2",
        "to": "M39"
    }, {"from": "D2", "title": "Round 2", "to": "M40"}, {"from": "D6", "title": "Round 2", "to": "M41"}, {
        "from": "D2",
        "title": "Round 2",
        "to": "M42"
    }, {"from": "D6", "title": "Round 2", "to": "M43"}, {"from": "D6", "title": "Round 2", "to": "M44"}, {
        "from": "D6",
        "title": "Round 2",
        "to": "M45"
    }, {"from": "D6", "title": "Round 2", "to": "M46"}, {
        "from": "D31",
        "title": "Round 3",
        "to": "D53"
    }, {"from": "D31", "title": "Round 3", "to": "D36"}, {
        "from": "D29",
        "title": "Round 3",
        "to": "D44"
    }, {"from": "D31", "title": "Round 3", "to": "D57"}, {
        "from": "D25",
        "title": "Round 3",
        "to": "D63"
    }, {"from": "D29", "title": "Round 3", "to": "D60"}, {
        "from": "D29",
        "title": "Round 3",
        "to": "D51"
    }, {"from": "D13", "title": "Round 3", "to": "D54"}, {
        "from": "D31",
        "title": "Round 3",
        "to": "D64"
    }, {"from": "D25", "title": "Round 3", "to": "D41"}, {
        "from": "D49",
        "title": "Round 3",
        "to": "D31"
    }, {"from": "D29", "title": "Round 3", "to": "D50"}, {
        "from": "D13",
        "title": "Round 3",
        "to": "D65"
    }, {"from": "D31", "title": "Round 3", "to": "D59"}, {
        "from": "D29",
        "title": "Round 3",
        "to": "D62"
    }, {"from": "D25", "title": "Round 3", "to": "D49"}, {
        "from": "D13",
        "title": "Round 3",
        "to": "D45"
    }, {"from": "D25", "title": "Round 3", "to": "D52"}, {
        "from": "D25",
        "title": "Round 3",
        "to": "D61"
    }, {"from": "D25", "title": "Round 3", "to": "D47"}, {
        "from": "D26",
        "title": "Round 3",
        "to": "D67"
    }, {"from": "D25", "title": "Round 3", "to": "D58"}, {
        "from": "D26",
        "title": "Round 3",
        "to": "D68"
    }, {"from": "D25", "title": "Round 3", "to": "D66"}, {
        "from": "D25",
        "title": "Round 3",
        "to": "D56"
    }, {"from": "D26", "title": "Round 3", "to": "M47"}, {
        "from": "D26",
        "title": "Round 3",
        "to": "M48"
    }, {"from": "D26", "title": "Round 3", "to": "M49"}, {
        "from": "D25",
        "title": "Round 3",
        "to": "M50"
    }, {"from": "D25", "title": "Round 3", "to": "M51"}, {
        "from": "D34",
        "title": "Round 3",
        "to": "M52"
    }, {"from": "D34", "title": "Round 3", "to": "M53"}, {
        "from": "D26",
        "title": "Round 3",
        "to": "M54"
    }, {"from": "D29", "title": "Round 3", "to": "M55"}, {
        "from": "D25",
        "title": "Round 3",
        "to": "M56"
    }, {"from": "D31", "title": "Round 3", "to": "M57"}, {
        "from": "D13",
        "title": "Round 3",
        "to": "M58"
    }, {"from": "D25", "title": "Round 3", "to": "M59"}, {
        "from": "D32",
        "title": "Round 3",
        "to": "M60"
    }, {"from": "D29", "title": "Round 3", "to": "M61"}, {
        "from": "D25",
        "title": "Round 3",
        "to": "M62"
    }, {"from": "D31", "title": "Round 3", "to": "M63"}, {
        "from": "D29",
        "title": "Round 3",
        "to": "M64"
    }, {"from": "D25", "title": "Round 3", "to": "M65"}, {
        "from": "D25",
        "title": "Round 3",
        "to": "M66"
    }, {"from": "D25", "title": "Round 3", "to": "M67"}, {
        "from": "D13",
        "title": "Round 3",
        "to": "M68"
    }, {"from": "D29", "title": "Round 3", "to": "M69"}, {
        "from": "D29",
        "title": "Round 3",
        "to": "M70"
    }, {"from": "D34", "title": "Round 3", "to": "M71"}, {
        "from": "D29",
        "title": "Round 3",
        "to": "M72"
    }, {"from": "D29", "title": "Round 3", "to": "M73"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "D105"
    }, {"from": "D59", "title": "Round 4", "to": "D107"}, {
        "from": "D54",
        "title": "Round 4",
        "to": "D109"
    }, {"from": "D57", "title": "Round 4", "to": "D97"}, {
        "from": "D13",
        "title": "Round 4",
        "to": "D59"
    }, {"from": "D45", "title": "Round 4", "to": "D102"}, {
        "from": "D26",
        "title": "Round 4",
        "to": "D57"
    }, {"from": "D59", "title": "Round 4", "to": "D111"}, {
        "from": "D26",
        "title": "Round 4",
        "to": "D53"
    }, {"from": "D59", "title": "Round 4", "to": "D110"}, {
        "from": "D45",
        "title": "Round 4",
        "to": "D101"
    }, {"from": "D31", "title": "Round 4", "to": "D54"}, {
        "from": "D31",
        "title": "Round 4",
        "to": "D65"
    }, {"from": "D36", "title": "Round 4", "to": "D94"}, {
        "from": "D53",
        "title": "Round 4",
        "to": "D106"
    }, {"from": "D33", "title": "Round 4", "to": "D59"}, {
        "from": "D41",
        "title": "Round 4",
        "to": "D95"
    }, {"from": "D54", "title": "Round 4", "to": "D108"}, {
        "from": "D26",
        "title": "Round 4",
        "to": "D59"
    }, {"from": "D54", "title": "Round 4", "to": "D99"}, {
        "from": "D57",
        "title": "Round 4",
        "to": "M74"
    }, {"from": "D47", "title": "Round 4", "to": "M75"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M76"
    }, {"from": "D54", "title": "Round 4", "to": "M77"}, {
        "from": "D51",
        "title": "Round 4",
        "to": "M78"
    }, {"from": "D41", "title": "Round 4", "to": "M79"}, {
        "from": "D47",
        "title": "Round 4",
        "to": "M80"
    }, {"from": "D57", "title": "Round 4", "to": "M81"}, {
        "from": "D41",
        "title": "Round 4",
        "to": "M82"
    }, {"from": "D57", "title": "Round 4", "to": "M83"}, {
        "from": "D36",
        "title": "Round 4",
        "to": "M84"
    }, {"from": "D41", "title": "Round 4", "to": "M85"}, {
        "from": "D67",
        "title": "Round 4",
        "to": "M86"
    }, {"from": "D41", "title": "Round 4", "to": "M87"}, {
        "from": "D41",
        "title": "Round 4",
        "to": "M88"
    }, {"from": "D41", "title": "Round 4", "to": "M89"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M90"
    }, {"from": "D45", "title": "Round 4", "to": "M91"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M92"
    }, {"from": "D57", "title": "Round 4", "to": "M93"}, {
        "from": "D47",
        "title": "Round 4",
        "to": "M94"
    }, {"from": "D57", "title": "Round 4", "to": "M95"}, {
        "from": "D51",
        "title": "Round 4",
        "to": "M96"
    }, {"from": "D57", "title": "Round 4", "to": "M97"}, {
        "from": "D41",
        "title": "Round 4",
        "to": "M98"
    }, {"from": "D53", "title": "Round 4", "to": "M99"}, {
        "from": "D57",
        "title": "Round 4",
        "to": "M100"
    }, {"from": "D57", "title": "Round 4", "to": "M101"}, {
        "from": "D45",
        "title": "Round 4",
        "to": "M102"
    }, {"from": "D54", "title": "Round 4", "to": "M103"}, {
        "from": "D41",
        "title": "Round 4",
        "to": "M104"
    }, {"from": "D36", "title": "Round 4", "to": "M105"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M106"
    }, {"from": "D45", "title": "Round 4", "to": "M107"}, {
        "from": "D57",
        "title": "Round 4",
        "to": "M108"
    }, {"from": "D54", "title": "Round 4", "to": "M109"}, {
        "from": "D53",
        "title": "Round 4",
        "to": "M110"
    }, {"from": "D57", "title": "Round 4", "to": "M111"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M112"
    }, {"from": "D59", "title": "Round 4", "to": "M113"}, {
        "from": "D65",
        "title": "Round 4",
        "to": "M114"
    }, {"from": "D41", "title": "Round 4", "to": "M115"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M116"
    }, {"from": "D57", "title": "Round 4", "to": "M117"}, {
        "from": "D67",
        "title": "Round 4",
        "to": "M118"
    }, {"from": "D47", "title": "Round 4", "to": "M119"}, {
        "from": "D51",
        "title": "Round 4",
        "to": "M120"
    }, {"from": "D59", "title": "Round 4", "to": "M121"}, {
        "from": "D41",
        "title": "Round 4",
        "to": "M122"
    }, {"from": "D53", "title": "Round 4", "to": "M123"}, {
        "from": "D51",
        "title": "Round 4",
        "to": "M124"
    }, {"from": "D53", "title": "Round 4", "to": "M125"}, {
        "from": "D47",
        "title": "Round 4",
        "to": "M126"
    }, {"from": "D54", "title": "Round 4", "to": "M127"}, {
        "from": "D67",
        "title": "Round 4",
        "to": "M128"
    }, {"from": "D67", "title": "Round 4", "to": "M129"}, {
        "from": "D57",
        "title": "Round 4",
        "to": "M130"
    }, {"from": "D41", "title": "Round 4", "to": "M131"}, {
        "from": "D57",
        "title": "Round 4",
        "to": "M132"
    }, {"from": "D51", "title": "Round 4", "to": "M133"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M134"
    }, {"from": "D59", "title": "Round 4", "to": "M135"}, {
        "from": "D45",
        "title": "Round 4",
        "to": "M136"
    }, {"from": "D47", "title": "Round 4", "to": "M137"}, {
        "from": "D41",
        "title": "Round 4",
        "to": "M138"
    }, {"from": "D54", "title": "Round 4", "to": "M139"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M140"
    }, {"from": "D59", "title": "Round 4", "to": "M141"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M142"
    }, {"from": "D45", "title": "Round 4", "to": "M143"}, {
        "from": "D51",
        "title": "Round 4",
        "to": "M144"
    }, {"from": "D57", "title": "Round 4", "to": "M145"}, {
        "from": "D41",
        "title": "Round 4",
        "to": "M146"
    }, {"from": "D36", "title": "Round 4", "to": "M147"}, {
        "from": "D59",
        "title": "Round 4",
        "to": "M148"
    }, {"from": "D65", "title": "Round 4", "to": "M149"}, {
        "from": "D47",
        "title": "Round 4",
        "to": "M150"
    }, {"from": "D59", "title": "Round 4", "to": "M151"}, {
        "from": "D65",
        "title": "Round 4",
        "to": "M152"
    }, {"from": "D59", "title": "Round 4", "to": "M153"}, {
        "from": "D57",
        "title": "Round 4",
        "to": "M154"
    }, {"from": "D41", "title": "Round 4", "to": "M155"}, {
        "from": "D57",
        "title": "Round 4",
        "to": "M156"
    }, {"from": "D53", "title": "Round 4", "to": "M157"}, {
        "from": "D65",
        "title": "Round 4",
        "to": "M158"
    }, {"from": "D57", "title": "Round 4", "to": "M159"}, {
        "from": "D10",
        "title": "Round 5",
        "to": "D101"
    }, {"from": "D94", "title": "Round 5", "to": "D119"}, {
        "from": "D108",
        "title": "Round 5",
        "to": "D128"
    }, {"from": "D68", "title": "Round 5", "to": "D94"}, {
        "from": "D67",
        "title": "Round 5",
        "to": "D108"
    }, {"from": "D95", "title": "Round 5", "to": "D132"}, {
        "from": "D109",
        "title": "Round 5",
        "to": "D126"
    }, {"from": "D10", "title": "Round 5", "to": "D102"}, {
        "from": "D101",
        "title": "Round 5",
        "to": "D133"
    }, {"from": "D95", "title": "Round 5", "to": "D127"}, {
        "from": "D59",
        "title": "Round 5",
        "to": "D94"
    }, {"from": "D53", "title": "Round 5", "to": "D94"}, {
        "from": "D126",
        "title": "Round 5",
        "to": "D94"
    }, {"from": "D106", "title": "Round 5", "to": "M160"}, {
        "from": "D94",
        "title": "Round 5",
        "to": "M161"
    }, {"from": "D95", "title": "Round 5", "to": "M162"}, {
        "from": "D109",
        "title": "Round 5",
        "to": "M163"
    }, {"from": "D95", "title": "Round 5", "to": "M164"}, {
        "from": "D94",
        "title": "Round 5",
        "to": "M165"
    }, {"from": "D101", "title": "Round 5", "to": "M166"}, {
        "from": "D97",
        "title": "Round 5",
        "to": "M167"
    }, {"from": "D109", "title": "Round 5", "to": "M168"}, {
        "from": "D95",
        "title": "Round 5",
        "to": "M169"
    }, {"from": "D95", "title": "Round 5", "to": "M170"}, {
        "from": "D95",
        "title": "Round 5",
        "to": "M171"
    }, {"from": "D95", "title": "Round 5", "to": "M172"}, {
        "from": "D97",
        "title": "Round 5",
        "to": "M173"
    }, {"from": "D94", "title": "Round 5", "to": "M174"}, {
        "from": "D95",
        "title": "Round 5",
        "to": "M175"
    }, {"from": "D94", "title": "Round 5", "to": "M176"}, {
        "from": "D95",
        "title": "Round 5",
        "to": "M177"
    }, {"from": "D126", "title": "Round 6", "to": "D147"}, {
        "from": "D31",
        "title": "Round 6",
        "to": "D128"
    }, {"from": "D119", "title": "Round 6", "to": "D152"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "D146"
    }, {"from": "D128", "title": "Round 6", "to": "D142"}, {
        "from": "D99",
        "title": "Round 6",
        "to": "D126"
    }, {"from": "D26", "title": "Round 6", "to": "D133"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "D150"
    }, {"from": "D119", "title": "Round 6", "to": "D151"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "D144"
    }, {"from": "D128", "title": "Round 6", "to": "D153"}, {
        "from": "D102",
        "title": "Round 6",
        "to": "D128"
    }, {"from": "D128", "title": "Round 6", "to": "D148"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "D157"
    }, {"from": "D128", "title": "Round 6", "to": "D154"}, {
        "from": "D102",
        "title": "Round 6",
        "to": "D126"
    }, {"from": "D119", "title": "Round 6", "to": "M178"}, {
        "from": "D119",
        "title": "Round 6",
        "to": "M179"
    }, {"from": "D127", "title": "Round 6", "to": "M180"}, {
        "from": "D127",
        "title": "Round 6",
        "to": "M181"
    }, {"from": "D128", "title": "Round 6", "to": "M182"}, {
        "from": "D127",
        "title": "Round 6",
        "to": "M183"
    }, {"from": "D127", "title": "Round 6", "to": "M184"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "M185"
    }, {"from": "D119", "title": "Round 6", "to": "M186"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M187"
    }, {"from": "D127", "title": "Round 6", "to": "M188"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M189"
    }, {"from": "D126", "title": "Round 6", "to": "M190"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "M191"
    }, {"from": "D119", "title": "Round 6", "to": "M192"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "M193"
    }, {"from": "D127", "title": "Round 6", "to": "M194"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M195"
    }, {"from": "D127", "title": "Round 6", "to": "M196"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "M197"
    }, {"from": "D128", "title": "Round 6", "to": "M198"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M199"
    }, {"from": "D127", "title": "Round 6", "to": "M200"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M201"
    }, {"from": "D119", "title": "Round 6", "to": "M202"}, {
        "from": "D119",
        "title": "Round 6",
        "to": "M203"
    }, {"from": "D128", "title": "Round 6", "to": "M204"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M205"
    }, {"from": "D126", "title": "Round 6", "to": "M206"}, {
        "from": "D132",
        "title": "Round 6",
        "to": "M207"
    }, {"from": "D126", "title": "Round 6", "to": "M208"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M209"
    }, {"from": "D126", "title": "Round 6", "to": "M210"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "M211"
    }, {"from": "D128", "title": "Round 6", "to": "M212"}, {
        "from": "D127",
        "title": "Round 6",
        "to": "M213"
    }, {"from": "D126", "title": "Round 6", "to": "M214"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M215"
    }, {"from": "D126", "title": "Round 6", "to": "M216"}, {
        "from": "D126",
        "title": "Round 6",
        "to": "M217"
    }, {"from": "D119", "title": "Round 6", "to": "M218"}, {
        "from": "D128",
        "title": "Round 6",
        "to": "M219"
    }, {"from": "D45", "title": "Round 7", "to": "D142"}, {
        "from": "D148",
        "title": "Round 7",
        "to": "D169"
    }, {"from": "D128", "title": "Round 7", "to": "D151"}, {
        "from": "D148",
        "title": "Round 7",
        "to": "M220"
    }, {"from": "D144", "title": "Round 7", "to": "M221"}, {
        "from": "D148",
        "title": "Round 7",
        "to": "M222"
    }, {"from": "D150", "title": "Round 7", "to": "M223"}, {
        "from": "D153",
        "title": "Round 7",
        "to": "M224"
    }, {"from": "D148", "title": "Round 7", "to": "M225"}, {
        "from": "D31",
        "title": "Round 8",
        "to": "D169"
    }, {"from": "D169", "title": "Round 8", "to": "M226"}, {
        "from": "D169",
        "title": "Round 8",
        "to": "M227"
    }, {"from": "D169", "title": "Round 8", "to": "M228"}, {
        "from": "D169",
        "title": "Round 8",
        "to": "M229"
    }, {"from": "D169", "title": "Round 8", "to": "M230"}, {
        "from": "D169",
        "title": "Round 8",
        "to": "M231"
    }, {"from": "D169", "title": "Round 8", "to": "M232"}]);



    nodeColors = {};
    allNodes = nodes.get({returnType: "Object"});
    for (nodeId in allNodes) {
        nodeColors[nodeId] = allNodes[nodeId].color;
    }
    allEdges = edges.get({returnType: "Object"});
    // adding nodes and edges to the graph
    data = {nodes: nodes, edges: edges};

    var options = {
        "nodes": {
            "borderWidth": 1,
            "borderWidthSelected": 2,
            "opacity": 1,
            "font": {"size": 19},
            "scaling": {"min": 5, "max": 50},
            "size": null
        },
        "edges": {
            "color": {"inherit": true},
            "font": {"size": 15},
            "selfReferenceSize": null,
            "selfReference": {"angle": 0.7853981633974483},
            "smooth": {"forceDirection": "none"}
        },
        "interaction": {"hover": true, "multiselect": true},
        "physics": {"minVelocity": 0.75}
    };


    network = new vis.Network(container, data, options);


    network.on("selectNode", neighbourhoodHighlight);


    // make a custom popup
    var popup = document.createElement("div");
    popup.className = 'popup';
    popupTimeout = null;
    popup.addEventListener('mouseover', function () {
        console.log(popup)
        if (popupTimeout !== null) {
            clearTimeout(popupTimeout);
            popupTimeout = null;
        }
    });
    popup.addEventListener('mouseout', function () {
        if (popupTimeout === null) {
            hidePopup();
        }
    });
    container.appendChild(popup);


    // use the popup event to show
    network.on("showPopup", function (params) {
        showPopup(params);
    });

    // use the hide event to hide it
    network.on("hidePopup", function (params) {
        hidePopup();
    });

    // hiding the popup through css
    function hidePopup() {
        popupTimeout = setTimeout(function () {
            popup.style.display = 'none';
        }, 500);
    }

    // showing the popup
    function showPopup(nodeId) {
        // get the data from the vis.DataSet
        var nodeData = nodes.get([nodeId]);
        popup.innerHTML = nodeData[0].title;

        // get the position of the node
        var posCanvas = network.getPositions([nodeId])[nodeId];

        // get the bounding box of the node
        var boundingBox = network.getBoundingBox(nodeId);

        //position tooltip:
        posCanvas.x = posCanvas.x + 0.5 * (boundingBox.right - boundingBox.left);

        // convert coordinates to the DOM space
        var posDOM = network.canvasToDOM(posCanvas);

        // Give it an offset
        posDOM.x += 10;
        posDOM.y -= 20;

        // show and place the tooltip.
        popup.style.display = 'block';
        popup.style.top = posDOM.y + 'px';
        popup.style.left = posDOM.x + 'px';
    }


    network.on("stabilizationProgress", function (params) {
        var progress = Math.round(params.iterations / params.total * 100);  // Calculate progress as a percentage

        // Update the Bootstrap progress bar with the current progress
        var progressBar = document.getElementById("progressBar");
        progressBar.setAttribute("aria-valuenow", progress);
        progressBar.style.width = progress + "%";
        document.getElementById("mynetwork").style.display = 'none'
    });

    network.once("stabilizationIterationsDone", function () {
        document.getElementById("mynetwork").style.display = 'block';
        document.getElementById('text').innerHTML = '100%';
        document.getElementById('bar').style.width = '496px';
        document.getElementById('loadingBar').style.opacity = 0;
        // really clean the dom element
        setTimeout(function () {
            document.getElementById('loadingBar').style.display = 'none';
        }, 500);
        network.fit();
    });


    return network;

}

drawGraph();

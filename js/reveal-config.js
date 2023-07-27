// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
socket_server = 'https://reveal-multiplex.glitch.me'; // Location of socket.io server for multiplex
// TODO: Set socket server here
Reveal.initialize({
	hash: true,
	hashOneBasedIndex: true,
	transition: 'fade',
	controls: false,
	slideNumber: 'c/t',
	// TODO: Set presentation duration (in seconds) here
	totalTime: 25 * 60,
	defaultTiming: 10,
	minimumTiming: 5,
	width: 560 * 2.5,
	height: 300 * 2.5,
	autoSlideStoppable: false,
	// Learn about plugins: https://revealjs.com/plugins/
	plugins: [
		RevealMarkdown,
		RevealHighlight,
		RevealSearch,
		RevealNotes,
		RevealMath,
		RevealZoom
	],

	multiplex: {
		// Example values. To generate your own, see the socket.io server instructions.
		// For presenter:
		// TODO: Set secret for presenter here
		//secret: '00000000000000000000', // Obtained from the socket.io server. Gives this (the master) control of the presentation
		// For viewer
		secret: null, // null so the clients do not have control of the master presentation
		// TODO: Set id for client here
		id: '0123456789abcdef', // Obtained from socket.io server
		url: socket_server
	},
	// Multiplex dependencies
	dependencies: [
		// TODO: Uncomment this to use slide multiplex. Also uncomment ONE of the presenter/viewer lines below
		//{ src: socket_server + '/socket.io/socket.io.js', async: true },
		// For presenter
		//{ src: socket_server + '/master.js', async: true },
		// For viewer
		//{ src: socket_server + '/client.js', async: true },
	]
});
window.addEventListener("load", function () {
	revealDiv = document.querySelector("body div.reveal")
	header = document.getElementById("header-content");
	revealDiv.appendChild(header);
});
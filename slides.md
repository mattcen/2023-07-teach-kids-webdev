---
type: slide
slideOptions:
  theme: white
  transition: none
  hash: true
  hashOneBasedIndex: true
  controls: false
  slideNumber: 'c/t'
  totalTime: 2700
  defaultTiming: 10
  minimumTiming: 5
  autoSlideStoppable: false
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
attributes: '<!-- .slide: data-visibility="hidden" -->'
---

## Developing Labs for Teaching Kids Webdev

Matt Cengia

- Email: mattcen@mattcen.com
- Mastodon: [@mattcen@aus.social](https://aus.social/@mattcen)
- Matrix: [@mattcen:mattcen.com](https://matrix.to/#/@mattcen:mattcen.com)
- Website: [blog.mattcen.com](https://blog.mattcen.com)

License: [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Note:

- I'm Matt (they/them)
- Find me by handle, M A T T C E N
- Post about talk using #FOSSY and #TeachKidsWebDev
- Slides available on GitHub: https://github.com/mattcen/2023-07-teach-kids-webdev

---

## Slides

[![https://github.com/mattcen/2023-07-teach-kids-webdev](repo_url.svg)](https://github.com/mattcen/2023-07-teach-kids-webdev)

---

## Acknowledgements

Note:

---

## Proprietary software statement

* Presenting on a macOS laptop (using FOSS slide tools)
* Slides hosted on GitHub
* Some proprietary VS Code extensions

Note:

* Slide tool is reveal.js
* Proprietary VS code extensions are [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) and its dependencies. More details on their [GitHub page](https://github.com/Microsoft/vscode-remote-release) and in their [FAQ](https://code.visualstudio.com/docs/remote/faq#_why-arent-the-remote-development-extensions-or-their-components-open-source)

---

## My experience

- Scout Leader
- Perpetual volunteer
- Linux sysadmin and developer

Note:

- Scout leader and Linux sysadmin/dev since 2008
- Love teaching youth
- Enjoy solving problems and developing systems

---

## Overview

- Objectives
- Process
- Delivery
- Review

Note:

- https://github.com/mattcen/dockerlab (FIXME: Add license)
- (private) https://github.com/Scouts-Victoria-Program/scouthack

# Timeline/Outline

- Luke decides it's a good idea to teach scouts how to make websites

---

## Conclusion

Note:

---

## Thanks

* Luke Byrnes
* Pieper Cafe (SE Portland)
* FOSSY

Note:

---

## References

Note:

---
<!-- .slide: data-visibility="hidden" -->

---
<!-- .slide: data-visibility="not-hidden" -->

Note:

- GovHack as inspiration
- getting people interested in IT and giving them a taste
- create legion of devs; youth leading, adults supporting


## what is scouting, and how does STEM fit  into it?
- ref award scheme and "STEM & Innovation" [SIA](https://scoutsvictoria.com.au/activities-events/special-interest-areas/)
## motivations
## plan outline
- networking basics
- CSS
- server-side scripting, originally PHP, now Python Flask (maybe switch to FastAPI?)

## constraints
- no internet due to location
- want to *simulate* internet (having one's own website and domain ) nonetheless
- low-powered laptops
- not all participants had own computers and that leads to heterogeneity
- many students have no prior knowledge, and in the age of mobile/tablets, may not use traditional computers currently, or understand the filesystem metaphor

...

- I'm a scout leader in Australia
- when they hear "scouts", most folks think of "boy scouts", but in AU it's an inclusive all-gender thing
- scouts don't just do outdoor skills like camping or hiking any more.
- they get to choose their own activities, and in Australia we've recently overhauled our award/badge scheme to be more flexible
we now have a ![STEM & Innovation](https://scoutsvictoria.com.au/media/5774/stem-and-innovation-icon-solid.png?width=160&height=160&mode=max) Special Interest Area badge

- For several years I've been involved not just as a line leader facilitating youth program, but working on larger state/branch-level projects, which often require or benefit from the creation or customization of software tools to facilitate them. (can elaborate about this offline)
- A lot of the time, this software has been primarily or exclusively built and managed by me
- After chatting with Luke, we decided to see how we go getting youth more involved, given we're a Youth Leading, Adults Supporting organisation
- With inspiration from GovHack, a hackathon we've both run in recent years, we decided on a weekend-length event to gove scouts a crash-course in website development
- at the time (mid-2021), Melbourne was in-and-out of COVID lockdowns so we weren't sure if/when we'd be able to do this, and planned it online often via Jitsi video calls, with only a few weeks' notice

- booked a scout camp with a newly built self-contained lodge; over 20 beds, bathrooms, kitchen, and large hall, and importantly, plenty of power
- … but no internet
- we chose to use this as a teaching opportunity to walk the scouts through the distinction between the internet, a network (or LAN), and "wifi"

- Andy, one of our leaders, had access to around 100 Toshiba Tecra M10 laptops (older now than many of the scouts we're teaching) donated from a school
- Luke had access to an old rack-mount Dell server
- We assembled an IR classroom with the above and:
	- a bunch of old switches
	- network cables
	- extension cords and power strips
	- old VGA monitors

- our broad syllabus was:
	- HTML
	- CSS
	- PHP
- we really winged it the first time around
- but the scouts loved it
- Luke decided it would be a great idea for me to act as a computer while the scouts instructed me to make a sandwich (insert photo)

- after the first time around we decided to switch from PHP to Python Flask, because most of the apps we had been doing as leaders were in Python

- so let's talk about how we did all this technically


---

Note:

# What is Scouting?

Scouting is a non-formal type of education.

Young people learn new skills and responsible independence through the Scout Method. Although our programs are continually updated to remain contemporary, the Scout Method has stood the test of time.

## Elements of the Scout Method include:

### Learning by Doing
- Young people learn best through practical experiences, not theory.

### Patrol System
- Leadership and social skills are developed through teamwork and a sense of belonging.

### Nature and the Outdoors
- The outdoors is our main location for learning. This encourages a two-way relationship between the individual and the natural world.

### Community Involvement
- Scouts of all ages actively explore and learn about their responsibility to their community and the wider world.

### Personal Progression
- The learning journey focuses on challenging each individual to do their best through a range of experiences.

### The Australian Scout Promise and Law
- These are a simple set of common values that underpin all Scouting activities and interactions.

### Youth Leading, Adults Supporting
- As they progress through the Sections of Scouting, young people are increasingly self-managing. With help from their volunteer adult Leaders.

-- [Welcome to Scouting, Sep 2022](https://scoutsvictoria.com.au/media/7248/welcome-to-scouting-sep22.pdf)

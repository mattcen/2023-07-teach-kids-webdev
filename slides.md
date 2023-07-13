---
#type: slide
title: Developing Labs for Teaching Kids Webdev
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
(they/them)

[blog.mattcen.com](https://blog.mattcen.com)

<!--
- Email: mattcen@mattcen.com
- Mastodon: [@mattcen@aus.social](https://aus.social/@mattcen)
- Matrix: [@mattcen:mattcen.com](https://matrix.to/#/@mattcen:mattcen.com)
- Website: [blog.mattcen.com](https://blog.mattcen.com)
- Slides: https://github.com/mattcen/2023-07-teach-kids-webdev
-->

License: [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Note:

- I'm Matt (they/them)
- Find me by handle, M A T T C E N
- Post about talk using #FOSSY and #TeachKidsWebDev
- Slides available on GitHub: https://github.com/mattcen/2023-07-teach-kids-webdev

---

## Slides

[![https://github.com/mattcen/2023-07-teach-kids-webdev](images/repo_url.svg)](https://github.com/mattcen/2023-07-teach-kids-webdev)

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
* Appear to be open source alternatives to these VS Code extensions, but I've not tested them properly yet

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

## Talk Overview

- Inception
- Objectives
- Process
- Delivery
- Review

Combination of story time and technical details

Note:

- https://github.com/mattcen/dockerlab
- (private) https://github.com/Scouts-Victoria-Program/scouthack
- (private) https://github.com/Scouts-Victoria-Program/scouthack_flask_2023/commits/main or https://git.mattcen.com/mattcen/scouthack_flask/commits/branch/main
  Start commit: https://github.com/Scouts-Victoria-Program/scouthack_flask_2023/commit/4d87000 or https://git.mattcen.com/mattcen/scouthack_flask/commit/4d87000

---


# What is scouts?

<img alt="Scouts Victoria logo" src="images/ScoutsVIC-Vert-11Col.svg" width="400px"/>

Notes:

- I'm a Scout Leader in Australia
- some folks think of "boy scouts" [camping/hiking/constructing things with wood and rope](https://en.wikipedia.org/wiki/Scouting_for_Boys), or "girl scouts" and their cookies
- Scouts Australia is inclusive to all genders etc., welcomes youth from 5-26 years, all adults
- Not just outdoor stuff anymore
- Anything the scouts want; [Youth Leading, Adults Supporting](images/YA.svg)

- Scouts Australia has an updated award scheme to recognise youth achievement
- Broader, less prescriptive
- One of six new "Special Interest Areas" is "[STEM & Innovation](images/SA.svg)"; includes IT

![STEM & Innovation SIA logo; the outline of a white magnifying glass with a red circle as its background](images/SA.svg)

----

# My history in scouting

Notes:

- Been involved since I was 8
- Besides outdoor skills, also life skills:
	- plan a healthy menu
	- shopping list
	- cook
	-	budget
	- pack for multi-day camp
	- pack/tie down trailer
	- lead peers without direct adult oversight
- Took break at 18 for university
- 3 years later, was staring at screens for work, study, play
- needed escape
- became scout leader in 2008, with 11- to 15-year-olds
- since been leader of adults (training other leaders)
- also activity leader (facilitating state-wide events for scouts of all ages)

# Full-circle

- Increasingly found myself staring at screen for scout work
- Recently been using IT skills for scouts
- open data/software to make topo maps
- build/admin websites with Python/Django
- fellow leaders are IT folk, but much work fell to me
- also, we wouldn't be around forever, so needed to succession plan

----

Note:

# ScoutHack inception

- Leverage Youth Leading, Adults Supporting
- Hand down to youth
- Teach youth about IT
- Give them agency to decide our direction
- @ekulbyrnes suggested we run tech camp to teach basic webdev and maybe ops/sysadmin
- Inspiration from GovHack - hackathon we ran together
- Coined "ScoutHack", decided on 2-day camp
- Began weekly planning via Jitsi

# Syllabus

- HTML
- CSS
- Intro to some server-side scripting
- Ambitious for a weekend
- 11+-year-olds of varying competence
- Decided even they don't need to retain all the details
- Just walking through step-by-step gives a taste
- They can pursue in future, individually or at potential "ScoutHack 2.0"

# Event logistics

- Goals set; what resources do we need?
- To optimise accessibility, don't require BYO computer
- Having our own PC fleet ensures homogeneity, rather than dealing with different OSes etc
- Andy had a fleet of Toshiba Tecra M10 laptops
- From 2011; older than many of the scouts
- Install Linux, lightweight DE; sufficiently capable
- Only need web browser and text editor/IDE
- Also managed to scrounge enough external keyboards, mice, and VGA monitors for second screen
- Next problem: power for old inefficient monitors, despite being LCD
- Managed to book recently-built activity centre at scout camp
- Self-contained:
	- bunk beds
    - kitchen
    - bathrooms
    - large space for dining/classroom
    - new electrical wiring!
- Spread across several electrical circuits, managed to avoid tripping circuit-breakers!

- Campsite was out in the sticks, so no internet, poor cell coverage
- How do we teach web dev without internet?
- Run local server
- Could have kids run server on localhost
- Wanted to give feeling of hosting where others could access
- Devised bigger plans

# Server-side tech details

- Found old rack-mount server
- Some switches
- Many network cables
- Decided to give scouts a full "VPS". Allow:
    - Running webserver
    - Installing packages
    - Storing files
- Each scout got:
    - Ubuntu Docker container
    - SSH server
    - Standard user account
    - full `sudo` access
- Did this with:
    - sshpiper
        - reverse proxy gor SSH
        - person-in-the-middle SSH
        - routes connections to containers based on username or SSH key
    - Traefik
        - reverse HTTP proxy
        - local DNS with `*.scouthack` pointing to server
        - Traefik routing `http://username.scouthack` to each container's port 80
- How do we teach SSH basics without going into great detail?

# Client-side details

- Laptops running Xubuntu (Ubuntu with XFCE)
- SSHd for remote admin
- Firefox
- VS Code
    - Remote SSH VS Code extension (closed-source; open alternative?)
- Used Clonezilla to image all other laptops via IP multicast
- Less than an hour to image 20+ machines

# Getting students started

- 

----

<img alt="ScoutHack logo. A green monospaced font on a black background, which says 'scout@hack:~\$' in the style of a shell prompt" src="images/scouthack.svg" width="400px"/>

---

## Conclusion

Note:

---

## Thanks

* Luke - [@ekulbyrnes](https://infosec.exchange/@ekulbyrnes)
* [Pieper Cafe](http://www.piepercafe.com/) (SE Portland)
* [FOSSY](https://fossy.us)

Note:

---

## References

Note:


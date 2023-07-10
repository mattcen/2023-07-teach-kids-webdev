## What is scouts?

I'm a scout leader in Australia.

When they hear "scouts", some folks think of "boy scouts" going camping, hiking, and constructing things with wood and rope. Or they think of "girl scouts" and their cookies.

Scouts Australia is an organisation that is inclusive of everyone, regardless of gender, sexuality, race, or ability. Scouting is available to youth aged 5 through to 26, and adult leaders from 18-years onwards. And while we do go camping, hiking, and do construction, we also do pretty much anything else you can think of. One of our values is that we are "youth leading, adults supporting", meaning that youth get to set their own program, with the guidance and support of their adult leaders.

In keeping with the times, Scouts Australia recently overhauled our scout award scheme, through which we recognise achievements of youth in various skill areas. We've made it far less prescriptive, which has encouraged a much broader spectrum of activities to meet the criteria for each award.

One of the six new "Special Interest Areas" we have is "STEM & Innovation", and naturally, that encompasses Information Technology under its umbrella.

![STEM & Innovation SIA logo; the outline of a white magnifying glass with a red circle as its background](STEM_innovation.svg)

## My history in scouting

I was a scout as a kid, and, in addition to outdoor skills, it taught me life skills, such as how to plan a healthy menu, assemble a shopping list, cook, budget, decide what to pack for several days of camping, pack and tie down a trailer, and lead a group of my peers in the absense of direct adult involvement.

I decided to take a break from scouting when I turned 18, to focus on university where I was studying Computer Science. But 3 years later, I realised that I was spending all my time in front of a screen, either for work, study, or recreation, and that I could use an escape. Returning to scouting was an obvious choice, as I remembered it helping me to keep active and get outdoors.

So in 2008, I became a scout leader, and I initially worked with scouts aged 11-15 years old. Over the years I've branched out to become a leader of adults, helping to train other scout leaders, and an activity leader, helping to facilitate state-wide events for scouts of all ages.

Ironically, while becoming a leader met my initial need to get away from the screen, I've since come full circle, and now spend quite of my scouting time staring at my computer, using my IT skills in service of scouting. I use open data and free and open source software to make topographical maps, and have been developing and administering websites and web apps to facilitate various scouting events, usually using Python and Django. While a few of my scout leader friends are also proficient IT folks, much of this work fell to me, and in any case, none of us were going to remain in our current scouting roles indefinitely, so it made sense to do some succession planning

## ScoutHack inception

As a youth leading, adults supporting organisation the obvious choice was to prepare to hand down these responsibilities to the organisation's youth members. This approach has the advantages that it can be used as an opportunity to teach real world tech skills to youth, and to give them the agency to influcence to influence the direction of this IT infrastructure, if indeed they deem it to remain relevant.

So in mid-2021, amidst recurring COVID lock-downs in Melbourne, my friend and fellow scout leader, [Luke](https://aus.social/@ekulbyrnes), suggested we run a tech camp to teach kids the basics of website development, with a side of sysadmin/operations if we got the time. Taking inspiration from GovHack, a hackathon the two of us have both participated in and run for several years, we coined the name "ScoutHack", and began weekly Jitsi video meetings to plan a two-day camp.

![ScoutHack logo. A green monospaced font on a black background, which says "scout@hack:~$" in the style of a shell prompt](scouthack_logo.svg)

We decided that our syllabus should teach basic HTML, CSS, and the beginnings of some flavour of server-side scripting language. This is an ambitious undertaking, given that we only had a weekend, and were expecting youth as young as 11, of varying skill levels, but we reasoned that even if we had to walk them through the entire process step-by-step such that they didn't retain many of the finer details, it would be enough to give them all a taste of web development, such that they could pursue it further (possibly as part of a ScoutHack 2.0 event) in future.

## Event logistics

One of the first questions that arose after we'de decided what we wanted this event to achieve was: what resources did we need to make this all happen?

We wanted the event to be accessible to as many people as possible, so that meant not assuming youth would have their own computers to bring. Fortunately, Andy, a member of our leadership team, has access to a fleet of Toshiba Tecra M10 laptops. Having been manufactured in 2011, they are now older than some of the youth who use them, and are certainly not the fastest machines, but we reasoned that if we installed Linux on them with a relatively lightweight desktop environment, they'd be quite capable of running a web browser and a text editor or IDE, which was all we needed.

<!-- *[IDE]: Integrated Development Environment -->

We also wanted to give youth members an authentic, user-friendly developer experience, by giving each participant a separate external monitor, so they could display both their code and their web browser simultaneously. After some scrounging, we managed to get together a fleet of servicable VGA monitors, keyboards, and mice, to complement our laptops.

The next problem we had was power. Some of these monitors were quite old, and despite being LCD, were not particularly power-efficient. Luckily we managed to book a recently built activity centre at a scout camp. This was a single building with bunks for over 20 people, bathrooms, a kitchen, central heating, a huge hall for us to use as both classroom and dining area, and brand new electrical wiring. After doing all the maths, we determined that if we carefully distributed our infrastructure across the several different electrical circuits, we'd be able to run everything without tripping any circuit breakers!

One of the challenges with this campsite, though, is that it's out in the sticks, and has neither an internet connection, nor reliable cell coverage. How do we teach kids about web development without internet? We run a local server, of course! We could get each participant to run a local web server and browse to their website via `http://localhost`, but we wanted to give them the feeling of hosting their website where others could get to it, so came up with bigger plans.

## Server-side tech details

We managed to rustle up an old rack-mount server, a couple of rack-mount network switches, and a bunch of network cables.

We decided that we wanted scouts to experience full admin access to their own Linux server, on which they could run a web server, install packages, and store their files. To do this, I opted to build a [Ubuntu container image](https://github.com/mattcen/dockerlab/blob/main/sshbase/Dockerfile) which runs an SSH server, and creates a standard user account with full `sudo` access to that container. Each scout would get their own identical container.

To grant access to the containers, I set up [sshpiper](https://github.com/tg123/sshpiper/). sshpiper is a reverse proxy for SSH, which uses a person-in-the-middle technique to work out which SSH server a client is trying to connect to, based on things like the client's requested username or SSH key. This allowed me to expose sshpiper on port 22, the standard SSH port, of the server, and then have it tunnel connections through to each scout's respective container based on the username they authenticated with.

Next step, was giving each scout their own website! I opted to use Traefik (or Træfik) as a reverse HTTP proxy. I set up local DNS so that the LAN had a TLD of `.scouthack`, and gave each scout a subdomain of this, based on their username or first name. This subdomain would point to the server, and when Traefik got a request on port 80 with that hostname, it would route it through to port 80 on that scout's container.

<!--
*[DNS]: Domain Name System
*[LAN]: Local Area Network
*[TLD]: Top Level Domain
-->

After this was all set up, it was a matter of instructing the scouts to SSH to `username@username.scouthack`, enter their password (which for simplicity I set to their username; don't hate me, it was a calculated risk!) and then run a web server using `python -m http.server 80`, and then browse to `http://username.scouthack` to see their website, once they'd created it.

Great, that's the server side largely sorted. Now, how do we get these kids up and running to actually log into this system, without going into detail about the nuances of SSH etc.?

## Client-side tech details

I set up the laptops using [Xubuntu](https://xubuntu.org/) (i.e. [Ubuntu Linux](ubuntu.com/), with [Xfce](https://xfce.org/) as the default desktop environment). Using [Clonezilla](https://clonezilla.org/clonezilla-live.php), I was able to create an [SOE](https://en.wikipedia.org/wiki/Standard_Operating_Environment) image of the first laptop, then use IP multicast to duplicate that over the network to all other laptops at once, taking less than hour to do over 20 machines. Gosh I love computers sometimes!

The SOE I'd built was pretty basic: aside from the basic Xubuntu Desktop packages, I only needed to add [Firefox](https://firefox.com) as our web browser, [Visual Studio Code](https://code.visualstudio.com/) with a couple of extensions[^vscode_extensions] for our IDE, and install an SSH server so I could manage the machines remotely if necessary.

<!-- *[SOE]: Standard Operating Environment -->

[^vscode_extensions]: The main extension we used, and the only proprietary part of this whole set-up, is the [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension. I've recently discovered [Open Remote - SSH](https://open-vsx.org/extension/jeanp413/open-remote-ssh), but am yet to determine if it still uses Microsoft's proprietary server-side.

## Getting students started

The evening that the Scouts arrived, we sat them each down at a desk, and had them assemble their computer. This involved plugging the laptop into power, monitor, ethernet, keyboard, and mouse, so wasn't too hard, but we wanted them to have the experience nonetheless.

After they were all set up, they naturally tried to get online, only to find that none of their favourite websites worked.

We used this as an impromptu teaching opportunity, and asked them why this might be? One of the responses was that their computers weren't connected to "Wi-Fi", which, while technically true, wasn't the cause of the issue, since they all had functional Ethernet connections. We drew up a crude network diagram, and coached the scouts through the differences between Wi-Fi, a LAN, and the Internet.

With the network theory out of the way, we explained we have our own server set up so that while the scouts can't access the Internet, they can access and store content on this computer in the adjacent room.

By this point, it was getting late in the evening, so we called it a night and gave the scouts some time to play around. I set up a [Minetest](https://www.minetest.net/) server (an open-source Minecraft clone), and got all the scouts connected to it. Except for one of the few scouts who had managed to bring their own computer with them. They didn't have Minetest, but they had Minecraft installed, so initially felt quite superiour playing the original game rather than what I think they perceived as a "cheap knock-off of the real thing". This was until they learned about Network Effects. Everyone else was playing a network game all together, shouting at each other from across the room, and this person was in a world all on their own. It wasn't long before they asked if we could get Minetest installed on their computer too!

## Make me a sandwich

![XKCD Sandwich comic]()

The following morning, after the scouts finished breakfast, we decided to get them thinking about how computers worked. Luke had this brilliant idea to take advantage of my oft-frustrating literal-mindedness, and tasked the scouts with instructing me to make a sandwich. I was provided with a loaf of bread in a plastic bag, a tub of butter, some Vegemite (or jam), a knife, and a plate.

I delighted in deliberately misinterpreting their instructions, following them to the letter, and demonstrating why their lack of precision was so important.

![Matt sandwich]()

This was until, in the interest of time, Luke theatrically turned down my "literal-minded" setting with a faux Linux command, and we got on with the lesson.

![echo set_mattcen_literal == -5]()

After conveying the point that computers do *exactly* what you tell them to, even if that's not what you mean, we got to setting up the scouts' development environment.

## VS Code set-up

The broad instructions we gave the scouts for this (albeit with rather more detail and hand-holding), were:

1. Open VS Code
2. Use the Remote SSH extension to connect to `username@username.scouthack`, and enter your password when prompted
3. Open the `code` folder we've pre-created for you
4. Create a file called `index.html`, and put some text in it, then save the file
5. Use <kbd>Ctrl</kbd>+<kbd>\`</kbd> to open a terminal
6. Type `python -m http.server 80` and press enter
7. Open Firefox, and browse to http://username.scouthack

And *now* we were starting to see something cool; they'd started to create their own content and could see it at a '.scouthack' domain, so it *looked* kind of like it was on the internet! Better still, they could browse to *each others'* pages and see them too.
We had them open up VS Code, and use the SSH extension to connect to `username@username.scouthack`, and enter in their passwords when prompted.

## HTML

Now we've got our environment set up, we walked through some basic HTML tags. I won't go into the details, but broadly, we covered the following:

1. Text ("hello world")
2. headings (`<h1>`-`<h6>`)
3. newlines (`<br>`)
4. bold (`<b>`, then `<strong>`)
5. italics (`<i>`, then `<em>`)
6. paragraphs (`<p>`)
7. images (`<img>foo</img>`, then `<img alt="foo" src="./foo.jpg">foo</img>`, then `<img alt="foo" src="./foo.jpg"/>`)
8. New doc (`foo.html`)
9. links (`<a href="foo.html">foo</a>`)
10. lists (`<ol>`, `<ul>`)
12. tables (`<table><thead><tr><th>foo</th></tr></thead><tbody><tr><td>bar</td><td>quux</td></tr></tbody></table>`)

At this point, we broke for lunch, before preparing to teach CSS

## CSS

Now that the scouts had some HTML to work with, we set about teaching them some of the basics of how to style it.

This began with an introduction to CSS colo<del>u</del>rs, and an explanation that some colours can be referred to by name, while others need to be described using RGB (we didn't get into HSL), with either decimal or hexadecimal respresentations.

Then we covered off how to actually *set* the colours of our web page. We demonstrated inline style attributes, and a style tag in the head of our page

We demonstrated how to use various CSS selectors, including element type selectors, and selectors based on class and id.

Having covered the ground-work, we introduced CSS attributes, and the scouts set about choosing all sorts of garish colours for their websites. This was aided by the fact that when VS Code is editing a CSS or HTML file, it will show you a colour-selector and preview when you hover over a colour hex-code.

After the kids had their fun, we showed them how to move their CSS to a separate `style.css` file for tidiness.

To speed things up from here, we introduced [Bootstrap](https://getbootstrap.com/), and showed how it offered a plethora of pre-configured classes to use. This allowed us to more rapidly style our page to look like the modern websites the scouts are used to, rather than something out of the late '90s.

<!-- FIXME: Ideally add more detail on exactly what the CSS section covered; awaiting Andy -->

Finally, we wrapped up for the afternoon, had pizza for dinner (as is the tradition of many hackathons), and played several noisy rounds of Minetest to "wind down" (hah, yeah, right)!

## Server-side scripting

The following morning, we introducted server-side scripting, to show the full power of what a dynamic website can do.

For our first course, we build a basic PHP script. Unfortunately I don't recall the details of it, but fortunately it doesn't matter, because after that we decided to switch to Python and make a Flask web app instead.

The goal was to build a simple web form that allowed the scouts to submit program ideas that their scout groups might like to do. The form had two fields: an input box for the author, and a text area for the program idea.

Having pre-built the web app myself, I synthesised a git repository with a set of logical commits that walked through, step by step, how to build this app up from scratch. I was then able to run a small shell script that checked out each commit in sequence, pausing in-between, so I could show the scouts what they were working towards for this step. On our second screen, I had the git repository open in [Forgejo](https://forgejo.org/) (a soft-fork of [Gitea](https://about.gitea.com/), which is an open-source GitHub alternative), and was displaying the diff for each commit, so we the scouts could see which lines they needed to add and change.

https://git.mattcen.com/mattcen/scouthack_flask/commits/branch/main

## Take-aways

One of the most interesting take-aways from this experience was that many young people are *not* proficient typists, despite growing up using technology. We speculate this might be because they are so used to touch-screens, that using an actual physical keyboard hasn't been particularly necessary for them yet. The result of this was typos. *Lots* of typos. We spent most of our time fixing trivial syntax errors, despite cautioning the scouts that they needed to double-check they'd typed the code precisely.

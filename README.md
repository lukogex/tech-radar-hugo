# Hugo Module

TODO

# Tech radar

## About

The Radar is a document that sets out the changes that are currently interesting regarding software development.  
You can find more information about it [here](https://www.thoughtworks.com/radar/faq).

![tech-radar](static/images/preview.png)

### Categories

- Languages-Frameworks
- Platforms
- Techniques
- Tools

### Rings

- Adopt
  We have capacity to use these solutions, they have already been deployed in production.
  First choices to start a new project.
- Can Use
  Pertinence of those solutions have been demonstrated.
  You can use it on your project but you need to provide a reason to not use the default choice.
- Assess
  These solutions may bring values.
  It is necessary to assess and test them in our environment to confirm or not this vision.
- Deprecated/Rejected
  For various reasons, these solutions are no longer the first choices or are not recommended (anymore).

### Source Code

The javascript source code of the radar has been copied initially from [here](https://github.com/agilepartner/tech-radar-js).

## License

Even when the CC licenses do not require a copy of the license I've added one from [here](https://github.com/idleberg/Creative-Commons-Markdown/releases/tag/v0.4.1) to make it visible in the same manner as for other licenses.

This project is based on the work of [Yoan Thirion](https://www.linkedin.com/in/yoanthirion/) [here](https://github.com/ythirion/tech-radar-hugo).

## Usage

The tech radar is built based on the elements specified in the content folder.  

To add new content to the radar:
* **Create a new md file** under the desired category folder in the `content` folder
    * languages-frameworks
    * platforms
    * techniques
    * tools
* **Add meta data to the file** in the front matter (in toml format)
```toml
+++
name= [name of the concept]
image= [relative image url]
category= [Languages-Frameworks or Platforms or Techniques or Tools]
ring= [Adopt or Can Use or Assess or Deprecated]
type="post"
layout="details"
+++
```
* **Add details to the file**
    * `What is it ?` : Describe the concept / technology
    * `Why ?` : Explain why is it useful and when
    * `For who ?` : Make a list of roles that could be positively impacted by this technology (ex: Product Owner, Developers, ...)
    * `Resources` : Useful resources on this technology
    * `Contacts` : Make a list of teams or people using the technology (people that could help on the topic in the near future)

### File Example

A file should look like this :
```
+++
name= "Angular"
image= "/images/languages-frameworks/angular.png"
category= "Languages-Frameworks"
ring= "Can Use"
type="post"
layout="details"
+++

# What is it ?
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra ultricies lectus vitae elementum. Suspendisse neque nisl, venenatis vel nunc cursus, pharetra finibus elit. In aliquam nisl eu sapien pulvinar, ac ultrices justo tincidunt. Maecenas sed ipsum libero. Nulla porttitor, magna ac efficitur vestibulum, urna neque porttitor velit, ac imperdiet elit mauris vel neque. Vivamus et scelerisque libero. Aenean imperdiet dignissim viverra. Phasellus aliquet diam et velit auctor mollis. In pulvinar dolor tristique mollis dignissim. Nullam et sem ac odio interdum vehicula sed vel est.

Fusce vel malesuada neque, ut porttitor nulla. Etiam maximus consectetur bibendum. Aliquam vestibulum elementum elit eu lacinia. Sed at tristique enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla hendrerit sed magna et vehicula. Aenean rutrum placerat diam sit amet pharetra. Cras tristique aliquam augue sit amet volutpat. In finibus lobortis rutrum. Phasellus fringilla rutrum tortor, at convallis lacus maximus eu. Nam et hendrerit ligula.

# Why ?
Sed ullamcorper nibh eget massa dapibus hendrerit. Nulla facilisi. Aliquam erat volutpat. Ut eu ornare ipsum. Aenean molestie metus non orci faucibus pulvinar. Pellentesque maximus urna diam, vitae consectetur sapien sagittis id. Etiam enim erat, egestas id congue ut, dapibus ut lorem. Aenean scelerisque ligula id arcu rhoncus, id pharetra libero ultricies. Donec varius porta risus, a posuere libero fringilla a. Etiam id felis eu mauris euismod ullamcorper id ac massa. Aenean commodo pretium ex, et hendrerit ex pulvinar vel. Nam in nibh in eros maximus auctor. Maecenas lacus ipsum, porttitor vitae nisl ut, venenatis viverra ante. Mauris lacinia posuere sem in auctor. Quisque sed ultricies magna. Aliquam eu mauris commodo, ullamcorper turpis vestibulum, hendrerit augue.

# For who ?
* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
* Nulla mattis metus a turpis fermentum, at fermentum mauris porttitor.
* Morbi porttitor magna dictum condimentum faucibus.
* Donec eget diam pharetra, hendrerit velit quis, sodales massa.
* Sed dictum nunc eu ipsum consequat, ac rutrum lectus consequat.
* Duis ut arcu mollis, pellentesque lacus eu, malesuada ante.

# Resources
- [Cheat sheet](https://angular.io/guide/cheatsheet)
- [Learn angular](https://hackr.io/tutorials/learn-angular)

# Contacts
- [Yoan Thirion](https://www.linkedin.com/in/yoanthirion/)
```
